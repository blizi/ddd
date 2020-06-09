<template>
    <div>
        <el-input v-model="title" disabled/>
        <el-divider></el-divider>
        <ImageTable :tableData="tableData" :id="id"/>
    </div>
</template>

<script>
    import ImageTable from "../components/ImageTable";
    import {$post_header,$get_header} from "../api";

    export default {
        name: "editHard",
        methods:{
            list(){
                $get_header('/admin/image/getByParentId',{parentId:this.id}).then(res=>{
                    this.tableData = res.data.result
                })
            }
        },
        created() {
            this.list()
        },
        data(){
            return{
                id:this.$route.query.id,
                title:this.$route.query.title,
                tableData:[]
            }
        },
        components:{
            ImageTable
        }
    }
</script>

<style scoped>

</style>