<template>
    <div >
        <el-form  style="width: 300px" label-width="80px">
            <el-form-item label="公司名称">
                <el-input size="small" v-model="companyName"/>
            </el-form-item>
            <el-form-item label="公司logo">
                <el-input size="small" v-model="logoUrl"/>
            </el-form-item>
            <el-form-item label="售前电话">
                <el-input  size="small" v-model="shouqian"/>
            </el-form-item>
            <el-form-item label="售后电话">
                <el-input size="small" v-model="shouhou"/>
            </el-form-item>
            <el-form-item label="技术电话">
                <el-input size="small"  v-model="jishu"/>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input size="small" v-model="email"/>
            </el-form-item>
            <el-form-item label="地址">
                <el-input size="small" v-model="address"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "otherInfo",
        data(){
            return{
                logoUrl:'',
                companyName:'',
                shouqian:'',
                shouhou:'',
                jishu:'',
                email:'',
                address:''
            }
        }
    }
</script>

<style scoped>

</style>