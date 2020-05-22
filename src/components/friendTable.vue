<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            max-height="500">
        <el-table-column
                fixed
                prop="name"
                label="名称">
        </el-table-column>
        <el-table-column
                prop="simDesc"
                label="描述">
        </el-table-column>
        <el-table-column
                prop="url"
                label="地址">
        </el-table-column>
        <el-table-column
                prop="showed"
                label="是否展示">
            <template slot-scope="scope">
                <span>{{show(scope.row.showed)}}</span>
            </template>
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
                prop="updatorName"
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
                        @click.native.prevent="updateClick(scope)"
                        type="text"
                        size="small">
                    修改
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {format,$post_header_json, $get_header, $delete_header} from '../api'
    export default {
        name: "friendTable",
        methods: {
            show(value){
                if(value=='0'){
                    return '不展示'
                }
                if(value=='1'){
                    return '展示'
                }
                // console.log(value)
            },
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            deleteClick(val){
                $delete_header('/admin/friends/delete',val.row.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.tableData.splice(val.row.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            updateClick(value){
                this.$router.push({
                    path:'/friend/fri-edit',
                    query:{
                        id:value.row.id
                    }
                })
            }
        },
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            $get_header('/admin/friends/list').then(res=>{
                this.tableData = res.data.result
            })
        }
    }
</script>

<style scoped>

</style>