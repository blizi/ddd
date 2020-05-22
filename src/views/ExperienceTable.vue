<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="experience.id"
                border
                :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="experience.exName"
                    label="名称"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="experience.exTitle"
                    label="标题"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="experience.exDesc"
                    label="描述"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="是否展示">
                <template slot-scope="scope">
                    <span>{{show(scope.row.experience.showed)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="creatorName"
                    label="创建人">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.experience.createDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="updatorName"
                    label="修改人">
            </el-table-column>
            <el-table-column
                    label="修改时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.experience.updateDate)}}</span>
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
                        修改
                    </el-button>
                    <el-button
                            @click.native.prevent="editMenu(scope.row)"
                            type="text"
                            size="small">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {$get_header, format,$delete_header} from '../api'
    export default {
        name: "ExperienceTable",
        data(){
            return{
                tableData:[]
            }
        },
        created() {
            $get_header('/admin/experience/getAllInfo').then(res=>{
                console.log(res.data)
                this.tableData = res.data.result
            })
        },
        methods:{
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            show(value){
                if(value=='0'){
                    return '不展示'
                }
                if(value=='1'){
                    return '展示'
                }
            },
            deleteClick(value){
                console.log(value.row.experience.id)
                $delete_header('/admin/experience/delete',value.row.experience.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.tableData.splice(value.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            updateClick(val){
                this.$router.push({
                    path: '/exp/exp-edit',
                    query: {
                        id: val.row.experience.id,
                        desc:val.row.experience.exDesc,
                        name:val.row.experience.exName,
                        title:val.row.experience.exTitle,
                        showed:val.row.experience.showed
                    }
                })
            },
            editMenu(row){
                this.$router.push({
                    path:'/exp/exp-edit-menu',
                    query:{
                        name:row.experience.exName,
                        id:row.experience.id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>