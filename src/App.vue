<template>
  <div id="app">
    fanwei
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      {{API_URL}}
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { getInfo } from './api/test'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      API_URL: process.env.NODE_ENV + ':::' + process.env.VUE_APP_API_URL + ':::' + process.env.VUE_APP_UPLOAD_URL
    }
  },
  created () {
    getInfo()
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
