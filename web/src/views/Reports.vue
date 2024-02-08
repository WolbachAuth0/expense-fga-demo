<template>
  <v-card>
    
    <v-tabs
      v-model="tab"
      density="compact"
    >
      <v-tab value="0" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-file-account">My Expenses</v-tab>
      <v-tab value="1" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-file-multiple">Team Expenses</v-tab>
      <v-tab value="2" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-file-plus">Submit Expense</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-progress-linear :model-value="progress.value" :color="progress.color" :indeterminate="progress.indeterminate"></v-progress-linear>

    <v-window v-model="tab">

      <v-window-item :value="0">
        <v-sheet
          color="grey-darken-1"
          elevation="16"
          border
          rounded
        >

          <v-row>
            <v-col cols="12">
              <v-card class="mx-2 mt-2 px-2">
              <reports-table
                title="Submitted, Awaiting Approval"
                :items="my_reports_submitted"
                :loading="progress.indeterminate"
                :height="275"
              ></reports-table>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card class="mx-2 mb-2 px-2">
              <reports-table
                title="Approved"
                :items="my_reports_approved"
                :loading="progress.indeterminate"
                :height="275"
              ></reports-table>
              </v-card>
            </v-col>
          </v-row>

        </v-sheet>
      </v-window-item>

      <v-window-item :value="1">
        <v-sheet
          color="grey-darken-1"
          elevation="16"
          border
          rounded
        >

         <v-row>
            <v-col cols="12">
              <v-card class="mx-2 mt-2 px-2">
              <reports-table
                title="Submitted, Awaiting Approval"
                :items="team_reports_submitted"
                :loading="progress.indeterminate"
                :height="275"
              ></reports-table>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card class="mx-2 mb-2 px-2">
              <reports-table
                title="Approved"
                :items="team_reports_approved"
                :loading="progress.indeterminate"
                :height="275"
              ></reports-table>
              </v-card>
            </v-col>
          </v-row>

        </v-sheet>
      </v-window-item>

      <v-window-item :value="2">
        <v-sheet
          color="grey-darken-1"
          elevation="16"
          border
          rounded
        >

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
import { getReports } from './../services/api'
import ReportsTable from './../components/ReportsTable.vue'
import SubmitReport from './../components/SubmitReport.vue'
import EventBus from './../services/EventBus'

export default {
  name: "ExpenseReports",
  components: {
    ReportsTable,
    SubmitReport
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
    // fetch initial data
    await this.refreshReports()
    // respond to refresh event.
    this.announce()
    EventBus.on('refresh', this.refreshReports)
  },
  methods: {
    async refreshReports () {
      // get reports from API
      this.progress.color = 'warning'
      this.progress.indeterminate = true
      const response = await getReports(this.$auth0)
      this.progress.indeterminate = false
      this.progress.color = 'success'
      console.log(response)

      // store data to state
      this.my_reports_submitted = response.result.my_submitted_reports.map(processItems)
      this.my_reports_approved = response.result.my_approved_reports.map(processItems)
      this.team_reports_submitted = response.result.team_reports_submitted.map(processItems)
      this.team_reports_approved = response.result.team_reports_approved.map(processItems)
      this.tab = this.tab || 0
      
      function processItems (x) {
        x.isApproved = !!x.approver_id
        x.color = x.isApproved ? 'green' : 'red'
        return x
      }    
    },
    announce () {
      // show alert
      const email = this.$auth0.user._value.email
      const counts = [this.my_reports_submitted.length, this.team_reports_submitted.length]
      const header = `Success:`
      let body = `We found ${counts[0]} expense reports submitted by ${email} `
      body += counts[1] > 0 ? ` and ${counts[1]} reports submitted by subordinates awaiting approval.` : 'awaiting approval.'

      const announcement = {
        text: `<h3>${header}</h3><p>${body}</p>`,
        type: 'success'
      }
      EventBus.emit('announce', announcement)
    }
  }
};
</script>

