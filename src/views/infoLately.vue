<template>
    <div>
        <el-form>
            <el-form-item>
                <el-input disabled :placeholder="$route.query.name"/>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="success" plain @click="update">修改</el-button>
                <el-dialog
                        title="修改"
                        :visible.sync="dialogVisible"
                        width="50%">

                    <el-form>
                        <el-form-item label="标题">
                            <el-input size="small" v-model="title"/>
                        </el-form-item>
                        <el-form-item label="内容">
                            <el-input size="small" v-model="content"/>
                        </el-form-item>
                        <el-form-item label="封面图片">
                            <uploadImag @imageUrl="uploadUrl" :fileUrl="fileUrl"/>
                        </el-form-item>
                    </el-form>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                      </span>
                </el-dialog>
            </el-form-item>

            <el-form-item label="">
                <el-input disabled :placeholder="title"/>
            </el-form-item>
            <el-form-item label="">
                <el-input disabled :placeholder="content"/>
            </el-form-item>
            <el-form-item>
                <el-image
                        style="width: 100px; height: 100px"
                        :src="imageUrl"></el-image>
            </el-form-item>
        </el-form>
        <ImageTable :tableData="tableDateImage" :id="latelyId"/>
    </div>
</template>

<script>
    import {$get_header} from "../api";
    import ImageTable from '../components/ImageTable'
    import uploadImag from "../components/uploadImag";
    export default {
        name: "infoLately",
        components:{
            ImageTable,uploadImag
        },
        created() {
            this.list()
        },
        data(){
            return{
                id:this.$route.query.id,
                tableDateImage:[],
                latelyId:'',
                title:'',
                content:'',
                imageUrl:'',
                dialogVisible:false,
                imageUrl:'',
                fileUrl:''
            }
        },
        methods:{
            uploadUrl(value){
                this.imageUrl = value
            },
            update(){
                this.dialogVisible = true;
                console.log(this.fileUrl)
            },
            list(){
                $get_header('/admin/lately-info/getList',{
                    id:this.id
                }).then(res=>{
                    console.log(res.data.result)
                    console.log(res.data.result)
                    this.tableDateImage = res.data.result[0].images;
                    this.latelyId = res.data.result[0].latelyInfo.id
                    this.title = res.data.result[0].latelyInfo.title
                    this.content = res.data.result[0].latelyInfo.content
                    this.imageUrl = res.data.result[0].latelyInfo.imgUrl
                    this.fileUrl = res.data.result[0].latelyInfo.imgUrl
                })
            }
        }
    }
</script>

<style scoped>

</style>