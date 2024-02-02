<template>
  <v-card>
    
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab v-for="(tab, kdx) of tabs" :value="kdx" :key="kdx">{{ tab.name }}</v-tab>
    </v-tabs>
    
    <v-progress-linear :model-value="progress.value" :color="progress.color" :indeterminate="progress.indeterminate"></v-progress-linear>

    <v-window v-model="tab">
      <v-window-item v-for="(tab, idx) of tabs" :key="idx" :value="idx">
        <v-container fluid>
          <v-row v-for="(table, jdx) of tab.datatables" :key="jdx">
      
            <v-col cols="12">
              <v-card>
                <v-card-title class="primary">{{ table.title }}</v-card-title>
                
                <v-data-table-virtual
                  :items="table.items"
                  :headers="tableHeaders"
                  height="300"
                >
                  <template v-slot:item.amount="{ item }">
                    <v-chip color="success">${{ parseFloat(item.amount).toFixed(2) }}</v-chip>
                  </template>

                  <template v-slot:item.submitter_email="{ item }">
                    <v-chip color="primary">{{ item.submitter_email }}</v-chip>
                  </template>

                  <template v-slot:item.submitted_date="{ item }">
                    {{ formatDate(item.submitted_date) }}
                  </template>

                  <template v-slot:item.approver_email="{ item }">
                    <v-chip v-if="item.isApproved" color="primary">{{ item.approver_email }}</v-chip>
                  </template>

                  <template v-slot:item.approved_date="{ item }">
                    {{ item.isApproved ? formatDate(item.approved_date) : '' }}
                  </template>
                
                  <template v-slot:item.report_id="{ item }">
                    <v-btn v-if="!item.isApproved" variant="outlined" color="primary">Approve</v-btn>
                  </template>
                </v-data-table-virtual>

              </v-card>
            </v-col>

          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import api from './../services/api'

export default {
  name: "ExpenseReports",
  data () {
    return {
      tab: null,
      progress: {
        indeterminate: false,
        value: 100,
        color: 'success'
      },
      tableHeaders: [
        { key: 'amount', title: 'Amount' },
        { key: 'merchant', title: 'Merchant' },
        { key: 'description', title: 'Description', sortable: true },
        { key: 'submitter_email', title: 'Submitted By', sortable: true },
        { key: 'submitted_date', title: 'Submitted Date', sortable: true },
        { key: 'approver_email', title: 'Approved By', sortable: true },
        { key: 'approved_date', title: 'Approved Date', sortable: true },
        { key: 'report_id', title: ''}
      ],
      tabs: []
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

      this.tabs.push({
        name: 'My Expenses',
        datatables: [
          {
            title: 'Submitted, Awaiting Approval',
            items: response.my_submitted_reports.map(processItems)
          },
          {
            title: 'Approved',
            items: response.my_approved_reports.map(processItems)
          }
        ]
      })

      this.tabs.push({
        name: 'Team Expenses',
        datatables: [
          {
            title: 'Submitted, Awaiting Approval',
            items: response.team_reports_submitted.map(processItems)
          },
          {
            title: 'Approved',
            items: response.team_reports_approved.map(processItems)
          }
        ]
      })
      this.tab = 1

      function processItems (x) {
        x.isApproved = !!x.approver_id
        x.color = x.isApproved ? 'green' : 'red'
        return x
      }    
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    }
  }
};
</script>

