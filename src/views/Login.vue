<template>
  <div class="login">
    login
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      redirectUrl: decodeURIComponent(this.$route.query.redirect) || ''
    }
  },
  methods: {
    login () {
      sessionStorage.setItem('userId', '221')
      if (this.redirectUrl) {
        this.$router.replace(this.redirectUrl)
      } else {
        this.$router.replace('/questions/list')
      }
    }
  }
}
</script>

<style scoped>

</style>
