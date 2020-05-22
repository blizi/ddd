<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            max-height="500">
        <el-table-column
                fixed
                prop="lately.latName"
                label="名称">
        </el-table-column>
        <el-table-column
                prop="lately.latDesc"
                label="描述">
        </el-table-column>
        <el-table-column
                label="封面">
            <template slot-scope="scope">
                <div class="demo-image">
                    <div class="block" >
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="scope.row.lately.latUrl"
                        ></el-image>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column
                label="是否展示">
            <template slot-scope="scope">
                <span>{{show(scope.row.lately.showed)}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="creatorName"
                label="创建人">
        </el-table-column>
        <el-table-column
                label="创建时间">
            <template slot-scope="scope">
                <span>{{formatDate(scope.row.lately.createDate)}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="updatorName"
                label="修改人">
        </el-table-column>
        <el-table-column
                label="修改时间">
            <template slot-scope="scope">
                <span>{{formatDate(scope.row.lately.updateDate)}}</span>
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
    import {$get_header, format,$delete_header} from '../api'
    export default {
        name: "latelyTable",
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            $get_header('/admin/lately/list').then(res=>{
                this.tableData = res.data.result
            })
        },
        methods:{
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
            deleteClick(value){
                $delete_header('/admin/lately/delete',value.row.lately.id).then(res=>{
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
                    path: '/lately/lat-edit',
                    query: {
                        id: val.row.lately.id,
                        fileUrl:val.row.lately.latUrl
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>