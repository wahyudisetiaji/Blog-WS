<template>
 <div class="carousel">
  <v-carousel hide-delimiters>
    <v-carousel-item
     v-for="(article, index) in this.articles" 
     :key='index'
     :src="article.image"
    ></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
  import axios from 'axios'

export default {
     data () {
      return {
        articles: []
      }
    },
    created () {
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

</style>
