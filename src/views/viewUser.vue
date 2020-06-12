<template>
    <div>
        <el-button size="small" @click="dialogVisible=true">添加管理员</el-button>
        <el-button size="small" @click="viewAddRole">给管理员添加角色</el-button>
        <el-button size="small" @click="viewInsertRole">添加角色</el-button>
        <el-button size="small" @click="viewAddPer">给角色添加权限</el-button>
        <el-dialog
                title="新增后台管理用户"
                :visible.sync="dialogVisible"
                width="50%">
            <el-form>
                <el-form-item label="登录名">
                    <el-input v-model="name" placeholder="登录名"/>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password" placeholder="密码" show-password/>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="nickname" placeholder="昵称"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
<!--        添加角色-->
        <el-dialog
            title="添加角色"
            :visible.sync="addRoleDialogVisible"
            width="50%">
        <el-form>
            <el-form-item label="角色名">
                <el-input v-model="roleName" placeholder="请输入英文字母"/>
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input v-model="roleDesc" placeholder="角色描述" />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addRoleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRole">确 定</el-button>
          </span>
    </el-dialog>
<!--给角色添加权限-->
        <el-dialog
                title="给角色添加权限"
                :visible.sync="perdialogVisible"
                width="50%">
            <el-form>
                <el-form-item label="角色">
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                                v-for="item in roles"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="权限">
                    <el-select v-model="per" placeholder="请选择">
                        <el-option
                                v-for="item in pers"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="perdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPerToRole">确 定</el-button>
          </span>
        </el-dialog>
<!--添加角色给用户-->
        <el-dialog
                title="添加角色给用户"
                :visible.sync="roledialogVisible"
                width="50%">
            <el-form>
                <el-form-item label="用户">
                    <el-select v-model="user" placeholder="请选择">
                        <el-option
                                v-for="item in users"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="role" placeholder="请选择">
                        <el-option
                                v-for="item in roles"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="roledialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRoleToUser">确 定</el-button>
          </span>
        </el-dialog>
        <el-divider>admin</el-divider>
        <UserTree/>
        <el-divider>普通用户</el-divider>
        <userTable/>
    </div>
</template>

<script>
    import {$post_header,$get_header} from "../api";
import UserTree from "../components/UserTree";
import userTable from "../components/userTable";
    export default {
        name: "viewUser",
        components:{
            UserTree,
            userTable
        },
        methods:{
            addRole(){
                let data = {
                    roleName:this.roleName,
                    roleDesc:this.roleDesc
                };
                $post_header('/admin/sys-role/save',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.roledialogVisible = false;
                    }else{
                        this.$message.error(res.data.errorMessage)
                    }
                })
            },
            viewInsertRole(){
                this.addRoleDialogVisible = true;
            },
            addPerToRole(){
                if(this.per==''||this.role==''){
                    this.$message.error('补全数据')
                   return;
                }
                let data = {
                    perName:this.per,
                    parentKey:this.role
                };
                $post_header('/admin/sys-per/addPerToRole',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.roledialogVisible = false;
                    }else{
                        this.$message.error(res.data.errorMessage)
                    }
                })
            },
            viewAddPer(){
                this.perdialogVisible = true;
                //获取角色信息
                $get_header('/admin/sys-role/getRoleInfo').then(res=>{
                    this.roles = res.data.result
                })
            //    获取权限信息
                $get_header('/admin/sys-per/list').then(res=>{
                    this.pers = res.data.result
                })
            },
            viewAddRole(){
                this.roledialogVisible=true;
                $get_header('/admin/sys-user/getUserInfo').then(res=>{
                    this.users = res.data.result
                });
                $get_header('/admin/sys-role/getRoleInfo').then(res=>{
                    this.roles = res.data.result
                })
            },
            addRoleToUser(){
                if(this.role==''||this.user==''){
                    this.$message.error('补全数据');
                    return;
                }
                let data = {
                    roleName:this.role,
                    parentId:this.user
                };
               $post_header('/admin/sys-role/insert',this.qs.stringify(data)).then(res=>{
                   if(res.data.errorCode=='0000'){
                       this.$message.success('添加成功')
                       this.roledialogVisible = false;
                   }else{
                       this.$message.error(res.data.errorMessage)
                   }
               })
            },
            addUser(){
                if(this.username==''||this.password==''){
                    this.$message.error('补全数据')
                    return;
                }
                let data = {
                    username:this.name,
                    password:this.password,
                    nickname:this.nickname
                };

                $post_header('/admin/sys-user/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.dialogVisible =  false
                    }else{
                        this.$message.error('添加失败')
                    }
                })
                this.dialogVisible = false
            },
        },
        data(){
            return{
                dialogVisible:false,
                roledialogVisible:false,
                perdialogVisible:false,
                addRoleDialogVisible:false,
                name:'',
                password:'',
                nickname:'',
                user:'',
                role:'',
                per:'',
                users:[],
                roles:[],
                pers:[],
                roleName:'',
                roleDesc:''
            }
        }
    }
</script>

<style scoped>

</style>