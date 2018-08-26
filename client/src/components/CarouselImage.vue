<template>
 <div class="carousel">
  <v-carousel hide-delimiters>
    <v-carousel-item
     v-for="(item, index) in items" 
     :key='index'
     :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
  import axios from 'axios'

export default {
     data () {
      return {
        items: [
          {
            src: 'https://images.unsplash.com/photo-1476158085676-e67f57ed9ed7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef6644fe2531ed73b52d94e6962266e5&auto=format&fit=crop&w=1052&q=80'
          },
          {
            src: 'https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7fccbb5581dbbe541d2c1cf2320d7301&auto=format&fit=crop&w=1500&q=80'
          },
          {
            src: 'https://images.unsplash.com/photo-1523358527035-6d9887f03cac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d0bcf06a3790ceba52a96fd7fa36daf&auto=format&fit=crop&w=967&q=80'
          },
          {
            src: 'https://images.unsplash.com/photo-1494832944834-a08818c634b0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7d2beab4d8e9b5e7a129856951304463&auto=format&fit=crop&w=1189&q=80'
          }
        ]
      }
    },
};
</script>

<style>

</style>
