<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      title="日志细节">

      <el-form v-loading="submitLoading" ref="log" :model="log" :rules="userRules" label-width="100px" label-suffix="：" status-icon>

        <el-form-item label="操作用户" prop="username">
          <el-input v-model.trim="log.username" placeholder="请输入用户名称"/>
        </el-form-item>

        <el-form-item label="操作信息" prop="params">
          <el-input v-model.trim="log.params" placeholder="请输入操作信息"/>
        </el-form-item>

        <el-form-item label="用户ip" prop="reqId">
          <el-input v-model.trim="log.reqIp" placeholder="请输入用户ip"/>
        </el-form-item>

        <el-form-item label="日志类型" prop="logType">
          <el-input v-model.trim="log.logType" placeholder="请输入日志类型"/>
        </el-form-item>

        <el-form-item label="方法名称" prop="method">
          <el-input v-model.trim="log.method" placeholder="请输入方法名称"/>
        </el-form-item>

        <el-form-item label="错误信息" prop="exceptionDetail">
          <el-input v-model.trim="log.exceptionDetail"/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">提 交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import * as user from '@/api/user'

export default {
  data() {
    return {
      // 提交按钮加载
      submitLoading: false,
      // 弹出框是否显示
      dialogVisible: false,
      // 表单新增编辑属性
      log: {
        id: null,
        username: '',
        createTime: '',
        description: '',
        params: '',
        logType: '',
        method: '',
        exceptionDetail: '',
        executeTime: '',
        reqIp: ''
      },
      // 表单检验规则
      userRules: {
        username: [
          { required: true, message: '请输入终端名称', trigger: 'blur' }
        ]
      }
    }
  },
  // 启动时就执行
  mounted: function() {

  },
  methods: {
    // 提交新增或更新
    submitForm() {
      this.submitLoading = true
      this.$refs.log.validate((valid) => {
        if (valid) {
          if (this.log.id) {
            // userId不为空更新
            user.update(this.log).then(response => {
              // 执行成功重置表单且弹出提示信息
              this.resetForm()
              this.$message({
                type: 'success',
                message: response.msg
              })
            }).catch(error => {
              console.log(error)
            }).then(() => {
              // always executed 类似finally
              this.submitLoading = false
            })
          }
        } else {
          this.submitLoading = false
          return false
        }
      })
    },
    // 重置
    resetForm() {
      // 清空表单
      this.$refs.log.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
      // 刷新父组件列表
      // this.$parent.list(this.$parent.serachForm)
      // 父子组件事件监听刷新父组件列表
      this.$emit('refreshTableData')
      this.submitLoading = false
    },

    // 准备新增或更新
    preById: function(id) {
      // userId不为空更新
      if (id) {
        this.submitLoading = true
        this.log.id = id
        user.findById(id).then(response => {
          const data = response.data
          this.log = data
          this.submitLoading = false
        })
      } else {
        // id为空新增
        this.log.id = ''
      }
      // 显示弹出框
      this.dialogVisible = true
    },
    // 弹窗关闭事件方法
    handleClose(done) {
      // 重置表单
      this.resetForm()
      done()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
