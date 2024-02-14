<template>
  <v-snackbar
    v-model="isShown"
    :timeout="timeout"
    :location="location"
    :outlined="outlined"
    :color="color"
  >
    <template v-slot:actions>
      <v-btn text @click="isShown = false">
        Close
      </v-btn>
    </template>
    <v-row>
      <v-col cols="2">
        <v-avatar :color="color">
          <v-icon size="large" :icon="icon"></v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="10" v-html="text"></v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Announcer',
  data () {
    return {
      isShown: false
    }
  },
  computed: {
    title () {
      switch(this.type) {
        case 'success':
          return 'Success !'
        case 'secondary':
          return 'Success !'
        case 'error':
          return 'Error !'
        case 'warning':
          return 'Warning !'
        case 'info':
          return 'Note: '
        default:
          return 'Title'
      }
    },
    color () {
      switch(this.type) {
        case 'success':
          return 'success'
        case 'secondary':
          return 'secondary'
        case 'error':
          return 'error'
        case 'warning':
          return 'warning'
        case 'info':
          return 'info'
        default:
          return 'secondary'
      }
    },
    icon () {
      switch(this.type) {
        case 'success':
          return 'mdi-cloud-check-outline'
        case 'secondary':
          return 'mdi-cloud-check-outline'
        case 'error':
          return 'mdi-cloud-alert'
        case 'warning':
          return 'mdi-alert-outline'
        case 'info':
          return 'mdi-information-outline'
        default:
          return 'mdi-comment-outline'
      }
    }
  },
  props: {
    visible: { type: Boolean },
    text: { type: String, default: '' },
    timeout: { type: Number, default: 2000 },
    location: { type: String, default: 'top center' },
    outlined: { type: Boolean, default: false },
    type: {
      validator (value) {
        return [ 'success', 'secondary', 'error', 'warning', 'info' ].indexOf(value) !== -1
      }
    }
  },
  watch: {
    visible (newValue, oldValue) {
      this.isShown = newValue
    },
    isShown(newValue, oldValue) {
      if (newValue) {
        this.$emit('show', true)
      } else {
        this.$emit('hide', false)
      }
      
    }
  }
}
</script>
