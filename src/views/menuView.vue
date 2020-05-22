<template>
    <div>
        <el-form  label-width="80px">
            <el-form-item label="父级菜单">
                <el-input
                        placeholder="请输入内容"
                        v-model="parentName"
                        :disabled="disabled">
                </el-input>
            </el-form-item>
            <el-form-item label="图片管理">
                <el-button type="success" plain @click="addImage">上传图片</el-button>
                <el-dialog :close-on-click-modal="false" title="" :visible.sync="dialogFormVisible">
                    <el-form  label-width="80px">
                        <el-form-item label="上传">
                            <uploadImag @imageUrl="uploadUrl"/>
                        </el-form-item>
                        <el-form-item label="链接">
                            <el-input v-model="link"/>
                        </el-form-item>

                        <el-form-item label="名称">
                            <el-input v-model="imageName"/>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="imageDesc"/>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button  @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="uploadImage">确 定</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
            <el-form-item label="">
                <el-table
                        :data="imageTableData"
                        style="width: 100%"
                        border
                        max-height="500">
                    <el-table-column
                            fixed
                            label="图片">
                        <template slot-scope="scope">
                            <div class="demo-image">
                                <div class="block" >
                                    <el-image
                                            style="width: 100px; height: 100px"
                                            :src="scope.row.image.imgUrl"
                                    ></el-image>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="image.link"
                            label="链接">
                    </el-table-column>
                    <el-table-column
                            prop="creatorName"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            label="创建时间">
                        <template slot-scope="scope">
                            <span>{{formatDate(scope.row.image.createDate)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updatorName"
                            label="修改人">
                    </el-table-column>
                    <el-table-column
                            label="修改时间">
                        <template slot-scope="scope">
                            <span>{{formatDate(scope.row.image.updateDate)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="deleteClick(scope)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="文章管理">
                <el-button type="success" @click="addArticle" plain>新增</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-table
                        :data="articleTable"
                        style="width: 100%"
                        border
                        max-height="500">
                    <el-table-column
                            fixed
                            prop="articleInfo.arTitle"
                            label="标题">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="articleInfo.arDesc"
                            label="描述">
                    </el-table-column>
                    <el-table-column
                            fixed
                            sortable
                            prop="articleInfo.readNum"
                            label="浏览量">
                    </el-table-column>
                    <el-table-column
                            fixed
                            sortable
                            prop="articleInfo.thumbs"
                            label="点赞数">
                    </el-table-column>
                    <el-table-column
                            prop="creatorName"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            label="创建时间">
                        <template slot-scope="scope">
                            <span>{{formatDate(scope.row.articleInfo.createDate)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updatorName"
                            label="修改人">
                    </el-table-column>
                    <el-table-column
                            label="修改时间">
                        <template slot-scope="scope">
                            <span>{{formatDate(scope.row.articleInfo.updateDate)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="deleteArticle(scope)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                            <el-button
                                    @click.native.prevent="viewArticle(scope)"
                                    type="text"
                                    size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$get_header, format, $delete_header, $post_header} from '../api'
    import uploadImag from "../components/uploadImag";
    export default {
        name: "menuView",
        components:{
            uploadImag
        },
        created() {
            $get_header('/admin/menu/getImageArticleInfo',{id:this.id}).then(res=>{
                this.imageTableData = res.data.result.images;
                this.articleTable = res.data.result.articles;
                console.log(this.articleTable)
            })
        },
        data(){
            return{
                disabled:true,
                parentName:this.$route.query.name,
                imageTableData:[],
                articleTable:[],
                id:this.$route.query.id,
                dialogFormVisible:false,
                imageUrl:'',
                link:'',
                imageName:'',
                imageDesc:''
            }
        },
        methods:{
            addArticle(){
                this.$router.push({
                    name:'article-view',
                    params:{
                        parentId:this.id,
                        type:1
                    }
                });
                console.log(this.id)
            },
            uploadUrl(value){
                console.log(value)
                this.imageUrl = value
            },
            uploadImage(){
                if(this.imageUrl===''){
                    this.$message.error('未选择图片');
                    return;
                }
                let data = {
                    imgName:this.imageName,
                    imgDesc:this.imageDesc,
                    imgUrl:this.imageUrl,
                    link:this.link,
                    parentId:this.id
                };
                $post_header('/admin/image/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.dialogFormVisible = false
                    }else{
                        this.$message.error('添加失败')
                    }
                })
                console.log(data)
            },
            addImage(){
                this.dialogFormVisible = true
            },
            deleteClick(a){
                $delete_header('/admin/image/delete',a.row.image.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.imageTableData.splice(a.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            deleteArticle(a){
                console.log(a.row.articleInfo.id)
                $delete_header('/admin/article-info/delete',a.row.articleInfo.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.articleTable.splice(a.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            viewArticle(a){
                //查看文章
                this.$router.push({
                    name:'article-view',
                    params:{
                        content:a.row.articleInfo.arContent,
                        id:a.row.articleInfo.id,
                        title:a.row.articleInfo.arTitle,
                        desc:a.row.articleInfo.arDesc,
                    }
                });
                console.log(a.row.articleInfo.id)
            }
        }
    }
</script>

<style scoped>

</style>