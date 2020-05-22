<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简单描述">
            <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传">
            <uploadImag @imageUrl="uploadUrl" :fileUrl="this.form.fileUrl"/>
        </el-form-item>
        <el-form-item label="是否展示">
            <el-switch
                    v-model="form.show"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {$get_header,$post_header} from '../api'
    import uploadImag from "../components/uploadImag";
    export default {
        name: "editLately",
        components:{
            uploadImag
        },
        data(){
            return{
                id:this.$route.query.id,
                form:{
                    id:'',
                    name:'',
                    desc:'',
                    show:true,
                    imageUrl:'',
                    fileUrl:this.$route.query.fileUrl //yuan文件路径
                }
            }
        },
        created() {
            $get_header('/admin/lately/getInfo',{id:this.id}).then(res=>{
                let result = res.data.result;
                this.form.name =result.latName;
                this.form.desc = result.latDesc;
                this.form.imageUrl = result.latUrl;
                this.form.id = result.id
                if(result.showed==0){
                    this.form.show = false
                }else{
                    this.form.show = true
                }
            })
        },
        methods:{
            uploadUrl(value){
                this.form.imageUrl = value
            },
            onSubmit(){
                console.log(this.form)
                let data = {
                    id:this.form.id,
                    latName:this.form.name,
                    latDesc:this.form.desc,
                    latUrl:this.form.imageUrl,
                    showed:this.form.show?1:0
                }
                $post_header('/admin/lately/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('修改成功')
                    }else{
                        this.$message.error('修改失败')
                    }
                })

            }
        }

    }
</script>

<style scoped>

</style>