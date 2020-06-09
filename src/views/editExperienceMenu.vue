<template>
    <div>
        <el-form  label-width="80px">
            <el-form-item label="父级菜单">
                <el-input
                        placeholder="请输入内容"
                        v-model="parentName"
                        :disabled="disable=true">
                </el-input>
            </el-form-item>
            <el-form-item label="子级目录">
                <el-button type="success" plain @click="viewAdd">添加</el-button>
                <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="路由">
                            <el-input v-model="form.router"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" >
                            <el-input v-model="form.desc"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button  @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="addMenu">确 定</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
            <el-form-item label="">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        border
                        max-height="500">
                    <el-table-column
                            fixed
                            prop="menName"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="menDesc"
                            label="描述">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="router"
                            label="路由">
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
                                修改
                            </el-button>
                            <el-button
                                    @click.native.prevent="viewPicture(scope.row)"
                                    type="text"
                                    size="small">
                                内容管理
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import {$get_header, format, $delete_header, $post_header} from '../api'
    export default {
        name: "editExperienceMenu",
        data(){
            return{
                parentName:this.$route.query.name,
                tableData:[],
                dialogFormVisible:false,
                form: {
                    name: '',
                    desc: '',
                    router:''
                },
                title:'',
                type:0,
                id:''
            }
        },
        created() {
            this.list()
        },
        methods:{
            list(){
                $get_header('/admin/menu/getInfoByParentId',{id:this.$route.query.id}).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.tableData = res.data.result
                    }

                })
            },
            deleteClick(a){
                $delete_header('/admin/menu/delete',a.row.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.tableData.splice(a.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            viewAdd(){
                this.dialogFormVisible = true;
                this.title = '添加'
            },
            addMenu(){
                if(this.form.name==''||this.form.desc==''){
                    this.$message.error('补全数据')
                    return
                }
                if(this.type == 1){
                    //update
                    let data = {
                        menName:this.form.name,
                        menDesc:this.form.desc,
                        parentId:this.$route.query.id,
                        id:this.id,
                        router:this.form.router
                    };
                    $post_header('/admin/menu/update',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功');
                            this.list();
                            this.form = {}
                            this.dialogFormVisible = false
                        }else{
                            this.$message.error('修改失败')
                        }
                    })
                    return;
                }



                let data = {
                    menName:this.form.name,
                    menDesc:this.form.desc,
                    parentId:this.$route.query.id,
                    router:this.form.router
                };
                $post_header('/admin/menu/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功');
                        this.list()
                        this.form = {}
                        this.dialogFormVisible = false
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            },
            updateClick(a){
                this.title = '修改'
                this.dialogFormVisible = true;
                this.form.name = a.row.menName;
                this.form.desc = a.row.menDesc;
                this.form.router = a.row.router
                this.id = a.row.id;
                this.type = 1
            },
            viewPicture(a){
                console.log(a)
                this.$router.push({
                    path:'/menu/menu-list',
                    query:{
                        id:a.id,
                        name:a.menName
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>