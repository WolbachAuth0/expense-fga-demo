<template>
    <v-card>
        <v-card-title>
					<v-icon :color="tableIcon.color">{{ tableIcon.icon }}</v-icon>
					{{ title }}
				</v-card-title>
        <v-data-table-virtual :items="items" :headers="filterTableHeaders" :loading="loading" :height="height">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        <v-chip color="success">${{ parseFloat(item.amount).toFixed(2) }}</v-chip>
                    </td>
                    <td>{{ item.merchant }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <v-chip color="primary">{{
                            transformEmailToName(item.submitter_email)
                        }}</v-chip>
                    </td>
                    <td>{{ formatDate(item.submitted_date) }}</td>
                    <td v-if="item.isApproved">
                        <v-chip color="primary">{{
                            transformEmailToName(item.approver_email)
                        }}</v-chip>
                    </td>
                    <td v-if="item.isApproved">{{ item.isApproved ? formatDate(item.approved_date) : "" }}</td>
                    <td v-if="item.isRejected">
                        <v-chip color="primary">{{
                            transformEmailToName(item.rejecter_email)
                        }}</v-chip>
                    </td>
                    <td v-if="item.isRejected">{{ item.isRejected ? formatDate(item.rejected_date) : "" }}</td>
                    <td>
                        <v-btn v-if="!item.isApproved && !item.isRejected" variant="outlined" color="secondary" size="small"
                            class="mx-2" icon="mdi-checkbox-marked-circle-outline" @click="approveReport(item.report_id)">
                            <v-icon size="large" color="secondary" icon="mdi-checkbox-marked-circle-outline"></v-icon>
                            <v-tooltip activator="parent" location="bottom">
                                Approve
                            </v-tooltip>
                        </v-btn>

                        <v-btn v-if="!item.isApproved && !item.isRejected" variant="outlined" color="warning" size="small"
                            class="mx-2" icon="mdi-alert-circle-outline" @click="rejectReport(item.report_id)">
                            <v-icon size="large" color="warning" icon="mdi-alert-circle-outline"></v-icon>
                            <v-tooltip activator="parent" location="bottom">
                                Reject
                            </v-tooltip>
                        </v-btn>

                        <v-btn v-if="item.isApproved || item.isRejected" variant="outlined" color="primary" size="small"
                            class="mx-2" icon="mdi-keyboard-return" @click="resetReport(item.report_id)">
                            <v-icon size="large" color="primary" icon="mdi-keyboard-return"></v-icon>
                            <v-tooltip activator="parent" location="bottom">
                                Reset
                            </v-tooltip>
                        </v-btn>

                        <v-btn v-if="!item.isApproved && !item.isRejected" variant="outlined" color="error" size="small"
                            class="mx-2" icon="mdi-trash-can-outline" @click="deleteReport(item.report_id)">
                            <v-icon size="large" color="error" icon="mdi-trash-can-outline"></v-icon>
                            <v-tooltip activator="parent" location="bottom">
                                Delete
                            </v-tooltip>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table-virtual>
    </v-card>
</template>

<script>
import {
    approveReport,
    deleteReport,
    resetReport,
    rejectReport,
} from "./../services/api";
import EventBus from "./../services/EventBus";

export default {
    name: "ExpenseReports",
    data() {
        return {
            baseTableHeaders: [
                { key: "amount", title: "Amount" },
                { key: "merchant", title: "Merchant" },
                { key: "description", title: "Description", sortable: true },
                { key: "submitter_email", title: "Submitter", sortable: true },
                { key: "submitted_date", title: "Submitted", sortable: true },
            ],
            approvedTableHeaders: [
                { key: "approver_email", title: "Approver", sortable: true },
                { key: "approved_date", title: "Approved", sortable: true },
            ],
            rejectedTableHeaders: [
                { key: "rejecter_email", title: "Rejecter", sortable: true },
                { key: "rejected_date", title: "Rejected", sortable: true },
            ],
            endingKeyHeader: [
                { key: "report_id", title: "" },
            ]
        };
    },
    props: {
        title: {
            type: String,
            default: "Expense Reports",
        },
        height: {
            type: Number,
            default: 250,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default() {
                // array and object prop defaults must be returned by a factory function.
                return [];
            },
        },
        tableType: {
            type: String,
            default: "All",
        }
    },
    computed: {
        user () {
            return this.$auth0.user._value;
        },
				tableIcon () {	
            switch (this.tableType) {
                case "Submitted":
                    return { icon: 'mdi-help-circle-outline', color: 'primary' }
                case "Approved":
                    return { icon: 'mdi-checkbox-marked-circle-outline', color: 'secondary' }
                case "Rejected":
                    return { icon: 'mdi-alert-circle-outline', color: 'error' }
                default:
                    return 'mdi-help'
            }
        },
				filterTableHeaders () {	
            switch (this.tableType) {
                case "Submitted":
                    return [...this.baseTableHeaders, ...this.endingKeyHeader];
                case "Approved":
                    return [...this.baseTableHeaders, ...this.approvedTableHeaders, ...this.endingKeyHeader];
                case "Rejected":
                    return [...this.baseTableHeaders, ...this.rejectedTableHeaders, ...this.endingKeyHeader];
                default:
                    return [...this.baseTableHeaders, ...this.approvedTableHeaders, ...this.rejectedTableHeaders, ...this.endingKeyHeader];
            }
        },
    },
    methods: {
        formatDate (dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat().format(date);
        },
        transformEmailToName (email) {
            let name = email.split("@")[0];
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        async approveReport (report_id) {
            const response = await approveReport(this.$auth0, report_id);
            console.log(response);
            this.toastResponse(response);
            EventBus.emit("refresh", { action: "approved", report_id });
        },
        async deleteReport(report_id) {
            const response = await deleteReport(this.$auth0, report_id);
            console.log(response);
            this.toastResponse(response);
            EventBus.emit("refresh", { action: "deleted", report_id });
        },
        async resetReport(report_id) {
            const response = await resetReport(this.$auth0, report_id);
            console.log(response);
            this.toastResponse(response);
            EventBus.emit("refresh", { action: "reset", report_id });
        },
        async rejectReport(report_id) {
            const response = await rejectReport(this.$auth0, report_id);
            console.log(response);
            this.toastResponse(response);
            EventBus.emit("refresh", { action: "deleted", report_id });
        },
        toastResponse(response) {
            let header = response.success ? "Success:" : "Warning:";
            let body = response.message;
            const announcement = {
                text: `<h3>${header}</h3><p>${body}</p>`,
                type: response.success ? "secondary" : "error",
            };
            EventBus.emit("announce", announcement);
        },
    },
};
</script>
