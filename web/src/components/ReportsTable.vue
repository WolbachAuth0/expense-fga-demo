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
              @click="approveReport(item.report_id)"
            >
              Approve
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

<script>

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
    }
  }
};
</script>

