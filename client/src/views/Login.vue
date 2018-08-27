<template>
    <div class="login">
        <WelcomeLogin></WelcomeLogin>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-container grid-list-md>
                    <h2>Log In</h2>
                    <FormLogin></FormLogin> 
                    </v-container>
                </v-flex>
                <v-flex xs6>
                    <v-container grid-list-xs>
                    <h2>Register</h2>
                    <FormRegister></FormRegister>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'
import WelcomeLogin from '@/components/WelcomeLogin.vue'

export default {
  name: 'login',
  components: {
    FormLogin,
    FormRegister,
    WelcomeLogin
  }
}
</script>
