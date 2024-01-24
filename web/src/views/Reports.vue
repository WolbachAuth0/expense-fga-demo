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

          <template v-for="(item, index) in card.items" :key="index">
            <v-list-item >
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
  }
};
</script>

