<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input v-model="form.desc"></el-input>
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
    import {$post_header} from '../api'
    export default {
        name: "editExperience",
        created() {
            if(this.$route.query.id){
                this.$route.query.showed=='1'?this.form.show = true:this.form.show=false
            }
        },
        data(){
            return{
                form:{
                    name:this.$route.query.name,
                    title:this.$route.query.title,
                    desc:this.$route.query.desc,
                    show:true
                },
            }
        },
        methods:{
            onSubmit(){
                if(this.form.name==''||this.form.desc==''||this.form.title==''){
                    this.$message.error('补全数据')
                    return;
                }

                if(!this.form.name||!this.form.desc||!this.form.title){
                    this.$message.error('补全数据')
                    return;
                }

                if(this.$route.query.id){
                    let data = {
                        exName:this.form.name,
                        exTitle:this.form.title,
                        exDesc:this.form.desc,
                        showed:this.form.show?1:0,
                        id:this.$route.query.id
                    }
                    $post_header('/admin/experience/update',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error('修改失败')
                        }
                    })

                    return;
                }




                let data = {
                    exName:this.form.name,
                    exTitle:this.form.title,
                    exDesc:this.form.desc,
                    showed:this.form.show?1:0
                }




                $post_header('/admin/experience/insert',this.qs.stringify(data)).then(res=>{
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