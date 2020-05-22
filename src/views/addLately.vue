<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简单描述">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传">
            <uploadImag @imageUrl="uploadUrl"/>
        </el-form-item>
        <el-form-item label="是否展示">
            <el-switch
                    v-model="form.show"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {$post_header} from '../api'
    import uploadImag from "../components/uploadImag";
    export default {
        name: "addLately",
        components:{
            uploadImag
        },
        data:()=>{
            return{
                form:{
                    name:'',
                    desc:'',
                    imageUrl:'',
                    show:true
                }
            }
        },
        methods:{
            uploadUrl(value){
                this.form.imageUrl = value
            },
            onSubmit(){
                if(this.form.imageUrl==''||this.form.name==''||this.form.desc==''){
                    this.$message.error('请补全数据');
                    return;
                }
                let data = {
                    latName:this.form.name,
                    latDesc:this.form.desc,
                    latUrl:this.form.imageUrl,
                    showed:this.form.show?1:0
                };
                //submit
                $post_header('/admin/lately/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>