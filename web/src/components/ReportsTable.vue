<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-data-table-virtual :items="items" :headers="tableHeaders" :loading="loading" :height="height">
            <template v-slot:item="{ item }">
                <tr>
                    <td><v-chip color="success">${{ parseFloat(item.amount).toFixed(2) }}</v-chip></td>
                    <td>{{ item.merchant }}</td>
                    <td>{{ item.description }}</td>
                    <td><v-chip color="primary">{{ transformEmailToName(item.submitter_email) }}</v-chip></td>
                    <td>{{ formatDate(item.submitted_date) }}</td>
                    <td><v-chip v-if="item.isApproved" color="primary">{{ transformEmailToName(item.approver_email)
                    }}</v-chip></td>
                    <td>{{ item.isApproved ? formatDate(item.approved_date) : '' }}</td>
                    <td><v-chip v-if="item.isRejected" color="primary">{{ transformEmailToName(item.rejecter_email)
                    }}</v-chip></td>
                    <td>{{ item.isRejected ? formatDate(item.rejected_date) : '' }}</td>
                    <td>

                        <!-- TODO: tooltip not working here -->
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn v-if="!item.isApproved && !item.isRejected" v-on="on" variant="outlined"
                                    color="secondary" size="small" class="mx-2" icon="mdi-checkbox-marked-circle-outline"
                                    @click="approveReport(item.report_id)">
                                </v-btn>
                            </template>
                            <span>Approve</span>
                        </v-tooltip>
                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <button v-on="on">Hover me</button>
                            </template>
                            <span>Tooltip Text</span>
                        </v-tooltip> -->

                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Button</v-btn>
                            </template>
                            <span>Tooltip</span>
                        </v-tooltip> -->
                        <!-- <v-btn v-if="!item.isApproved && !item.isRejected" variant="outlined" color="secondary" size="small"
                            class="mx-2" icon="mdi-checkbox-marked-circle-outline" @click="approveReport(item.report_id)">
                        </v-btn> -->

                        <v-btn v-if="!item.isApproved && !item.isRejected" variant="outlined" color="warning" size="small"
                            class="mx-2" icon="mdi-alert-circle-outline" @click="rejectReport(item.report_id)">
                        </v-btn>

                        <v-btn v-if="item.isApproved || item.isRejected" variant="outlined" color="primary" size="small"
                            class="mx-2" icon="mdi-keyboard-return" @click="resetReport(item.report_id)">
                        </v-btn>

                        <v-btn v-if="!item.isApproved && !item.isRejected" variant="outlined" color="error" size="small"
                            class="mx-2" icon="mdi-trash-can-outline" @click="deleteReport(item.report_id)">
                        </v-btn>


                    </td>
                </tr>
            </template>
        </v-data-table-virtual>
    </v-card>
</template>

<script>
import { approveReport, deleteReport, resetReport, rejectReport } from './../services/api'
import EventBus from './../services/EventBus'

export default {
    name: "ExpenseReports",
    data() {
        return {
            tableHeaders: [
                { key: 'amount', title: 'Amount' },
                { key: 'merchant', title: 'Merchant' },
                { key: 'description', title: 'Description', sortable: true },
                { key: 'submitter_email', title: 'Submitter', sortable: true },
                { key: 'submitted_date', title: 'Submitted', sortable: true },
                { key: 'approver_email', title: 'Approver', sortable: true },
                { key: 'approved_date', title: 'Approved', sortable: true },
                { key: 'rejecter_email', title: 'Rejecter', sortable: true },
                { key: 'rejected_date', title: 'Rejected', sortable: true },
                { key: 'report_id', title: '' }
            ]
        }
    },
    props: {
        title: {
            type: String,
            default: 'Expense Reports'
        },
        height: {
            type: Number,
            default: 250
        },
        loading: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default() { // array and object prop defaults must be returned by a factory function.
                return []
            },
            // validator (value, props) {
            //   const keys = this.tableHeaders.map(x => x.key)
            //   if (!Array.isArray(value)) {
            //     return false
            //   }
            //   if (value.length > 0) {
            //     return value.reduce(function (acc, item) {
            //       const hasKeys = keys.reduce(function (acc, key) {
            //         return acc && (key in item)
            //       })
            //       return acc && hasKeys
            //     })
            //   }
            //   return true
            // }
        }
    },
    computed: {
        user() {
            return this.$auth0.user._value
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            // Then specify how you want your dates to be formatted
            return new Intl.DateTimeFormat().format(date);
        },
        transformEmailToName(email) {
            let name = email.split('@')[0];
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        filterColumnTables(item) {
            // TODO: is there a way to make the columns dynamic??
        },
        async approveReport(report_id) {
            const response = await approveReport(this.$auth0, report_id)
            console.log(response)
            this.toastResponse(response)
            EventBus.emit('refresh', { action: 'approved', report_id })
        },
        async deleteReport(report_id) {
            const response = await deleteReport(this.$auth0, report_id)
            console.log(response)
            this.toastResponse(response)
            EventBus.emit('refresh', { action: 'deleted', report_id })
        },
        async resetReport(report_id) {
            const response = await resetReport(this.$auth0, report_id)
            console.log(response)
            this.toastResponse(response)
            EventBus.emit('refresh', { action: 'reset', report_id })
        },
        async rejectReport(report_id) {
            const response = await rejectReport(this.$auth0, report_id)
            console.log(response)
            this.toastResponse(response)
            EventBus.emit('refresh', { action: 'deleted', report_id })
        },
        toastResponse(response) {
            let header = response.success ? 'rejected:' : 'Warning:'
            let body = response.message
            const announcement = {
                text: `<h3>${header}</h3><p>${body}</p>`,
                type: response.success ? 'success' : 'error',
            }
            EventBus.emit('announce', announcement)
        }
    }
};
</script>
