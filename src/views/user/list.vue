<template>
  <div class="dashboard-container">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="searchForm" label-width="90px" label-suffix="：" size="small">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="preById(null)">新增</el-button>
        <el-button type="info" icon="el-icon-loading" direction="rtl" @click="list(searchForm)">刷新</el-button>
      </el-form-item>

    </el-form>

    <!-- 数据表格 -->
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
      <el-table-column type="id" align="center" min-width="40" label="id" prop="id"/>
      <el-table-column prop="username" label="操作用户" align="center" min-width="100" show-overflow-tooltip />
      <el-table-column prop="createTime" label="操作时间" align="center" min-width="100" show-overflow-tooltip />
      <el-table-column prop="description" label="具体操作" align="center" min-width="100" show-overflow-tooltip />
      <el-table-column label="操作" align="center" fixed="right" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="preById(scope.row.id)">查看细节</el-button>
          <el-button size="mini" type="danger" @click="delById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right" style="margin-top:10px;">
      <el-pagination
        :current-page="searchForm.page"
        :page-sizes="[5]"
        :page-size="searchForm.rows"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <!-- 弹窗 -->
    <list-edit ref="listEdit" @refreshTableData="list(searchForm)"/>
    <list-search ref="listSearch" @refreshTableData="search()" @getLogFromSearch="getLogFromSearch"/>
  </div>
</template>

<script>
import ListEdit from './list-edit'
import ListSearch from './list-search'
import * as user from '@/api/user'

export default {
  name: 'List',
  components: {
    ListEdit,
    ListSearch
  },
  data() {
    return {
      // 表格加载条控制
      tableLoading: false,
      // Table数据
      tableData: [],
      // Table数据总条数
      totalCount: 0,
      // 查询条件
      searchForm: {
      }
    }
  },
  // 启动时就执行
  mounted: function() {
    // 列表查询
    this.searchForm.page = 1
    this.list(this.searchForm)
  },
  methods: {
    // 每页条数改变
    handleSizeChange: function(rows) {
      this.searchForm.rows = rows
      // 刷新列表
      this.list(this.searchForm)
    },
    // 当前页数改变
    handleCurrentChange: function(page) {
      this.searchForm.page = page
      // 刷新列表
      this.list(this.searchForm)
    },
    // 列表查询
    list: function(searchForm) {
      // 加载显示
      this.tableLoading = true
      user.list(searchForm.page).then(response => {
        const data = response.data
        console.log(data)
        this.tableData = data.data
        this.totalCount = data.total
        // this.totalCount = data.count
      }).catch(error => {
        console.log(error)
      }).then(() => {
        // always executed 类似finally
        this.tableLoading = false
      })
    },
    // 调用子组件的preById方法
    preById: function(id) {
      // this.$nextTick Dom渲染完执行
      /* this.$nextTick(() => {
        this.$refs.listEdit.preById(userId)
      }) */
      this.$refs.listEdit.preById(id)
    },
    // 调用子组件的search方法
    search: function() {
      // this.$nextTick Dom渲染完执行
      /* this.$nextTick(() => {
        this.$refs.listEdit.preById(userId)
      }) */
      this.$refs.listSearch.search()
    },
    getLogFromSearch: function(val) {
      console.log(val)
      this.tableData = val
    },
    // 删除
    delById: function(id) {
      this.$confirm('是否确定删除该终端？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定删除操作
        user.delById(id).then(response => {
          // 刷新列表
          this.list(this.searchForm)
          this.$message({
            type: 'success',
            message: response.msg
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
