<template>
    <div class="table">
        <v-data-table
            :headers="headers"
            :items="articles"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
            <td>{{ props.item.articleTitle }}</td>
            <td>{{ props.item.date }}</td>
            <td>{{ props.item.author }}</td>
            <td>
               <a class="item-link">
                   <router-link :to="`/myarticle/update/${props.item._id}`">Edit</router-link>
               </a> ||
               <a class="item-link" @click="deleteArticle(props.item._id)" href="#">Delete</a>
            </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Title',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Created At', align: 'center', value: 'date' },
          { text: 'Author', align: 'center', value: 'author' },
          { text: 'Actions', sortable: false, align: 'center', value: 'actions' },
        ],
        articles: []
      }
    },
    methods: {
        deleteArticle (id) {
            let token = localStorage.getItem('token')
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/articles/${id}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                swal('task successfully deleted')
                // setInterval(function(){
                //     window.location='http://localhost:8080/myarticle'
                // }, 2000)
                 this.$router.push('/article')
            })
            .catch((err) => {
                
            })
        },
    },
    mounted() {
        let token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: 'http://localhost:3000/articles/myarticle',
            headers: {
                token
            }})
        .then((result) => {
            this.articles = result.data.articles
        })
        .catch((err) => {});
    }
  }
</script>
