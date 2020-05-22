<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="链接">
            <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="简单描述">
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
    import {$post_header,$get_header} from '../api'
    export default {
        name: "editFriend",
        created() {
            if(this.id){
                this.type = 1;
                $get_header('/admin/friends/getInfo',{id:this.id}).then(res=>{
                    // console.log(res.data)
                    this.form.name = res.data.result.name
                    this.form.desc = res.data.result.simDesc
                    this.form.url = res.data.result.url
                    if(res.data.result.showed=='0'){
                        this.form.show = false
                    }else{
                        this.form.show = true
                    }
                })
            }
        },
        data(){
            return{
                id:this.$route.query.id,
                type:0,
                form:{
                    name:'',
                    desc:'',
                    url:'',
                    show:true
                }
            }
        },
        methods:{
            onSubmit(){

                //add
                if(this.form.url==''||this.form.name==''||this.form.desc==''){
                    this.$message.error('请补全数据');
                    return;
                }
                let data = {
                    id:this.id,
                    name:this.form.name,
                    url:this.form.url,
                    simDesc:this.form.desc,
                    showed:this.form.show?1:0
                };
                if(this.type=='1'){
                    //update
                    $post_header('/admin/friends/update',this.qs.stringify(data)).then(res=>{
                        console.log(res.data)
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error('修改失败')
                        }
                    })
                    return;
                }

                $post_header('/admin/friends/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功!')
                    }else{
                        this.$message.error('添加失败!')
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>