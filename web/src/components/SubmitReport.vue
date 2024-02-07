<template>
  <v-card>
    <v-card-title>Submit Expense Report</v-card-title>  

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-text-field
              type="number"
              v-model="amount.value"
              :label="amount.label"
              :hint="amount.hint"
              :rules="[money]"
              prepend-icon="mdi-currency-usd"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="9">
            <v-text-field
              v-model="merchant.value"
              :label="merchant.label"
              :hint="merchant.hint"
              prepend-icon="mdi-store-outline"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea
              clearable
              v-model="description.value"
              :label="description.label"
              :hint="description.hint"
              prepend-icon="mdi-text-long"
              variant="outlined"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions>
        <v-btn
          variant="outlined"
          color="primary"
          @click="submit"
        >
          Submit
        </v-btn>

        <v-btn
          variant="outlined"
          color="error"
          @click="clear"
        >
          Clear
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { submitReport } from './../services/api'
import EventBus from './../services/EventBus'

export default {
  name: 'SubmitReport',
  data () {
    return {
      amount: {
        value: 0,
        label: 'Amount',
        hint: 'The amount of this expense in USD',
        rules: {}
      },
      merchant: {
        value: '',
        label: 'Merchant',
        hint: 'The proper name of the merchant where this expense was incurred.',
      },
      description: {
        value: '',
        label: 'Description',
        hint: 'A description of the purpose for this expenditure.'
      }
    }
  },
  methods: {
    money (value) {
      // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      const isDecimal = !isNaN(value) && !isNaN(parseFloat(value))
      return isDecimal ? true : 'The amount must be a decimal'
    },
    async submit () {
      const data = {
        amount: this.amount.value,
        merchant: this.merchant.value,
        description: this.description.value,
      }
      const response = await submitReport(this.$auth0, data)

      const email = this.$auth0.user._value.email
      const header = response.success ? `Success:` : 'Error:'
      const body = response.message

      const announcement = {
        text: `<h3>${header}</h3><p>${body}</p>`,
        type: response.success ? 'success' : 'error',
      }
      EventBus.emit('announce', announcement)
      EventBus.emit('refresh', null)
    },
    clear () {
      this.amount.value = 0
      this.merchant.value = ''
      this.description.value = ''
    }
  }
}
</script>