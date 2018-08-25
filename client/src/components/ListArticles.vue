<template>
   <v-layout row wrap >
      <v-container grid-list-xs>
        <v-flex md12>
          <h1>All Articles</h1>
        </v-flex>
      </v-container>
      <v-layout class="card-layout">
        <v-flex xs12 v-for="(article, index) in this.articles" :key='index'>
          <v-card class="card" >
            <v-card-media
              v-bind:src="article.image"
              height="200px"
            ></v-card-media>
            <v-card-title primary-title>
              <h4 class="articleTitle">{{article.articleTitle}}</h4>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat :to="`/articles/detail/${article._id}`" color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
       </v-layout>
   </v-layout> 
</template>

<script>
import axios from 'axios'

export default {
     data () {
      return {
        articles: []
      }
    },
    mounted() {
        let token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: 'http://localhost:3000/articles',
            headers: {
                token
            }})
        .then((result) => {
            this.articles = result.data.articles
            console.log(this.articles);
            
        })
        .catch((err) => {});
    }
};
</script>

<style>

.card {
 margin: 10px
}

.articleTitle {
  text-align: left;
}
</style>

