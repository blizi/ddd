<template>
    <div>
        <el-button @click="dialogVisible = true">新增</el-button>

        <el-dialog
                title="新增"
                :visible.sync="dialogVisible"
                width="50%">

            <el-form>
                <el-form-item label="标题">
                    <el-input v-model="title" placeholder="请输入内容"/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                            v-model="content"
                            type="textarea"
                            maxlength="256"
                            show-word-limit
                            :rows="2"
                            placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </span>
        </el-dialog>
<!--        update-->
        <el-dialog
                title="新增"
                :visible.sync="dialogVisible1"
                width="50%">

            <el-form>
                <el-form-item label="标题">
                    <el-input v-model="title" placeholder="请输入内容"/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                            v-model="content"
                            type="textarea"
                            maxlength="256"
                            show-word-limit
                            :rows="2"
                            placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </span>
        </el-dialog>

        <el-table
                :data="tableData"
                style="width: 100%"
                max-height="500">
            <el-table-column
                    fixed
                    prop="hardTitle"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="hardContent"
                    label="内容">
            </el-table-column>
            <el-table-column
                    prop="creatorName"
                    label="创建人">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.createDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="updateName"
                    label="修改人">
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
                            @click.native.prevent="deleteClick(scope)"
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
                    <el-button
                            @click.native.prevent="updateInfo(scope.row)"
                            type="text"
                            size="small">
                        内容编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {$delete_header, $get_header, $post_header, format} from "../api";
    export default {
        name: "viewHard",
        created() {
            this.list()
        },
        methods:{
            updateInfo(val){
                console.log(val)
                this.$router.push({
                    path: '/hard/hard-edit',
                    query: {
                        id: val.id,
                        title:val.hardTitle
                    }
                })
            },
            update(){
                this.dialogVisible1 = false;
                let data = {
                    hardTitle:this.title,
                    hardContent:this.content,
                    id:this.id
                };
                //update
                $post_header('/admin/hardware/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('修改成功')
                        this.list()
                    }else{
                        this.$message.error('修改失败')
                    }
                });
                this.clear()
            },
            add(){
                this.dialogVisible = false;
                if(this.title==''||this.content==''){
                    this.$message.error('补全内容!');
                    return;
                }
                let data = {
                    hardTitle:this.title,
                    hardContent:this.content
                };
                $post_header('/admin/hardware/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.list()
                    }else{
                        this.$message.error('添加失败')
                    }
                })
                this.clear()
            },
            clear(){
                this.title = '';
                this.content = ''
            },
            updateClick(val){
                this.dialogVisible1 = true;
                this.title = val.hardTitle
                this.content = val.hardContent;
                this.id = val.id
            },
            list(){
                $get_header('/admin/hardware/list').then(res=>{
                    this.tableData =  res.data.result;
                })
            },
            formatDate(value){
                if(value=='')
                    return ''
                return format(value,'Y/M/D h:m');
            },
            deleteClick(value){
                $delete_header('/admin/hardware/delete',value.row.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.tableData.splice(value.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
        },
        data(){
            return {
                tableData:[],
                dialogVisible:false,
                title:'',
                content:'',
                dialogVisible1:false,
                id:''
            }
        }
    }
</script>

<style scoped>

</style>