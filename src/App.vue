<template>
  <div id="app">
    <!--<Login v-if="$route.path === '/login'"></Login>-->
    <!--<Home v-else></Home>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './views/Login'
// import Home from './views/Home'
export default {
  name: 'app'
}
</script>

<style lang="scss">
  * {
    margin: 0;
  }

  body, #app {
    min-height: 100vh;
    min-width: 1000px;
  }
</style>
