<template>
    <div >
        <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form >
                <el-form-item label="key">
                    <el-input v-model="key" placeholder="建议输入英文"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input v-model="desc"></el-input>
                </el-form-item>
                <el-form-item label="实际值">
                    <el-input v-model="value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
<!--update-->
        <el-dialog
                title="添加"
                :visible.sync="update"
                width="50%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="update = false">取 消</el-button>
                <el-button type="primary" @click="updateDate">确 定</el-button>
            </span>
            <el-form >
                <el-form-item label="key">
                    <el-input v-model="key" placeholder="建议输入英文"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input v-model="desc"></el-input>
                </el-form-item>
                <el-form-item label="实际值">
                    <el-input v-model="value"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
<!--        update image -->
        <el-dialog
                title="修改"
                :visible.sync="updateImg"
                width="50%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateImg = false">取 消</el-button>
                <el-button type="primary" @click="updateImage">确 定</el-button>
            </span>
            <el-form >
                <el-form-item label="key">
                    <el-input v-model="key" placeholder="建议输入英文"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input v-model="desc"></el-input>
                </el-form-item>
                <el-form-item label="实际值">
                    <uploadImag @imageUrl="uploadUrl" :fileUrl="this.fileUrl"/>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
                title="添加"
                :visible.sync="dialogVisible1"
                width="50%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="submitwithimage">确 定</el-button>
            </span>
            <el-form >
                <el-form-item label="key">
                    <el-input v-model="key" placeholder="建议输入英文"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input v-model="desc"></el-input>
                </el-form-item>
                <el-form-item label="实际值">
                    <uploadImag @imageUrl="uploadUrl"/>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-form  style="width: 300px" label-width="80px">
            <el-form-item>
                <el-button @click="dialogVisible = true">添加文字</el-button>
                <el-button type="success" @click="dialogVisible1 = true">添加图片</el-button>
            </el-form-item>

<!--            <el-form-item v-for="data in norMal" :label="data.othDesc">-->
<!--                <el-input v-model="data.othValue" placeholder="请输入内容"></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item v-for="data in link" :label="data.othDesc">-->
<!--                <el-image-->
<!--                        style="width: 100px; height: 100px"-->
<!--                        :src="data.othValue"></el-image>-->
<!--            </el-form-item>-->
        </el-form>
<!--        //table-->
        <el-table
                :data="contTableData"
                style="width: 100%">
            <el-table-column
                    label="中文描述"
                    prop="othDesc">
            </el-table-column>
            <el-table-column
                    label="英文描述"
                    prop="othKey">
            </el-table-column>
            <el-table-column
                    label="内容"
                    prop="othValue">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row,0)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

<!--  img      -->
        <el-table
                :data="imgTableData"
                style="width: 100%">
            <el-table-column
                    label=""
                    prop="othDesc">
            </el-table-column>
            <el-table-column
                    label=""
                    prop="othKey">
            </el-table-column>
            <el-table-column
                    label="">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.othValue"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEditWithImg(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row,1)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {$get_header,$post_header,$delete_header} from '../api'
    import uploadImag from "../components/uploadImag";
    export default {
        name: "otherInfo",
        components:{
            uploadImag
        },
        methods:{
            handleEditWithImg(index,data){
                this.updateImg = true;
                this.fileUrl = data.othValue;
                this.key = data.othKey;
                this.desc = data.othDesc
                this.id = data.id
            },
            updateImage(){
                let data = {
                    othKey:this.key,
                    othValue:this.imageUrl,
                    othDesc:this.desc,
                    id:this.id
                };
                $post_header('/admin/other/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('成功');
                        this.list()
                        this.updateImg = false
                    }else{
                        this.$message.error('失败')
                    }
                })
            },
            updateDate(){
                let data = {
                    othKey:this.key,
                    othValue:this.value,
                    othDesc:this.desc,
                    id:this.id
                };
                $post_header('/admin/other/update',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('成功');
                        this.list()
                        this.update = false
                    }else{
                        this.$message.error('失败')
                    }
                })
            },
            handleEdit(index,data){
                this.update = true
                this.key = data.othKey
                this.value = data.othValue
                this.desc = data.othDesc
                this.id = data.id
            },
            handleDelete(index,data,type){
                console.log(data.id);
                $delete_header('/admin/other/delete',data.id).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('删除成功');
                        if(type==0){
                            this.contTableData.splice(index,1)
                        }else{
                            this.imgTableData.splice(index,1)
                        }
                    }else{
                        this.$message.error('删除失败')
                    }
                })
            },
            uploadUrl(value){
                this.imageUrl = value
            },
            submitwithimage(){
                if(this.key===''||this.imageUrl===''||this.desc===''){
                    this.$message.error('补全数据');
                    return;
                }
                let data = {
                    othKey:this.key,
                    othValue:this.imageUrl,
                    othDesc:this.desc,
                    othType:1,
                };
                console.log(data)
                $post_header('/admin/other/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                        this.dialogVisible1 = false;
                        this.list()
                    }else{
                        this.$message.error('添加失败')
                    }
                    this.key='';
                    this.value='';
                    this.desc=''
                });


            },
            submit(){
                if(this.key===''||this.value===''||this.desc===''){
                    this.$message.error('补全数据');
                    return;
                }
                let data = {
                    othKey:this.key,
                    othValue:this.value,
                    othDesc:this.desc,
                    othType:0
                };
                $post_header('/admin/other/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('成功');
                        this.dialogVisible = false
                        this.list()
                    }else{
                        this.$message.error('失败')
                    }
                    this.key='';
                    this.value='';
                    this.desc=''
                });



            },
            list(){
                $get_header('/admin/other/getList').then(res=>{
                    this.norMal = res.data.result.norMal;
                    this.contTableData = res.data.result.norMal;
                    this.link = res.data.result.link
                    this.imgTableData = res.data.result.link;
                    console.log(res.data.result)
                })
            }
        },
        created() {
            this.list();

        },
        data(){
            return{
                norMal:[],
                link:[],
                dialogVisible:false,
                key:'',
                value:'',
                desc:'',
                dialogVisible1:false,
                imageUrl:'',
                contTableData:[],
                imgTableData:[],
                update:false,
                id:'',
                updateImg:false,
                fileUrl:''
            }
        }
    }
</script>

<style scoped>

</style>