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
            <v-card-text primary-title>
              <h4 class="articleTitle subheading text-sm-left font-weight-bold">{{article.articleTitle}}</h4><br>  
              <p class="author caption text-sm-left font-italic font-weight-thin">Posted by {{article.userId.name}}</p>
              <p class="date caption text-sm-left font-italic font-weight-light">{{ moment(article.date).format("dddd, MMMM Do YYYY, h:mm") }} WIB</p>
            </v-card-text>
            <v-card-text class="explore-btn">
              <router-link class="explore" :to="`/articles/detail/${article._id}`">
                <v-btn flat color="orange">Explore</v-btn>
              </router-link>
            </v-card-text>
          </v-card>
        </v-flex>
       </v-layout>
   </v-layout> 
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
     data () {
      return {
        articles: []
      }
    },
    methods: {
      moment: function (date) {
        return moment(date);
      },
    },
    mounted() {
        let token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: `${api}/articles`,
            headers: {
                token
            }})
        .then((result) => {
            this.articles = result.data.articles
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

.explore-btn {
  padding: 0px;
}
.explore {
  text-decoration-line: none;
}
</style>

