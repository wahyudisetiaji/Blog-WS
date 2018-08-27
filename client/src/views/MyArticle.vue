<template>
  <div class="myarticle">
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <h1>My Article</h1>
      </v-flex>
      <v-flex md3>
       <v-btn class="button" to="/myarticle/create" flat>Create Article</v-btn>
      </v-flex>
      <v-flex md12>
        <v-container grid-list-md>
          <router-view/>
        </v-container>
      </v-flex>
    </v-layout>    
    </v-container>
  </div>
</template>

<style>
.button{
  color: #293D52;
  background-color: #FF6F00;
}
</style>
