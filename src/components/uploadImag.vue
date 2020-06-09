<template>
    <el-upload
            class="upload-demo"
            drag
            :limit = "1"
            :action="uploadAddress"
            :on-success="uploadSuccess"
            name="file"
            list-type="picture"
            :file-list="fileList"
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
    </el-upload>
</template>

<script>
    import {upload_URL} from '../config'
    export default {
        name: "uploadImag",
        props:["fileUrl"],
        created() {
            console.log(upload_URL)
            if(this.fileUrl){
                this.fileList = [{
                    name:'',
                    url:this.fileUrl,

                }]
            }
        },
        data(){
            return{
                fileList:[],
                uploadAddress:upload_URL
            }
        },
        methods:{
            uploadSuccess(res,file,fileList){
                if(res.errorCode=='0000'){
                    this.imageUrl = res.result;
                    this.$message.success('上传成功')
                    this.$emit('imageUrl', this.imageUrl);
                }else {
                    this.$message.error('上传失败')
                }
            }
        }
    }
</script>

<style scoped>

</style>