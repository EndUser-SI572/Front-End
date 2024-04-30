<template>
  <v-app>
    <AppBarAgricul v-if="usertype === 1" />
    <AppBar v-else />
    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBarAgricul from './components/navigation-bar/appbar-agricult.vue'
import AppBar from './components/navigation-bar/app-bar.vue'

export default {
  name: 'App',
  components: {
    AppBarAgricul,
    AppBar
  },
  data() {
    return {
      usertype: 0
    }
  },
  created() {
    this.verifyUserType()
  },
  methods: {
    verifyUserType() {
      const routeName = this.$route.name
      if (routeName === 'agricultor-login' || routeName === 'agricultor-register') {
        this.usertype = 0
      } else if (routeName.includes('agricult')) {
        this.usertype = 1
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
