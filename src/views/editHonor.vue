<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="simDesc"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <uploadImag @imageUrl="uploadUrl" :fileUrl="fileUrl"/>
            </el-form-item>
            <el-form-item label="是否展示">
                <el-switch
                        v-model="show"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import uploadImag from "../components/uploadImag";
    import {$post_header} from '../api'
    export default {
        name: "editHonor",
        components:{
            uploadImag
        },
        created() {
            //todo
            if(this.$route.query.id){
                if(this.$route.query.showed=='1'){
                    this.show = true
                }else{
                    this.show = false
                }
                this.fileUrl = this.$route.query.imageUrl
            }
        },
        data(){
            return{
                name:this.$route.query.name,
                simDesc:this.$route.query.desc,
                imageUrl:this.$route.query.imageUrl,
                show:true,
                id:this.$route.query.id,
                fileUrl:''
            }
        },
        methods:{
            uploadUrl(value){
                this.imageUrl = value;
            },
            submit(){
                if(this.imageUrl==''){
                    this.$message.error('补全数据')
                    return;
                }

                if(this.$route.query.id){
                    let data ={
                        name:this.name,
                        simDesc:this.simDesc,
                        imgUrl:this.imageUrl,
                        showed:this.show?1:0,
                        id:this.id
                    }
                    $post_header('/admin/honor/update',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error('修改失败')
                        }
                    })

                    return;
                }

                let data = {
                    name:this.name,
                    simDesc:this.simDesc,
                    imgUrl:this.imageUrl,
                    showed:this.show?1:0
                };

                $post_header('/admin/honor/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.error('添加失败')
                    }
                });
            }
        }

    }
</script>

<style scoped>

</style>