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
                        <el-form-item label="副标题">
                            <el-input size="small" v-model="titleInfo"/>
                        </el-form-item>
                        <el-form-item label="标题位置">
                            <el-switch
                                    v-model="position"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
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
                        <el-button type="primary" @click="updateLateInfo">确 定</el-button>
                      </span>
                </el-dialog>
            </el-form-item>

            <el-form-item label="标题">
                <el-input disabled :placeholder="title"/>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input disabled :placeholder="titleInfo"/>
            </el-form-item>
            <el-form-item label="描述">
                <el-input disabled :placeholder="content"/>
            </el-form-item>
            <el-form-item label="文字位置">
<!--                position-->
                <el-input disabled :placeholder="position?'右侧':'左侧'"/>
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
    import {$get_header, $post_header} from "../api";
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
                fileUrl:'',
                latelyId:'',
                titleInfo:'',
                position:false
            }
        },
        methods:{
            updateLateInfo(){
                // this.dialogVisible = false
                let data = {
                    title:this.title,
                    content:this.content,
                    imgUrl:this.imageUrl,
                    id:this.latelyId,
                    position:this.position?1:0
                };
                console.log(data)
                if(this.latelyId==''){
                    this.$message.success('to   save');
                    let d = {
                        title:this.title,
                        content:this.content,
                        imgUrl:this.imageUrl,
                        parentId:this.id,
                        position:this.position?1:0
                    };
                    $post_header('/admin/lately-info/insert',this.qs.stringify(d)).then(res=>{
                        console.log(res.data)
                    })
                    return;
                }
                //update
                $post_header('/admin/lately-info/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('修改成功')
                        this.dialogVisible = false
                        this.list()
                    }else{
                        this.$message.error('修改失败')
                    }
                })
            },
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
                    this.fileUrl = res.data.result[0].latelyInfo.imgUrl;
                    this.latelyId = res.data.result[0].latelyInfo.id
                    this.position = res.data.result[0].latelyInfo.position=='1'?true:false
                })
            }
        }
    }
</script>

<style scoped>

</style>