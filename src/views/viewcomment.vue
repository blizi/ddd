<template>
    <div>
        <el-dialog
                title="回复评论"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form>
                <el-form-item label="待回复评论">
                    <el-input   type="textarea"
                                autosize v-model="toBeReplied" disabled placeholder="待回复评论"></el-input>
                </el-form-item>
                <el-form-item label="回复内容">
                    <el-input v-model="reply" type="textarea" placeholder="请输入回复内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="replySubmit">确 定</el-button>
             </span>
        </el-dialog>
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="comments.id"
                border
                :tree-props="{children: 'reply', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="comments.content"
                    label="评论内容"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="creatorName"
                    label="发表人">
            </el-table-column>
            <el-table-column
                    label="发表时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.comments.createDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteClick(scope)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                    <el-button
                            @click.native.prevent="updateClick(scope)"
                            type="text"
                            size="small">
                        回复评论
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {$get_header, format, $delete_header, $post_header} from '../api'
    export default {
        name: "viewcomment",
        props:["pId"],
        methods:{
            replySubmit(){
                this.dialogVisible = false
                let data = {
                    content:this.reply,
                    parentId:this.parentId,
                    type:1
                };
                $post_header('/admin/comments/insert',this.qs.stringify(data)).then(res=>{
                   if(res.data.errorCode='0000'){
                       this.$message.success('回复成功')
                       this.list();
                   } else{
                       this.$message.error('回复失败')
                   }
                   this.clear()
                });
            },
            clear(){
                this.reply='';
                this.toBeReplied='';
                this.parentId=''
            },
          list(){
              $get_header('/admin/comments/getList',{id:this.pId}).then(res=>{
                  this.tableData = res.data.result
              })
          },
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            deleteClick(value){
                $delete_header('/admin/comments/delete',value.row.comments.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功');
                        this.list()
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            updateClick(val){
              this.dialogVisible = true;
              this.toBeReplied = val.row.comments.content;
              this.parentId = val.row.comments.id
            }
        },
        created() {
            this.list();
        },
        data() {
            return {
                tableData: [],
                dialogVisible:false,
                toBeReplied:'',
                reply:'',
                parentId:''
            }
        },
    }
</script>

<style scoped>

</style>