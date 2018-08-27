<template>
  <div class="welcome">
  <Carousel></Carousel>
  <v-jumbotron>
  <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to the Blog-WS</h3>

          <span class="subheading">Silahkan berbagi cerita perjalananmu atau temukan inspirasimu lewat cerita-cerita perjalanan di Blog-WS dan tips bikin liburan jadi murah.</span>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">Check out our newest articles!</div>

          <v-btn
            class="mx-0 button"
            large
            to="/articles"
          >
            See all article
          </v-btn>
        </v-flex>
      </v-layout>
  </v-container> 
  </v-jumbotron>
  </div>
</template>
<script>
import Carousel from '@/components/CarouselImage.vue'
export default {
  name: 'welcome',
  components: {
    Carousel
  }
}
</script>
<style>

.button {
  background-color: #ffffff;
  color: #293D52;
}
</style>
