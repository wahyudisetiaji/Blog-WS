<template>
    <v-container grid-list-xs>
    <v-layout>
        <v-flex xs12>
        <v-card>
            <v-card-media
            v-bind:src="article.image"
            height="600px"
            ></v-card-media>

            <v-card-text >
                <p class="display-1 text-md-center">{{article.articleTitle}}</p>
                <p class="author caption text-sm-centerfont-italic font-weight-thin">Posted by {{article.userId.name}}</p>
                <p class="date caption text-sm-center font-italic font-weight-light">{{ moment(article.date).format("dddd, MMMM Do YYYY, h:mm") }} WIB</p>
                <p class="body-1">{{article.article}}</p>
            </v-card-text>
        </v-card>
        </v-flex>
    </v-layout> 
     <ArticleComment></ArticleComment>
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ArticleComment from '@/components/ArticleComment.vue'

export default {
    data () {
      return {
        article: ''
      }
    },
    components: {
        ArticleComment
    },
    created() {
      this.getOneArticle()
    },
    methods: {
         moment: function (date) {
            return moment(date);
        },
        getOneArticle () {
        let id = this.$route.params.id
        let token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: `http://localhost:3000/articles/article/${id}`,
            headers: {
                token
            }})
        .then((result) => {
            this.article = result.data.articles[0]
            
        })
        .catch((err) => {
          swal(err.message)
        });
      },
    }
}
</script>

<style>
.articleTitle {
  text-align: center;
}
</style>
