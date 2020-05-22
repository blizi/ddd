<template>
    <el-form label-width="80px">
        <el-form-item label="菜单等级">
            <el-select :disabled="disabled" v-model="type" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label="父级菜单" v-if="this.type!=1" >
            <el-select v-model="parentId" placeholder="请选择" :disabled="disabled">
                <el-option
                        v-for="item in parentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="导航名称">
            <el-input v-model="name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="导航描述">
            <el-input v-model="desc" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {$get_header,$post_header} from '../api'
    export default {
        name: "editNav",
        data(){
            return{
                options: [{
                    value: '1',
                    label: '一级菜单'
                }, {
                    value: '2',
                    label: '二级菜单'
                }, {
                    value: '3',
                    label: '三级菜单'
                }],
                type: '',
                parentOptions:[],
                name:this.$route.query.name,
                parentId:'',
                desc:this.$route.query.desc,
                disabled:false
            }
        },
        created() {
            if(this.$route.query.id){
                this.disabled = true
            }
        },
        methods:{
            onSubmit(){
                if(this.disabled){
                    //update by id
                    let data = {
                        id:this.$route.query.id,
                        navName:this.name,
                        navDesc:this.desc
                    };
                    $post_header('/admin/nav/updateById',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error('修改失败')
                        }
                    });
                    return;
                }



                if(this.type==''||this.name==''){
                    this.$message.error('请补全内容');
                    return;
                }
                if(this.type!=1&&this.parentId==''){
                    this.$message.error('父级菜单必选');
                    return;
                }
                let data = {
                    navName:this.name,
                    navDesc:this.desc,
                    type:this.type,
                    parentId:this.parentId
                }
                console.log(data);
                $post_header('/admin/nav/insert',this.qs.stringify(data)).then(res=>{
                    if(res.data.errorCode=='0000'){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.error('添加失败')
                    }
                })
            }
        },
        watch:{
            type(value){
                this.parentId = '';
                if(value!=1){
                    $get_header('/admin/nav/getByType',{type:this.type-1}).then(res=>{
                        console.log(res.data)
                        this.parentOptions = res.data.result;
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>