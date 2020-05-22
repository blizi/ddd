<template>
    <div >
        <el-form  style="width: 300px" label-width="80px">
            <el-form-item label="公司名称">
                <el-input size="small" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$get_header} from '../api'
    export default {
        name: "otherInfo",
        created() {
            $get_header('/admin/other/getList').then(res=>{
                console.log(res.data)
            })
        },
        data(){
            return{
                data:[]
            }
        }
    }
</script>

<style scoped>

</style>