<template>
  <v-sheet color="grey-darken-1" class="pa-2" elevation="16">
    <v-row>
      <v-col cols="5">
        <v-card class="ml-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">How To Use This App</v-card-subtitle>
          <v-card-text>
            <p>Explain how the Authorization model works.</p>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card class="mr-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">Authorization Model</v-card-subtitle>
          <v-card-text>
          <code-block :code="authModel" language="openfga" parent="AuthModel"></code-block>
          </v-card-text>
        </v-card>

        <v-card class="mr-2 pa-2">
          <v-card-subtitle class="bg-primary text-white">Organization Chart</v-card-subtitle>
          <v-card-text class="text-center">
            <v-sheet class="pa-1" color="grey-darken-2" border="rounded-xl" rounded>
              <v-img :src="orgChart.dark" rounded></v-img>
            </v-sheet>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

  </v-sheet>
</template>

<script>
import CodeBlock from './../CodeBlock.vue';

export default {
  name: 'AuthModel',
  components: {
    CodeBlock
  },
  data () {
    return {
      orgChart: {
        light: '/img/org-chart-light.png',
        dark: '/img/org-chart-dark.png',
      },
      authModel: `model
  schema 1.1

type employee
  relations
    define can_manage: manager or can_manage from manager
    define manager: [employee]

type report
  relations
    define approver: can_manage from submitter
    define submitter: [employee]`
    }
  }
}
</script>