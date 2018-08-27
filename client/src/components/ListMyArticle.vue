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
            <td>{{ moment(props.item.date).format("dddd, MMMM Do YYYY, h:mm") }} WIB</td>
            <td>
               <a class="item-link">
                   <router-link class="edit" :to="`/myarticle/update/${props.item._id}`">Edit</router-link>
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
  import moment from 'moment'
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
          { text: 'Actions', sortable: false, align: 'center', value: 'actions' },
        ],
        articles: []
      }
    },
    methods: {
        moment: function (date) {
            return moment(date);
        },
        deleteArticle (id) {
            let token = localStorage.getItem('token')
            axios({
                method: 'DELETE',
                url: `${api}/articles/${id}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                swal('task successfully deleted')
                 this.$router.push('/myarticle')
                //  this.$router.go()
            })
            .catch((err) => {
                
            })
        },
    },
    mounted() {
        let token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: `${api}/articles/myarticle`,
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

<style>
.edit {
    text-decoration-line: none;
}

.item-link {
    text-decoration-line: none;
}
</style>

