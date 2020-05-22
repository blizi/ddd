<template>
    <div>
        <el-form v-if="addButton">
            <el-form-item label="">
                <el-button @click="no = true,type=1,title='',artInfo='',imageUrl=''">添加</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
<!--        table-->
        <el-table
                v-if="!no"
                :data="tableData"
                style="width: 100%"
                max-height="1000">
            <el-table-column
                    fixed
                    prop="article.artTitle"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="article.artInfo"
                    label="描述信息">
            </el-table-column>
            <el-table-column
                    label="封面">
                <template slot-scope="scope">
                    <div class="demo-image">
                        <div class="block" >
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.article.artUrl"
                            ></el-image>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否展示">
                <template slot-scope="scope">
                    <span>{{showed(scope.row.article.showed)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="creatorName"
                    label="创建人">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.article.createDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="updatorName"
                    label="修改人">
            </el-table-column>
            <el-table-column
                    label="修改时间">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.article.updateDate)}}</span>
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
                    <el-button
                            @click.native.prevent="updateClick(scope)"
                            type="text"
                            size="small">
                        修改
                    </el-button>
                    <el-button
                            @click.native.prevent="articleEdit(scope.row)"
                            type="text"
                            size="small">
                        文章管理
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

<!--        add-->
        <el-form v-if="no" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="描述信息">
                <el-input v-model="artInfo" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <uploadImag @imageUrl="uploadUrl" :fileUrl="this.fileUrl"/>
            </el-form-item>
            <el-form-item label="是否展示">
                <el-switch
                        v-model="show"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="no = false,addButton = true">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {$get_header, format, $delete_header, $post_header} from '../api'
    import uploadImag from "../components/uploadImag";
    export default {
        name: "resolveView",
        components:{
            uploadImag
        },
        methods:{
            articleEdit(a){
                this.$router.push({
                    path:'/menu/menu-list',
                    query:{
                        id:a.article.id,
                        name:a.article.artTitle
                    }
                })
            },
            showed(value){
                if(value=='0'){
                    return '不展示'
                }
                if(value=='1'){
                    return '展示'
                }
                // console.log(value)
            },
            formatDate(value){
                return format(value,'Y/M/D h:m');
            },
            deleteClick(value){
                $delete_header('/admin/article/delete',value.row.article.id).then(res=> {
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功')
                        this.tableData.splice(value.$index,1)
                    }else{
                        this.$message.error('删除失败')
                    }
                })
             },
            updateClick(val){
                let k  = val.row.article;
                this.no = true;
                this.title = k.artTitle;
                this.artInfo = k.artInfo;
                this.fileUrl = k.artUrl
                this.id = k.id
                this.type=0
                this.addButton = false;
                this.imageUrl = k.artUrl
            },
            onSubmit(){
                //add
                if(this.artTitle==''||this.artInfo==''||this.artUrl==''){
                    this.$message.error('请补全内容');
                    return;
                }
                //update
                if(this.type===0){
                    let data = {
                        id:this.id,
                        artTitle:this.title,
                        artInfo:this.artInfo,
                        artUrl:this.imageUrl,
                        showed:this.show?1:0
                    };
                    console.log(data);
                    $post_header('/admin/article/update',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功');
                            this.no = false
                            this.list();
                        }else{
                            this.$message.error('修改失败')
                        }
                    });


                    return;
                }

                let data = {
                    artTitle:this.title,
                    artInfo:this.artInfo,
                    artUrl:this.imageUrl,
                    showed:this.show?1:0
                };
                $post_header('/admin/article/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功');
                        this.title = ''
                        this.artInfo=''
                        this.imageUrl = ''
                        this.no = false;
                        this.list();
                    }else{
                        this.$message.error('添加失败')
                    }
                });
            },
            uploadUrl(value){
                this.imageUrl = value
                console.log(this.imageUrl)
            },
            list(){
                $get_header('/admin/article/getList').then(res=>{
                    this.tableData = res.data.result
                })
            }
        },
        created() {
            this.list()
        },
        data(){
            return{
                title:'',
                artInfo:'',
                imageUrl:'',
                show:true,
                no:false,
                tableData:[],
                fileUrl:'',
                id:'',
                type:1,
                addButton:true

            }
        }
    }
</script>

<style scoped>

</style>