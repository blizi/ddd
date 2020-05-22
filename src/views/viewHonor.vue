<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%"
                max-height="1000">
            <el-table-column
                    fixed
                    prop="honor.name"
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="honor.simDesc"
                    label="描述信息">
            </el-table-column>
            <el-table-column
                    label="封面">
                <template slot-scope="scope">
                    <div class="demo-image">
                        <div class="block" >
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.honor.imgUrl"
                            ></el-image>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否展示">
                <template slot-scope="scope">
                    <span>{{showed(scope.row.honor.showed)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="creatorName"
                    label="创建人">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.honor.createDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="updatorName"
                    label="修改人">
            </el-table-column>
            <el-table-column
                    label="修改时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.honor.updateDate)}}</span>
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
    import {$get_header, format, $delete_header, $post_header} from '../api'
    export default {
        name: "viewHonor",
        created() {
            $get_header('/admin/honor/getList').then(res=>{
                this.tableData = res.data.result
            })
        },
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            showed(value){
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
                $delete_header('/admin/honor/delete',value.row.honor.id).then(res=> {
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.tableData.splice(value.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            updateClick(val){
                console.log(val)
                this.$router.push({
                    path:'/honor/honor-edit',
                    query:{
                        id:val.row.honor.id,
                        name:val.row.honor.name,
                        showed:val.row.honor.showed,
                        desc:val.row.honor.simDesc,
                        imageUrl:val.row.honor.imgUrl
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>