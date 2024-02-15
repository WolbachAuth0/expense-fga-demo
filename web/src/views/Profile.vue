<template>
  <v-card>
    <v-tabs v-model="tab" density="compact">
      <v-tab value="0" class="bg-blue-darken-3" rounded="shaped" prepend-icon="mdi-human-greeting">Profile</v-tab>
    </v-tabs>

    <v-divider></v-divider>

    <v-window v-model="tab">

        <v-window-item :value="0">
          
          <v-sheet color="grey-darken-1" elevation="16" border rounded>
            <v-row>
              <v-col cols="12">
                <v-card class="m-2 pa-2">

                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="text-h5">
                        {{ firstName }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ email }}
                      </v-list-item-subtitle>
                      <template v-slot:prepend>
                        <img :src="user?.picture" alt="User's profile picture" class="rounded-circle img-fluid mx-6" width="100"/>
                      </template>
                    </v-list-item>
                  </v-list>
                  
                  <v-card-text>
                    <code-block :code="user" language="language-json" parent="profile-view"></code-block>
                  </v-card-text>

                </v-card>
              </v-col>
            </v-row>
          </v-sheet>

        </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import CodeBlock from '../components/CodeBlock.vue';
import { transformEmailAddressToFirstName } from "./../utils/string_utils";

export default {
  name: "profile-view",
  components: {
    CodeBlock
  },
  data() {
    return {
      tab: 0
    }
  },
  computed: {
    user () {
      if (this.$auth0.isAuthenticated) {
        return this.$auth0.user._rawValue
      } else {
        return null
      }
    },
    firstName () {
      return transformEmailAddressToFirstName(this.user.email)
    },
    email () {
      return this.user.email
    }
  },
};
</script>

