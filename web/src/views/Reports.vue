<template>
  <v-row>
    <v-progress-linear :model-value="progress.value" :color="progress.color" :indeterminate="progress.indeterminate"></v-progress-linear>
    <v-col
      v-for="card in my_reports"
      :key="card"
      cols="12"
    >
      <v-card>
        
        <v-list lines="five">
          <v-list-subheader :title="card.title"></v-list-subheader>

          <template v-for="(item, index) in card.items" :key="index">
            <v-list-item>
              <template v-slot:prepend>
                <v-chip>${{ parseFloat(item.amount).toFixed(2) }}</v-chip>
                <v-chip :color="item.color">{{ item.isApproved ? 'Approved' : 'Awaiting Approval'}}</v-chip>
              </template>
              <v-list-item-title>{{ `${item.description}` }}</v-list-item-title>
              <v-list-item-subtitle>Submitter: {{ item.submitter_email }}</v-list-item-subtitle>
              <v-list-item-subtitle>Submitted Date: {{ item.submitted_date }} </v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.isApproved">Approver: {{ item.approver_email }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.isApproved">Approved Date: {{ item.approved_date }} </v-list-item-subtitle>
            </v-list-item>

            <v-divider v-if="index !== card.items.length" :key="`divider-${index}`" inset></v-divider>
          </template>

        </v-list>
      </v-card>
    </v-col>

    <v-col
      v-for="card in team_reports"
      :key="card"
      cols="12"
    >
      <v-card>
        
        <v-list lines="five">
          <v-list-subheader :title="card.title"></v-list-subheader>

          <template v-for="(item, index) in card.items" :key="index">
            <v-list-item>
              <template v-slot:prepend>
                <v-chip>${{ parseFloat(item.amount).toFixed(2) }}</v-chip>
                <v-chip :color="item.color">{{ item.isApproved ? 'Approved' : 'Awaiting Approval'}}</v-chip>
              </template>
              <v-list-item-title>{{ `${item.description}` }}</v-list-item-title>
              <v-list-item-subtitle>Submitter: {{ item.submitter_email }}</v-list-item-subtitle>
              <v-list-item-subtitle>Submitted Date: {{ item.submitted_date }} </v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.isApproved">Approver: {{ item.approver_email }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.isApproved">Approved Date: {{ item.approved_date }} </v-list-item-subtitle>
            </v-list-item>

            <v-divider v-if="index !== card.items.length" :key="`divider-${index}`" inset></v-divider>
          </template>

        </v-list>
      </v-card>
    </v-col>

    
  </v-row>
</template>

<script>
import api from './../services/api'

export default {
  name: "ExpenseReports",
  data () {
    return {
      progress: {
        indeterminate: false,
        value: 100,
        color: 'primary'
      },
      my_reports: [],
      team_reports: []
    }
  },
  async mounted () {
    this.progress.indeterminate = true
    await this.refreshReports(this.$auth0)
    this.progress.indeterminate = false
  },
  methods: {
    async refreshReports () {
      const response = await api.getReports(this.$auth0)
      console.log(response)
      this.my_reports.push({
        title: 'My Expenses: Awaiting Approval',
        items: response.my_submitted_reports.map(processItems)
      })
      this.my_reports.push({
        title: 'My Expenses: Approved',
        items: response.my_approved_reports.map(processItems)
      })  

      this.team_reports.push({
        title: 'My Team\'s Expenses: Awaiting Approval',
        items: response.team_reports_submitted.map(processItems)
      })
      this.team_reports.push({
        title: 'My Team\'s Expenses: Approved',
        items: response.team_reports_approved.map(processItems)
      })

      function processItems (x) {
        x.isApproved = !!x.approver_id
        x.color = x.isApproved ? 'green' : 'red'
        return x
      }    
    
      

    },

  }
};
</script>

