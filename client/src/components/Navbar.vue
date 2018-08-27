<template>
    <div class="navbar">
        <v-toolbar>
        <v-toolbar-title>BLOG<img class="logo-ws" alt="ws logo" src="../assets/logo-ws.png"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down button-navbar">
            <v-btn to="/" flat>Home</v-btn>
            <v-btn to="/articles" flat>Article</v-btn>
            <v-btn v-if="token" to="/myarticle" flat>My Article</v-btn>
            <v-btn v-if="!token" to="/login" flat>Log In</v-btn>
            <v-btn v-if="token" @click="logout" flat>Log Out</v-btn>
        </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
import swal from 'sweetalert'
export default {
    data(){
        return {
            token: localStorage.getItem('token')
        }},   
    methods: {
        logout () {
            localStorage.clear()
            swal(`Thanks for join in Blog-WS, See you next time!`)
            this.$router.push('/')
            // this.$router.go()
        }
    },
    created(){
        this.token = localStorage.getItem('token')
    }
}
</script>

<style>
.logo-ws{
    width: 30%;
}

.navbar a {
    color:#293D52;
}

</style>
