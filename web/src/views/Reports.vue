<template>
  <v-card>
    
    <v-tabs
      v-model="tab"
      density="compact"
    >
      <v-tab value="0" class="bg-primary" rounded="shaped">My Expenses</v-tab>
      <v-tab value="1" class="bg-primary" rounded="shaped">Team Expenses</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-progress-linear :model-value="progress.value" :color="progress.color" :indeterminate="progress.indeterminate"></v-progress-linear>

    <v-window v-model="tab">

      <v-window-item :value="0">
        <v-container fluid>

          <v-row>
            <v-col cols="12">
              <reports-table
                title="Submitted, Awaiting Approval"
                :items="my_reports_submitted"
                :loading="progress.indeterminate"
                :height="250"
              ></reports-table>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <reports-table
                title="Approved"
                :items="my_reports_approved"
                :loading="progress.indeterminate"
                :height="250"
              ></reports-table>
            </v-col>
          </v-row>

        </v-container>
      </v-window-item>

      <v-window-item :value="1">
        <v-container fluid>

         <v-row>
            <v-col cols="12">
              <reports-table
                title="Submitted, Awaiting Approval"
                :items="team_reports_submitted"
                :loading="progress.indeterminate"
                :height="250"
              ></reports-table>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <reports-table
                title="Approved"
                :items="team_reports_approved"
                :loading="progress.indeterminate"
                :height="250"
              ></reports-table>
            </v-col>
          </v-row>

        </v-container>
      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import api from './../services/api'
import ReportsTable from './../components/ReportsTable.vue'

export default {
  name: "ExpenseReports",
  components: {
    ReportsTable
  },
  data () {
    return {
      tab: null,
      progress: {
        indeterminate: false,
        value: 100,
        color: 'success'
      },
      my_reports_submitted: [],
      my_reports_approved: [],
      team_reports_submitted: [],
      team_reports_approved: []
    }
  },
  async mounted () {
    this.progress.color = 'warning'
    this.progress.indeterminate = true
    await this.refreshReports(this.$auth0)
    this.progress.indeterminate = false
    this.progress.color = 'success'
  },
  methods: {
    async refreshReports () {
      const response = await api.getReports(this.$auth0)
      console.log(response)

      this.my_reports_submitted = response.my_submitted_reports.map(processItems)
      this.my_reports_approved = response.my_approved_reports.map(processItems)
      this.team_reports_submitted = response.team_reports_submitted.map(processItems)
      this.team_reports_approved = response.team_reports_approved.map(processItems)
    
      this.tab = 0

      function processItems (x) {
        x.isApproved = !!x.approver_id
        x.color = x.isApproved ? 'green' : 'red'
        return x
      }    
    },
    async approveReport (report_id) {
      alert(`you clicked "Approve" on expense report ${report_id}`)
    }
  }
};
</script>

