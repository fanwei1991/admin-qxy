<template>
  <div class="upload-audio">
    <el-upload
      :action="action"
      show-file-list
      :on-success="uploadSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
      <audio v-if="path" controls :src="path" style="vertical-align: middle"></audio>
      <div slot="tip" class="el-upload__tip">只能上传 音/视频 文件，且不超过10MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'VAudio',
  props: {
    audioPath: {
      type: String
    }
  },
  data () {
    return {
      path: '',
      action: 'http://manage.yecaodai.com/api/base/upload'
    }
  },
  created () {
    if (this.audioPath) {
      this.path = this.audioPath
    }
  },
  methods: {
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.$emit('success', res)
    }
  }
}
</script>

<style scoped>

</style>
