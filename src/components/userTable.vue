<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%"
                max-height="1000">
            <el-table-column
                    fixed
                    prop="nickname"
                    label="用户名">
            </el-table-column>

            <el-table-column
                    prop="username"
                    label="手机号">
            </el-table-column>

            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.createDate)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="修改时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.updateDate)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteClick(scope.$index,scope.row.id)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                    <el-button
                            @click.native.prevent="updateClick(scope.row)"
                            type="text"
                            size="small">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="50%">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="nickname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateSubmit">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import {$get_header, format, $delete_header, $post_header} from "../api";
    export default {
        name: "userTable",
        created() {
            this.list()
        },
        data(){
            return{
                tableData:[],
                dialogVisible:false,
                nickname:'',
                id:''
            }
        },
        methods:{
            list(){
                $get_header('/admin/sys-user/getUserList').then(res=>{
                    this.tableData = res.data.result
                })
            },
            updateSubmit(){
                let data = {
                    nickname:this.nickname,
                    id:this.id
                };
                $post_header('/admin/sys-user/updateNorUser',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('修改成功');
                        this.dialogVisible = false
                        this.list()
                    }else{
                        this.$message.error(res.data.errorMessage)
                    }
                })
            },
            updateClick(row){
                this.dialogVisible = true;
                this.id = row.id
                this.nickname = row.nickname
            },
            deleteClick(index,id){
               $delete_header('/admin/sys-user/deleteById',id).then(res=>{
                   if(res.data.errorCode=='0000'){
                       this.$message.success('删除成功');
                       this.tableData.splice(index,1)
                   }else{
                       this.$message.error(res.data.errorMessage)
                   }
               })
            },
            formatDate(value){
                if(value==''){
                    return '';
                }
                return format(value,'Y/M/D h:m');
            },
        }
    }
</script>

<style scoped>

</style>