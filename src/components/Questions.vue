<template>
  <div class="question-box">
    <el-form ref="form" :model="question" label-width="80px">
      <el-form-item label="答题说明">
        <el-input
          v-model="question.title"
          placeholder="请输入标题名称">
        </el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data () {
    return {
      question: {
        title: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
