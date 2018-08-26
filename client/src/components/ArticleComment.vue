<template>
<v-container grid-list-xs>
    
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-container grid-list-xs> 
                        <v-text-field v-model="comment"
                            label="Add Your Comment"
                        ></v-text-field> 
                        <v-btn  v-if="!token" class="button" color="success" to="/login">Please Login</v-btn>
                        <v-btn v-if="token" class="button" color="success" @click="commentArticle">Comment</v-btn>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
         <v-layout row wrap>
             
            <v-flex xs12>
            <v-card  v-for="(comment, index) in this.comments" :key='index'>
                <v-card-text>
                <div>
                <h4 class="articleTitle subheading text-sm-left font-weight-bold">{{comment.comment}}</h4><br>
                <p class="date caption text-sm-left font-italic font-weight-light">{{comment.name}} - {{ moment(comment.date).format("dddd, MMMM Do YYYY, h:mm") }} WIB</p>
                <v-flex offset-xs10>  
                     <v-btn  v-if="token" class="button-delete" @click="deleteComment(comment._id)" color="success">Delete</v-btn>
                </v-flex>
                </div>
                </v-card-text>
            </v-card>
            </v-flex>
         </v-layout>
</v-container>


</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import moment from 'moment'
export default {
    data () {
      return {
        headers: [
          {
            text: 'Comment',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Date', align: 'center', value: 'date' },
          { text: 'Author', align: 'center', value: 'author' },
        ],
        comments: [],
        comment: '',
        token: localStorage.getItem("token")
      }
    },
    methods: {
        deleteComment(idComment){
            let token = localStorage.getItem('token')
            let idArticle = this.$route.params.id
            axios({
                method: 'PUT',
                url: `http://localhost:3000/articles/comment/delete/${idArticle}`,
                headers: {
                    token
                },
                data: {
                    idComment
                }
            })
            .then((result) => {
                swal(`Your comment has been deleted!`)
                this.comment = ''
                this.$router.go()
            })
            .catch((err) => {
            swal(err.message)
            });
        },
        commentArticle(){
            let id = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: 'PUT',
                url: `http://localhost:3000/articles/comment/${id}`,
                headers: {
                    token
                },
                data: {
                    comment: this.comment,
                }
            })
            .then((result) => {
                swal(`Your comment has been created!`)
                this.comment = ''
                this.$router.go()
            })
            .catch((err) => {
            swal(err.message)
            });
        },
        moment: function (date) {
            return moment(date);
        },
    },
    created() {
        let id = this.$route.params.id
        axios({
            method: 'GET',
            url: `http://localhost:3000/articles/article/${id}`,
        })
        .then((result) => {
            this.comments = result.data.articles[0].comments 
            console.log(result.data.articles[0]);
                       
        })
        .catch((err) => {
          swal(err.message)
        });
      }
}
</script>

<style>
.button{
  color: #293D52;
  background-color: #FF6F00;
}
.comments {
    text-align: right;
}
.button-delete {
    text-align: right;
    color: #293D52;
  background-color: #FF6F00;
}
</style>
