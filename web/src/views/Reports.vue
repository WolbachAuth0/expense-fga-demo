<template>
    <v-card>
        <v-tabs v-model="tab" density="compact">
            <v-tab value="0" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-file-account">My Expenses</v-tab>
            <v-tab value="1" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-file-multiple">Team
                Expenses</v-tab>
            <v-tab value="2" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-file-plus">Submit Expense</v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-progress-linear :model-value="progress.value" :color="progress.color"
            :indeterminate="progress.indeterminate" height="7" class="my-1"></v-progress-linear>

        <v-window v-model="tab">
            <v-window-item :value="0">
                <v-sheet color="grey-darken-1" elevation="16" border rounded>
                    <v-row>
                        <v-col cols="12">
                            <v-card class="mx-2 mt-2 px-2">
                                <reports-table title="Submitted, Awaiting Approval" :items="my_reports_submitted"
                                    :loading="progress.indeterminate" :height="275" tableType="Submitted"></reports-table>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-card class="mx-2 mb-2 px-2">
                                <reports-table title="Approved" :items="my_reports_approved"
                                    :loading="progress.indeterminate" :height="275" tableType="Approved"></reports-table>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-card class="mx-2 mb-2 px-2">
                                <reports-table title="Rejected" :items="my_reports_rejected"
                                    :loading="progress.indeterminate" :height="275" tableType="Rejected"></reports-table>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-window-item>

            <v-window-item :value="1">
                <v-sheet color="grey-darken-1" elevation="16" border rounded>
                    <v-row>
                        <v-col cols="12">
                            <v-card class="mx-2 mt-2 px-2">
                                <reports-table title="Submitted, Awaiting Approval" :items="team_reports_submitted"
                                    :loading="progress.indeterminate" :height="275" tableType="Submitted"></reports-table>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-card class="mx-2 mb-2 px-2">
                                <reports-table title="Approved" :items="team_reports_approved"
                                    :loading="progress.indeterminate" :height="275" tableType="Approved"></reports-table>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-card class="mx-2 mb-2 px-2">
                                <reports-table title="Rejected" :items="team_reports_rejected"
                                    :loading="progress.indeterminate" :height="275" tableType="Rejected"></reports-table>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-window-item>

            <v-window-item :value="2">
                <v-sheet color="grey-darken-1" elevation="16" border rounded>
                    <v-row>
                        <v-col cols="12">
                            <v-card class="ma-2 pa-2">
                                <submit-report></submit-report>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import { getReports } from "./../services/api";
import ReportsTable from "./../components/ReportsTable.vue";
import SubmitReport from "./../components/SubmitReport.vue";
import EventBus from "./../services/EventBus";

export default {
    name: "ExpenseReports",
    components: {
        ReportsTable,
        SubmitReport,
    },
    data() {
        return {
            tab: null,
            progress: {
                indeterminate: false,
                value: 100,
                color: "secondary",
            },
            my_reports_submitted: [],
            my_reports_approved: [],
            team_reports_submitted: [],
            team_reports_approved: [],
            my_reports_rejected: [],
            team_reports_rejected: [],
        };
    },
    async mounted() {
        const response = await this.refreshReports();
        this.toastResponse(response);
        EventBus.on("refresh", this.refreshReports);
    },
    methods: {
        async refreshReports() {
            // get reports from API
            this.progress.color = "warning";
            this.progress.indeterminate = true;
            const response = await getReports(this.$auth0);
            this.progress.indeterminate = false;
            this.progress.color = "secondary";
            console.log(response);

            // store data to state
            this.my_reports_submitted =
                response.result.my_reports_submitted?.map(processItems);
            this.my_reports_approved =
                response.result.my_reports_approved?.map(processItems);
            this.team_reports_submitted =
                response.result.team_reports_submitted?.map(processItems);
            this.team_reports_approved =
                response.result.team_reports_approved?.map(processItems);
            this.my_reports_rejected =
                response.result.my_reports_rejected?.map(processItems);
            this.team_reports_rejected =
                response.result.team_reports_rejected?.map(processItems);
            this.tab = this.tab || 0;

            return response
            function processItems(x) {
                x.isApproved = !!x.approver_id;
                x.isRejected = !!x.rejecter_id;
                x.color = x.isApproved ? "green" : "red";
                return x;
            }
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
