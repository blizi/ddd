<template>
    <!--    客户案例-->
    <div>
        <el-button type="small" @click="addView">添加</el-button>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="50%">
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                        v-for="item in menuList"
                        :key="item.id"
                        :label="item.menName"
                        :value="item.id">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </span>
        </el-dialog>
        <el-divider content-position="left"></el-divider>

        <el-table
                :data="tableData"
                style="width: 100%"
                border
                max-height="1000">
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
                            @click.native.prevent="deleteClick(scope.row,scope.$index)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                    <el-button
                            @click.native.prevent="dowhat(scope.row)"
                            type="text"
                            size="small">
                        操作
                    </el-button>
                </template>
            </el-table-column>
        </el-table>




    </div>
</template>

<script>
    import {$get_header, $post_header, format} from "../api";

export default {
        name: "viewAL",
        created() {
            this.selectList();
            this.list();
        },
        methods:{
            dowhat(val){
                console.log(val);
                this.$router.push({
                    path:'/menu/menu-list',
                    query:{
                        id:val.id,
                        name:val.menName
                    }
                })
            },
            deleteClick(val,index){
                let data = {
                    isAl:0,
                    id:val.id,
                };
                $post_header('/admin/menu/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('移除成功');
                        this.tableData.splice(index,1)
                    }else{
                        this.$message.error('移除失败')
                    }
                })
            },
            formatDate(value){
                if(value==''){
                    return '';
                }
                return format(value,'Y/M/D h:m');
            },
            list(){
                $get_header('/admin/menu/getAlList',{type:1}).then(res=>{
                    this.tableData = res.data.result
                    console.log(res.data.result)
                })
            },
            selectList(){
                $get_header('/admin/menu/getAlList',{type:0}).then(res=>{
                    this.menuList = res.data.result
                })
            },
            addView(){
            this.dialogVisible = true;
            },
            add(){
               this.dialogVisible = false
                let data = {
                    isAl:1,
                    id:this.value
                };
                $post_header('/admin/menu/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.list();
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            }
        },
        data(){
            return {
                menuList:[],
                value:'',
                dialogVisible:false,
                tableData:[]

            }
        }
    }
</script>

<style scoped>

</style>