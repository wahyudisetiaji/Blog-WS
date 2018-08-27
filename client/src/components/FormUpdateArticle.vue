<template>
    <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Update Article</h2>
    <v-text-field
      v-model="articleTitle"
      :rules="articleTitleRules"
      label="Title"
      required
    ></v-text-field><br>
      <v-layout class="image">
      <label for="image">Image</label>
      <input label="" type="file" id="image" v-on:change="getImage($event.target.files[0])">
    </v-layout><br>
    <v-textarea
      v-model="article"
      :rules="articleRules"
      label="Article"
      required
    ></v-textarea>
    <v-text-field
      v-model="tags"
      :rules="tagsRules"
      label="Tags"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="update"
    >
      Update
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
        data: () => ({
      valid: true,
      articleTitle: '',
      articleTitleRules: [
        v => !!v || 'Title is required',
      ],
      image: '',
      article: '',
      articleRules: [
        v => !!v || 'Article is required',
      ],
      tags: '',
      tagsRules: [
        v => !!v || 'Tags is required',
      ]
    }),
    created() {
      this.getOneArticle()
    },
    methods: {
      getImage (data) {
        this.image = data
      },
      getOneArticle () {
        let id = this.$route.params.id
        let token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: `${api}/articles/article/${id}`,
            headers: {
                token
            }})
        .then((result) => {
            this.articleTitle = result.data.articles[0].articleTitle,
            this.article = result.data.articles[0].article,
            this.author = result.data.articles[0].author,
            this.tags = result.data.articles[0].tags.toString(" ")
            
        })
        .catch((err) => {
          swal(err.message)
        });
      },
      update () {
        let token = localStorage.getItem('token')
        let id = this.$route.params.id
        if (this.$refs.form.validate()) {
          let formData = new FormData()
          formData.append("image", this.image)
          axios.post(`${api}/articles/upload`, formData)
          .then((image) => {
              axios({
                method: 'PUT',
                url: `${api}/articles/${id}`,
                data: {
                  articleTitle: this.articleTitle,
                  image: image.data.link,
                  article: this.article,
                  author: this.author,
                  tags: this.tags
                },
                headers: {
                  token
                }
                })
              .then((result) => {
                swal(`Your article has been updated!`)
                this.$router.push('/myarticle')
                // this.$router.go()
              })
              .catch((err) => {
                swal(err.message)
              });
          })
          .catch((err) => {
            swal(err.message)
          });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
