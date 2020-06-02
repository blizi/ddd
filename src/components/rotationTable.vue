<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            max-height="500">
        <el-table-column
                fixed
                prop="rotDesc"
                label="描述">
        </el-table-column>
        <el-table-column
                prop="rotUrl"
                label="轮播图1">
            <template slot-scope="scope">
                <div class="demo-image">
                    <div class="block" >
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.rotUrl"
                            :preview-src-list="scope.row.rotUrl"
                            ></el-image>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column
                prop="showedName"
                label="是否展示">
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
    import {format,$post_header_json, $post_header, $delete_header} from '../api'
    export default {
        name: "rotationTable",
        methods: {
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            deleteClick(val){
                $delete_header('/admin/rotation/delete',val.row.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功');
                        this.tableData.splice(val.$index,1);
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                //todo 删除
            },
            updateClick(value){

                this.$router.push({
                    path: '/rotation/rot-edit',
                    query: {
                        id: value.row.id
                    }
                })
            }
        },
        data() {
            return {
                tableData: [],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        created() {
            let data = {
                pageNum:'1',
                pageSize:'20'
            };
            $post_header_json('/admin/rotation/pages',data).then(res=>{
                console.log(res.data)
                this.tableData = res.data.result
            })
        }
    }
</script>

<style scoped>

</style>