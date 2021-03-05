<template>
  <div id="content">
    <el-card class="box-card">
      <el-button type="primary" icon="el-icon-plus" circle @click="showadd"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle @click="removeadd"></el-button>
      <el-input v-model="input" placeholder="请输入内容" ></el-input>
      <el-button icon="el-icon-search" circle @click="searchData"></el-button>
    </el-card>

    <el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        height="calc(100vh - 320px)"
        max-height="calc(100vh - 320px)"
        :stripe="true"
        :border="true"
        tooltip-effect="dark"
        :header-cell-style="{'text-align':'center', 'background-color': '#f1f1f1'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"

        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog
      title="新增车间"
      :visible.sync="dia1"
      width="25%">
      <el-form :model="form">
        <el-form-item label="车间名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dia1 = false">取 消</el-button>
    <el-button type="primary" @click="sureadd">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "productManagement",
  data(){
    return {
      input: "",
      tableData:[],
      multipleSelection:[],
      dia1:false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
      },
      currentPage:1,
      pageSize:20,
      total:0,
    }
  },
  mounted() {
    this.getData();

  },
  methods:{
    getData() {
      this.loading = true
      const params = {

      }
      // getAllSell(params).then(res => {
      //   this.tableData = res.data.list
      //   this.total = res.data.total
      //   this.loading = false
      // })
    },
    searchData() {
      this.currentPage = 1
      this.getData()
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    // 每页显示多少条数的方法
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getData();
    },

    // 当前页发生变化时触发的方法
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData();
    },
    showadd(){
      this.dia1 = true

    },
    removeadd(){
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请至少选择一行信息',
          type: 'warning'
        })
        return
      }
      const ids = []

      this.multipleSelection.forEach(element => {
        ids.push(parseInt(element.id))
      })
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // delSell({ids: ids}).then(res => {
        //   if (res.code === 200) {
        //     this.$message({
        //       message: res.msg,
        //       type: 'success'
        //     });
        //     this.getData();
        //   }
      })


    },
    sureadd(){


    }
  }
}
</script>

<style scoped>
#content{
  padding: 1%;

}
.box-card{
  margin-bottom:10px
}
.el-input{
  width: 200px;

}
.el-select{
  width: 200px;
}
</style>
