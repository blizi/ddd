<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="描述">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="上传">
                <el-upload
                        class="upload-demo"
                        drag
                        :limit = "1"
                        :action="uploaddress"
                        :on-success="uploadSuccess"
                        name="file"
                        list-type="picture"
                        :file-list="fileList"
                        >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否展示">
                <el-switch
                        v-model="show"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$post_header,$get_header} from '../api'
    import {upload_URL} from '../config'
    export default {
        name: "edit",
        created() {
            console.log(this.uploaddress)
            if(this.id!=''&&this.id>1){
                this.type = 1;
                let data = {
                    id:this.id
                };
                console.log(this.id)
                $get_header('/admin/rotation/getInfo',data).then(res=>{
                    this.form.desc = res.data.result.rotDesc;
                    if(res.data.result.showed==0){
                        this.show = false
                    }else{
                        this.show = true
                    }
                    this.fileList = [{
                        name:'',
                        url:res.data.result.rotUrl
                    }]
                });
            }
        },
        data() {
            return {
                form: {
                    desc: '',
                },
                id:this.$route.query.id,
                show:true,
                type:0,
                fileList:[],
                imageUrl:'',
                uploaddress:upload_URL
            }
        },
        methods: {
            onSubmit() {
                if(this.form.desc==''||this.imageUrl==''){
                    this.$message.error('请补全内容');
                    return;
                }
                if(this.type==1){
                    //update
                    let data = {
                        id:this.id,
                        rotDesc:this.form.desc,
                        rotUrl:this.imageUrl,
                        showed:this.show?1:0
                    }
                    $post_header('/admin/rotation/update',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功！');
                        }else{
                            this.$message.error('修改失败！');
                        }
                    });
                    return;
                }
                //add
                let data = {
                    rotDesc:this.form.desc,
                    rotUrl:this.imageUrl,
                    showed:this.show?1:0
                };
                $post_header('/admin/rotation/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功！');
                    }else{
                        this.$message.error('添加失败！');
                    }
                });
            },
            uploadSuccess(res,file,fileList){
                console.log(res)
                if(res.errorCode=='0000'){
                    this.imageUrl = res.result
                    this.$message.success('上传成功')
                }else{
                    this.$message.error('上传失败')

                }
            }
        }
    }
</script>

<style scoped>

</style>