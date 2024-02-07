<template>
  <v-card>
    <v-card-title class="primary">{{ title }}</v-card-title>  
    <v-data-table-virtual
      :items="items"
      :headers="tableHeaders"
      :loading="loading"
      :height="height"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td><v-chip color="success">${{ parseFloat(item.amount).toFixed(2) }}</v-chip></td>
          <td>{{ item.merchant }}</td>
          <td>{{ item.description }}</td>
          <td><v-chip color="primary">{{ item.submitter_email }}</v-chip></td>
          <td>{{ formatDate(item.submitted_date) }}</td>
          <td><v-chip v-if="item.isApproved" color="primary">{{ item.approver_email }}</v-chip></td>
          <td>{{ item.isApproved ? formatDate(item.approved_date) : '' }}</td>
          <td>
            <v-btn
              v-if="!item.isApproved"
              variant="outlined"
              color="primary"
              size="small"
              @click="approveReport(item.report_id)"
            >
              Approve
            </v-btn>
            <v-btn
              v-else
              variant="outlined"
              color="error"
              size="small"
              @click="disapproveReport(item.report_id)"
            >
              Disapprove
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

<script>
import { approveReport, disapproveReport } from './../services/api'
import EventBus from './../services/EventBus'

export default {
  name: "ExpenseReports",
  data () {
    return {
      tableHeaders: [
        { key: 'amount', title: 'Amount' },
        { key: 'merchant', title: 'Merchant' },
        { key: 'description', title: 'Description', sortable: true },
        { key: 'submitter_email', title: 'Submitted By', sortable: true },
        { key: 'submitted_date', title: 'Submitted Date', sortable: true },
        { key: 'approver_email', title: 'Approved By', sortable: true },
        { key: 'approved_date', title: 'Approved Date', sortable: true },
        { key: 'report_id', title: ''}
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
      default () { // array and object prop defaults must be returned by a factory function.
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
  methods: {
    formatDate (dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    },
    async approveReport (report_id) {
      // hit the approve report endpoint
      const response = await approveReport(this.$auth0, report_id)
      console.log(response)

      // display the alert
      let header = response.success ? 'Success:' : 'Warning:'
      let body = response.success ? 
        `Expense report ${report_id} was successfully approved by ${this.$auth0.user._value.email}.` :
        `${this.$auth0.user._value.email} has insufficient permission to approve expense report ${report_id}.`;

      const announcement = {
        text: `<h3>${header}</h3><p>${body}</p>`,
        type: String(response.message).toLowerCase() == 'success' ? 'success' : 'error',
        top: true,
        right: true,
        left: false
      }

      // emit events
      EventBus.emit('announce', announcement)
      EventBus.emit('refresh', { action: 'approved', report_id })
    },
    async disapproveReport (report_id) {
      // hit the approve report endpoint
      const response = await disapproveReport(this.$auth0, report_id)
      console.log(response)

      // display the alert
      let header = 'Disapproved'
      let body = `Expense report ${report_id} was sent back to submitter.`
      const announcement = {
        text: `<h3>${header}</h3><p>${body}</p>`,
        type: 'info',
        top: true,
        right: true,
        left: false
      }

      // emit events
      EventBus.emit('announce', announcement)
      EventBus.emit('refresh', { action: 'disapproved', report_id })
    }
  }
};
</script>

