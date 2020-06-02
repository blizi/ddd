<template>
    <el-form>
        <el-form-item label="图片管理">
            <el-button size="small" type="success" plain @click="addImage">上传图片</el-button>
<!--            save-->
            <el-dialog :close-on-click-modal="false" title="" :visible.sync="dialogFormVisible">
                <el-form  label-width="80px">
                    <el-form-item label="上传">
                        <uploadImag @imageUrl="uploadUrl" :fileUrl="fileUrl"/>
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
                    <el-button  @click="clear">取消</el-button>
                    <el-button type="primary" @click="uploadImage">确 定</el-button>
                </div>
            </el-dialog>
<!--            update-->
            <el-dialog :close-on-click-modal="false" title="" :visible.sync="dialogFormVisible1">
                <el-form  label-width="80px">
                    <el-form-item label="上传">
                        <uploadImag @imageUrl="uploadUrl" :fileUrl="fileUrl"/>
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
                    <el-button  @click="clear">取消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </el-form-item>
        <el-form-item>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="1000">
                <el-table-column
                        fixed
                        prop="image.imgName"
                        label="名称">
                </el-table-column>

                <el-table-column
                        prop="image.imgDesc"
                        label="描述">
                </el-table-column>

                <el-table-column
                        prop="image.link"
                        label="链接">
                </el-table-column>

                <el-table-column
                        label="封面">
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
                                @click.native.prevent="deleteClick(scope.$index,scope.row.image.id)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                        <el-button
                                @click.native.prevent="updateClick(scope.row)"
                                type="text"
                                size="small">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
    </el-form>

</template>

<script>
    import {$delete_header, $post_header, format} from "../api";
    import uploadImag from "./uploadImag";

    export default {
        name: "ImageTable",
        props:["tableData","id"],
        components:{
            uploadImag
        },
        methods:{
            //修改
            update(){
                if(this.imageUrl===''){
                    this.$message.error('未选择图片');
                    return;
                }
                let data = {
                    imgName:this.imageName,
                    imgDesc:this.imageDesc,
                    imgUrl:this.imageUrl,
                    link:this.link,
                    id:this.imageid
                };
                console.log(data)

                $post_header('/admin/image/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('修改成功')
                        this.dialogFormVisible1 = false
                    }else{
                        this.$message.error('修改失败')
                    }
                })
            },
            //add
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
                    parentId:this.id,
                };
                $post_header('/admin/image/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.dialogFormVisible = false
                        this.list()
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            },
            uploadUrl(value){
                this.imageUrl = value
            },
            addImage(){
                this.dialogFormVisible = true
            },
            formatDate(value){
                if(value==''){
                    return '';
                }
                return format(value,'Y/M/D h:m');
            },
            deleteClick(index,value){
                $delete_header('/admin/image/delete',value).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功');
                        this.tableData.splice(index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            updateClick(val){
                this.dialogFormVisible1 = true;
                this.imageName = val.image.imgName;
                this.imageDesc = val.image.imgDesc;
                this.link = val.image.link;
                this.imageUrl = val.image.imgUrl
                this.fileUrl = val.image.imgUrl;
                this.imageid = val.image.id
            },
            clear(){
                this.dialogFormVisible = false
                this.dialogFormVisible1 = false
                this.imageName = '';
                this.imageDesc = '';
                this.imageUrl ='';
                this.link = ''
            }
        },
        data(){
            return{
                dialogFormVisible:false,
                imageUrl:'',
                link:'',
                imageName:'',
                imageDesc:'',
                fileUrl:'',
                dialogFormVisible1:false,
                imageid:''
            }
        }
    }
</script>

<style scoped>

</style>