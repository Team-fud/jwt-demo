<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      title="终端Req细节">

      <el-form v-loading="submitLoading" ref="req" :model="req" label-width="100px" label-suffix="：" status-icon>

        <el-form-item label="Req信息" prop="reqData">
          <el-input v-model.trim="req.reqData" placeholder="请输入日志类型"/>
        </el-form-item>

        <el-form-item label="Rsp信息" prop="RspData">
          <el-input v-model.trim="req.rspData" placeholder="请输入方法名称"/>
        </el-form-item>

        <el-form-item label="操作次数" prop="executeTime">
          <el-input v-model.trim="req.executeTime" placeholder="请输入方法名称"/>
        </el-form-item>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import * as req from '@/api/req'

export default {
  data() {
    return {
      // 提交按钮加载
      submitLoading: false,
      // 弹出框是否显示
      dialogVisible: false,
      // 表单新增编辑属性
      req: {
        id: null,
        sn: '',
        ip: '',
        rspData: '',
        reqData: '',
        executeTime: ''
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
      this.$refs.req.validate((valid) => {
        if (valid) {
          if (this.req.id) {
            // userId不为空更新
            req.update(this.req).then(response => {
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
      this.$refs.req.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
      // 刷新父组件列表
      // this.$parent.list(this.$parent.serachForm)
      // 父子组件事件监听刷新父组件列表
      this.$emit('refreshTableData')
      this.submitLoading = false
    },
    preById: function(id) {
      // userId不为空更新
      if (id) {
        this.submitLoading = true
        this.req.id = id
        req.findById(id).then(response => {
          const data = response.data
          this.req = data
          this.submitLoading = false
        })
      } else {
        // id为空新增
        this.req.id = ''
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
