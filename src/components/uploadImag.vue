<template>
    <el-upload
            class="upload-demo"
            drag
            :limit = "1"
            action="http://localhost:8071/upload"
            :on-success="uploadSuccess"
            name="file"
            list-type="picture"
            :file-list="fileList"
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        name: "uploadImag",
        props:["fileUrl"],
        created() {
            if(this.fileUrl){
                this.fileList = [{
                    name:'',
                    url:this.fileUrl
                }]
            }
        },
        data(){
            return{
                fileList:[]
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