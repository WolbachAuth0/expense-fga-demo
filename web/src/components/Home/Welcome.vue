<template>
  <v-sheet
    color="grey-darken-1"
    elevation="16"
    border
    rounded
  >
    <v-row>
      <v-col cols="6">
        <v-card class="ml-2 my-2 px-2">
          <v-card-subtitle class="bg-primary text-white">About Auth0 Fine Grained Authorization</v-card-subtitle>
          <v-card-text>
            <p>
              Auth0 FGA is an authorization system as a service. It is based on a concept called Relationship Based 
              Access Control (ReBAC). ReBAC can be understood as an evolution of Role Based Access Control (RBAC) and 
              Attribute Based Access Control (ABAC). It was inspired by a white paper published by Google a few 
              years ago, where they described how they implemented authorization internally using a system called 
              “Google Zanzibar” across all of their teams. In the whitepaper, they described how they made the system 
              scale to meet their needs for services like Google Drive, Google Cloud and YouTube.
            </p>
            <p>
              The benefit of fine grained authorization (FGA) over traditional role based access control (RBAC) systems
              is that it permits your application to grant access to individual resources in your system. 
            </p>
          </v-card-text>

          <!-- <v-card-subtitle class="bg-primary text-white">Application Architecture</v-card-subtitle>
          <v-card-text>
            
          </v-card-text> -->

        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="mr-2 my-2">
          <video playsinline="" autoplay="" muted="" width="600">
            <source :src="video.src" :type="video.type">
            Your browser does not support the video tag.
          </video>

        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>

export default {
  name: 'Welcome',
  data () {
    return {
      video: {
        src: 'https://videos.ctfassets.net/kbkgmx9upatd/Ouq9kAnc4z5kaRw346rGp/7f170c4a8f85a2222ee9784d6945161a/block-2.mp4',
        type: 'video/mp4'
      }
    }
  }
}
</script>