<template>
    <div>
        <el-page-header @back="goBack">
        </el-page-header>
        <el-divider></el-divider>
        <el-form label-width="80px">
            <el-form-item label="操作" v-if="editShow">
                <el-button @click="edit" type="primary" icon="el-icon-edit" circle></el-button>
            </el-form-item>
            <el-form-item label="标题">
                <el-input :disabled="disable" v-model="title"/>
            </el-form-item>
            <el-form-item label="描述">
                <el-input :disabled="disable" v-model="desc"/>
            </el-form-item>
            <el-form-item label="内容">
                <mavon-editor
                        v-model="value"
                        :subfield="subfield"
                        :boxShadow="boxShadow"
                        defaultOpen="preview"
                        :toolbarsFlag="toolbarsFlag"
                        @imgAdd="$imgAdd" @imgDel="$imgDel"  ref=md
                />
            </el-form-item>
        </el-form>

        <div style="height: 20px"></div>
        <el-button v-if="subfield" @click="cancel">取消</el-button>
        <el-button v-if="subfield" type="primary" @click="submit">保存</el-button>
        <viewcomment :pId="id"/>
    </div>
</template>

<script>
    import {$post_header} from '../api'
    import viewcomment from "./viewcomment";
    export default {
        name: "viewArticle",
        components:{
            viewcomment
        },
        created() {
            console.log(this.$route.params)

            if(this.$route.params.type){
                //  add
                this.subfield = true;
                this.boxShadow = true;
                this.toolbarsFlag = true;
                this.disable = false;
                this.editShow = false;
            }
        },
        methods:{
            submit(){
                if(this.$route.params.parentId){
                    //add
                    let data = {
                        arTitle:this.title,
                        arDesc:this.desc,
                        arContent:this.value,
                        parentId:this.$route.params.parentId
                    }


                    $post_header('/admin/article-info/insert',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('添加成功');
                        }else {
                            this.$message.error('添加失败')
                        }
                    });
                    return ;
                }

                let data = {
                    id:this.id,
                    arTitle:this.title,
                    arDesc:this.desc,
                    arContent:this.value
                }
                $post_header('/admin/article-info/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('修改成功');
                        this.cancel()
                    }else {
                        this.$message.error('修改失败')
                    }
                });
            },
            // 绑定@imgAdd event
            $imgAdd(pos, $file){
                console.log('upload')
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                $post_header('/upload',formdata).then(res=>{
                    this.$refs.md.$img2Url(pos, res.data.result);
                })
            },
            $imgDel(){

            },
            goBack(){
                this.$router.back()
            },
            edit(){
                this.subfield = true;
                this.boxShadow = true;
                this.toolbarsFlag = true
                this.disable = false
            },
            cancel(){
                this.subfield = false
                this.boxShadow = false
                this.toolbarsFlag = false
                this.disable = true
            }
        },
        data(){
            return{
                subfield:false,
                boxShadow:false,
                toolbarsFlag:false,
                value:this.$route.params.content,
                id:this.$route.params.id,
                title:this.$route.params.title,
                desc:this.$route.params.desc,
                disable:true,
                editShow:true
            }
        },

    }
</script>

<style scoped>

</style>