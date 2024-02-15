<template>
  <v-sheet color="grey-darken-1" class="pa-2" elevation="16">
    <v-row>
      <v-col cols="6">
        <v-card class="ml-2 my-2 px-2">

          <v-card-subtitle class="bg-primary text-white">Welcome</v-card-subtitle>
          <v-card-text>
            <p>
              The purpose of this application is to demonstrate how the Okta FGA service might be used in a live
              production application. This application uses a fairly simple fine grained authorization (FGA) model, 
              but it's still a model that illustrates the limitations of role based access control (RBAC) for common
              applications.
            </p>
          </v-card-text>

          <v-card-subtitle class="bg-primary text-white">About Okta Fine Grained Authorization</v-card-subtitle>
          <v-card-text>
            <p>
              Okta FGA is an authorization system as a service. It is based on a concept called Relationship Based 
              Access Control (ReBAC). ReBAC can be understood as an evolution of Role Based Access Control (RBAC) and 
              Attribute Based Access Control (ABAC). It was inspired by a white paper published by Google a few 
              years ago, where they described how they implemented authorization internally using a system called 
              “Google Zanzibar” across all of their teams. In the whitepaper, they described how they made the system 
              scale to meet their needs for services like Google Drive, Google Cloud and YouTube.
            </p>
            <br/>
            <p>
              The benefit of fine grained authorization (FGA) over traditional role based access control (RBAC) systems
              is that it permits your application to grant access to individual resources in your system. 
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="mr-2 my-2 pa-4">
          <v-card-text class="text-center">
            
            <v-sheet class="pa-1" color="grey-darken-2" border="rounded-xl" rounded>
              <video playsinline="" autoplay="" muted="" >
                <source :src="video.src" :type="video.type">
                Your browser does not support the video tag.
              </video>
            </v-sheet>

          </v-card-text>
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

<style scoped>
  video {
    width: 100%    !important;
    height: auto   !important;
  }
</style>