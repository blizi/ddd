<template>
    <el-table
            :data="viewData"
            max-height="1000"
            border
            style="width: 100%">
        <el-table-column
                v-for="tableHead in tableHead"
                fixed
                :prop="tableHead.key"
                :label="tableHead.name"
                width="150">
        </el-table-column>

        <el-table-column
                fixed="right"
                label="操作"
                width="120">
            <template slot-scope="scope">
                <el-button slot="reference"  @click="deleteClick(scope)" type="danger" icon="el-icon-delete"  size="small" round></el-button>
                <el-button  size="small" type="primary" icon="el-icon-edit" round></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {$delete_header} from '../api'
    export default {
        name: "sys-table",
        props:[
            'viewData',
            'tableHead'
        ],
        data(){
            return {
                tableData: []
            }
        },
        methods:{
            deleteClick(val){
                $delete_header('/admin/rotation/delete',val.row.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功');
                        this.viewData.splice(val.$index,1)
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                //todo 删除
            }
        }
    }
</script>

<style scoped>

</style>