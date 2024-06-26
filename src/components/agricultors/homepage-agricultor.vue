<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-img class="agri" contain :src="loginData.image"></v-img>
        <v-card class="rounded-xl">
          <v-card-title class="mt-4">Welcome: <br> {{loginData.name}}</v-card-title>
        </v-card>
        <v-spacer class="my-5"></v-spacer>
        <template>
          <v-btn block color="primary" rounded @click="openDialog()">New Post</v-btn>
          <v-dialog v-model="dialog" max-width="800px">
            <v-flex class="mx-auto" v-if="formAdd">
              <v-card class="mb-3 pa-3">
                <v-form @submit.prevent="addPublication">
                  <v-text-field label="To post" v-model="defaultPublication.title"></v-text-field>
                  <v-textarea label="What do you want to publish?" v-model="defaultPublication.description"></v-textarea>
                  <v-btn block color=#BBDEFB type="submit" @click="closeDialog()">Add Published</v-btn>
                </v-form>
              </v-card>
            </v-flex>
          </v-dialog>
        </template>
        <v-divider inset vertical class="mx-4"></v-divider>
        <v-sheet elevation="8" class="pa-2" rounded="xl" color=white>
          <v-list shaped >
            <v-list-item v-for="item in items" :key="item.text" @click="redirectTo(item.routeName, userId)">
              <v-list-item-content >
                <v-list-item-title>
                  {{item.text}}
                  <v-divider></v-divider>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col lg="10">
        <v-carousel height="20vh" hide-delimiter-background show-arrows-on-hover rounded="lg" cycle interval="5000">
          <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="carousel_text text-h5 white--text font-weight-medium">
                  {{ slide }}
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-divider inset vertical></v-divider>
        <v-flex class="mx-auto" v-if="!formEdit">
          <v-card class="mb-3 pa-3">
            <v-form @submit.prevent="editPublication">
              <v-text-field label="To post" v-model="editedPublication.title"></v-text-field>
              <v-textarea label="What do you want to publish?" v-model="editedPublication.description"></v-textarea>
              <v-btn block color="primary" type="submit">Edit Published</v-btn>
            </v-form>
          </v-card>
        </v-flex>

        <v-divider inset vertical></v-divider>

        <v-flex class="mx-auto">
          <v-card class="mb-3" v-for="publication in publications" :key="publication">
              <v-row
                  align="center"
                  class="ml-4 mt-4"
                  no-gutters
              >
                <v-avatar size="40">
                  <img
                      alt="user"
                      :src="publication.agricultor.image"
                  >
                </v-avatar>
                <p class="ml-2 mt-4">{{publication.agricultor.name}}</p>
              </v-row>
            <v-divider></v-divider>
            <v-card-title>{{publication.title}}</v-card-title>
            <v-card-text>
              <p class="black--text">{{publication.description}}</p>
              <v-row class="ml-0">
                <v-chip-group  v-for="tag in tags" :key="tag">
                  <v-chip v-if="tag.publication.id === publication.id" color="primary" outlined>{{tag.text}}</v-chip>
                </v-chip-group>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="white" @click="editChanges(publication)">Edit</v-btn>
              <v-btn color="primary" @click="deletePost(publication)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

      </v-col>

      <v-snackbar v-model="snackbar">
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-dialog v-model="dialogInfo" width="400" v-if="selectedAgricultor!=null" persistent>
        <v-card>
          <v-col align="center">
            <v-avatar width="100" height="100">
              <v-img :src="selectedAgricultor.image"></v-img>
            </v-avatar>
          </v-col>
          <v-card-title class="justify-center">{{ selectedAgricultor.name }}</v-card-title>
          <v-card-subtitle class="text-center">CMP: {{ selectedAgricultor.cmp }}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedAgricultor.about }}</v-card-text>
          <v-container>
            <v-layout>
              <v-flex>
                <v-flex class="mt-2 text-end">
                  <v-btn @click.stop="dialogInfo=false">Close</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogTag" width="400">
        <v-card  class="mb-3 pa-3">
          <v-form @submit.prevent="addTag">
            <v-text-field label="Add Tag" v-model="defaultTag.text"></v-text-field>
            <v-btn block color=#BBDEFB type="submit" @click="closeDialogTag()">Add Tag</v-btn>
          </v-form>
        </v-card>
      </v-dialog>

    </v-row>
  </v-container>
</template>

<script>

import PublicationsApiService from "../../core/services/publications-api-service"
import AgricultorsApiService from "../../core/services/agricultors-api.service"

export default {
  name: "homepage-agricultor",
  data: () => ({
    items: [
      {text: 'Products', routeName:'dashboard_agricult'},
    ],
    colors: [
      '#03A9F4',
      '#03A9F4',
    ],
    slides: [
      'Up to 20% discount on the new package !!!',
      'Schedule with our new Products!'
    ],
    publications: [],
    agricultors: [],
    loginData: [],
    tags: [],
    snackbar: false,
    message: '',
    formAdd: true,
    formEdit: true,
    dialog: false,
    dialogInfo: false,
    dialogTag: false,
    selectedAgricultor: null,

    userId: "",
    editedIndex: 0,
    deletedIndex: 0,
    editedPublication:{
      id: 0,
      title: "",
      description: "",
      img: "",
      createdAt: "",
      agricultorId: 0
    },
    defaultPublication: {
      id: 0,
      title: "",
      description: "",
      img: "",
      createdAt: "",
      agricultorId: 0
    },
    defaultTag: {
      text: "",
      publicationId: 0
    }

  }),


  created() {
    this.userId = this.$route.params.id;
    this.retrievePublications();
    this.retrieveAgricultors();
  },


  methods: {
    retrievePublications(){
      PublicationsApiService.getByAgricultorId(this.userId)
       .then(response => {
         this.publications = response.data;
         console.log(response.data);
       })
       .catch(e=>{
        console.log(e);
       });
    },

    retrieveAgricultors(){
      AgricultorsApiService.getAll()
          .then(response => {
            this.agricultors = response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e);
          });

      AgricultorsApiService.getById(this.userId)
          .then(response => {
            this.loginData = response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e);
          });

    },


    async addPublication(){
      if(this.defaultPublication.title === '' || this.defaultPublication.description === '') {
        this.snackbar = true
        this.message = 'Llena todos los campos'
      }
      else {
        this.defaultPublication.tags = "tags"
          this.defaultPublication.content = "content"

        this.defaultPublication.photoUrl = "https://static.vecteezy.com/system/resources/previews/011/190/762/original/text-new-post-speech-bubble-hand-drawn-illustration-design-for-stickers-png.png"

          try {
              await PublicationsApiService.create(this.defaultPublication, this.userId );
              const response = await PublicationsApiService.getByAgricultorId(this.userId);
              this.publications = response.data;
          } catch (error) {
              alert(error);
          }
      }
    },

    openDialog(){
       this.dialog = true;
    },

    closeDialog(){
      this.dialog = false;
    },

    openDialogTag(publicationId){
      this.dialogTag = true;
      this.defaultTag.publicationId = publicationId;
    },

    closeDialogTag(){
      this.dialogTag = false;
    },

    async addTag(){
      await PublicationsApiService.createTag(this.defaultTag);
      const response = await PublicationsApiService.getTags();
      this.tags = response.data;
    },

    editChanges(item){
      this.formEdit = false;
      this.editedIndex = this.publications.indexOf(item);
      this.editedPublication = Object.assign({}, item);
    },

    editPublication(){
      this.formEdit = true;
      Object.assign(this.publications[this.editedIndex], this.editedPublication);
      PublicationsApiService.update(this.editedPublication.id, this.editedPublication);
      this.snackbar = true;
      this.message = 'Post edited successfully';
    },

    deletePost(item) {
      this.deletedIndex = this.publications.indexOf(item);
      PublicationsApiService.delete(item.id);
      this.publications.splice(this.deletedIndex, 1);
    },

    agricultorDialog(agricultor){
      console.log('agricultorDialog agricultor:', agricultor);
      this.selectedAgricultor = agricultor;
      this.dialogInfo = true;
    },

    redirectTo(router, id) {
      this.$router.push({name: router, params:{id: id}})
    }

  }
}
</script>


<style scoped>
.agri {
  border-radius: 10%;
}



</style>