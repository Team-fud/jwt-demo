<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      :title="搜索"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%">

      <el-form v-loading="submitLoading" ref="terminal" :model="terminal" :rules="userRules" label-width="100px" label-suffix="：" status-icon>
        <h3 class="title">搜索终端</h3>
        <el-form-item label="名称" prop="cateName">
          <el-input v-model.trim="terminal.cateName" placeholder="请输入搜索内容"/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">搜 索</el-button>
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
      // Table数据
      tableData: [],
      // 表单新增编辑属性
      terminal: {
        id: null,
        cateName: ''
      },
      // 表单检验规则
      userRules: {
        cateName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
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
      this.$refs.terminal.validate((valid) => {
        if (valid) {
          user.search(this.terminal.cateName).then(response => {
            // 执行成功重置表单且弹出提示信息
            const data = response.data
            this.tableData = data
            this.resetForm()
            this.$message({
              type: 'success',
              message: response.msg
            })
          }).catch(error => {
            console.log(error)
            this.resetForm()
          }).then(() => {
            // always executed 类似finally
            this.submitLoading = false
          })
        } else {
          this.submitLoading = false
          return false
        }
      })
    },
    // 重置
    resetForm() {
      // 清空表单
      this.$refs.terminal.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
      // 刷新父组件列表
      // this.$parent.list(this.$parent.serachForm)
      // 父子组件事件监听刷新父组件列表
      // eslint-disable-next-line eqeqeq
      if (Object.keys(this.tableData).length != 0) {
        // eslint-disable-next-line eqeqeq
        this.$emit('getTerminalFromSearch', this.tableData)
      }
      this.submitLoading = false
    },

    // 准备新增或更新
    search: function() {
      // userId不为空更新
      this.submitLoading = false
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
