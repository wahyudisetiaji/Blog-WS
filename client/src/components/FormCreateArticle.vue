<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Create Article</h2>
    <v-text-field
      v-model="articleTitle"
      :rules="articleTitleRules"
      label="Title"
      required
    ></v-text-field><br>
    <v-layout class="image">
      <label for="image">Image</label>
      <input label="" type="file" id="image" v-on:change="getImage($event)">
    </v-layout><br>
    <v-textarea
      v-model="article"
      :rules="articleRules"
      label="Article"
      required
    ></v-textarea>
     <v-text-field
      v-model="author"
      :rules="authorRules"
      label="Author"
      required
    ></v-text-field>
    <v-text-field
      v-model="tags"
      :rules="tagsRules"
      label="Tags"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
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
      author: '',
      authorRules: [
        v => !!v || 'Author is required',
      ],
      tags: '',
      tagsRules: [
        v => !!v || 'Tags is required',
      ]
    }),

    methods: {
      getImage(link) {
          this.image = link.target.files[0],
          console.log(this.image)  
      },
      submit () {
        if (this.$refs.form.validate()) {
          let token = localStorage.getItem('token')
          let formData = new FormData()

          formData.append("image", this.image)
          axios.post('http://localhost:3000/articles/upload', formData)
          .then((image) => {
              axios({
                  method: 'POST',
                  url: 'http://localhost:3000/articles/create',
                  headers: {
                      token
                  },
                  data: {
                      articleTitle: this.articleTitle,
                      image: image.data.link,
                      article: this.article,
                      author: this.author,
                      tags: this.tags,
                      date: new Date
                  }
              })
              .then((result) => {
                swal(`Your article has been created!`)
                this.$refs.form.reset()
              })
              .catch((err) => {
                swal(err.message)
              });
            
          }).catch((err) => {
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

<style>
.image{
  font-size: 17px;
}
</style>

