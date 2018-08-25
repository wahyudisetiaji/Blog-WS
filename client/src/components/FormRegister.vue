<template>
    <div class="form">
    <div class="container">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                      <v-text-field type="password"
                    v-model="password"
                    :rules="passwordRules"
                    :counter="5"
                    label="Password"
                    required
                    ></v-text-field>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    Register
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
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
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
        let token = localStorage.getItem('token')
        if (this.$refs.form.validate()) {
          let data = {
            name: this.name,
            email: this.email,
            password: this.password
          }
          axios({
            method: 'POST',
            url: 'http://localhost:3000/users/register',
            data: {
              name: this.name,
              email: this.email,
              password: this.password 
            },
            headers: {
              token
            }
          })
          .then((result) => {
            swal(`Hai ${result.data.data.name}, Your account has been registered! You must login now.`)
            this.$router.push('/login')
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
