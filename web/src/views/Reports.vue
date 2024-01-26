<template>
  <v-row>
    <v-col
      v-for="card in cards"
      :key="card"
      cols="12"
    >
      <v-card>
        <v-list lines="two">
          <v-list-subheader :title="card.title"></v-list-subheader>

          <template>
            <v-list-item v-for="(item, index) in card.items" :key="index">
              <template v-slot:prepend>
                <v-avatar color="grey-darken-1"></v-avatar>
              </template>

              <v-list-item-title :title="item.title"></v-list-item-title>

              <v-list-item-subtitle :title="item.subtitle"></v-list-item-subtitle>
            </v-list-item>

            <v-divider
              v-if="index !== card.items.length"
              :key="`divider-${index}`"
              inset
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from './../services/api'

export default {
  name: "Expense Reports",
  data () {
    return {
      cards: [
        {
          title: 'Submitted', items: [
            {
              title: 'Expense Report Title',
              subtitle: 'Expense Report Reason'
            },
            {
              title: 'Expense Report Title',
              subtitle: 'Expense Report Reason'
            },
            {
              title: 'Expense Report Title',
              subtitle: 'Expense Report Reason'
            }
          ]
        },
        {
          title: 'For My Approval', items: [
            {
              title: 'Expense Report Title',
              subtitle: 'Expense Report Reason'
            },
            {
              title: 'Expense Report Title',
              subtitle: 'Expense Report Reason'
            },
            {
              title: 'Expense Report Title',
              subtitle: 'Expense Report Reason'
            }
          ]
        }
      ]
    }
  },
  async mounted () {
    // const accesstoken = await this.$auth0.getAccessTokenSilently()
    const response = await api.getSubmittedReports(this.$auth0)
    console.log(response)
    // console.log(accesstoken)
  },
  methods: {
    async fetchSubmittedReports () {
      const response = await api.getSubmittedReports(this.$auth0)
      return response
    },
    async fetchReportsToApprove () {
      const response = await api.getReportsToApprove(this.$auth0)
      return response
    }
  }
};
</script>

