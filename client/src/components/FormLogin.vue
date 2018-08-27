<template>
    <div class="form">
    <div class="container">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                      <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :counter="5" type="password"
                    label="Password"
                    required
                    ></v-text-field>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    Log In
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </div>
            <div class="col register">
    </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert'
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must be more than 5 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
           let data = {
            email: this.email,
            password: this.password
          }
          axios.post(`${api}/users/login`, data)
          .then((result) => {
            localStorage.setItem('token', result.data.data.token)
            swal(`Hai ${result.data.data.name}, Your has been login! You can create article now.`)
            // this.$router.push('/')
            // this.$router.go()
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
