<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="nav.id"
                border
                :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="nav.navName"
                    label="名称"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="nav.navDesc"
                    label="描述"
                    sortable>
            </el-table-column>
            <el-table-column
                prop="creatorName"
                label="创建人">
        </el-table-column>
            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.nav.createDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="updatorName"
                    label="修改人">
            </el-table-column>
            <el-table-column
                    label="修改时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.nav.updateDate)}}</span>
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
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {$get_header, format,$delete_header} from '../api'
    export default {
        name: "navTable",
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.list()
        },
        methods:{
            list(){
                $get_header('/admin/nav/list').then(res=>{
                    this.tableData = res.data.result
                })
            },
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            deleteClick(value){
                $delete_header('/admin/nav/delete',value.row.nav.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功');
                        this.list()
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            updateClick(val){
                console.log(val);
                this.$router.push({
                    path: '/nav/nav-edit',
                    query: {
                            id:val.row.nav.id,
                            desc:val.row.nav.navDesc,
                            name:val.row.nav.navName,
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>