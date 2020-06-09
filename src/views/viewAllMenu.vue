<template>
    <div>
        <el-select v-model="value" filterable placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
        <el-button @click="submit">确定</el-button>
    </div>
</template>

<script>
    import {$get_header, format, $delete_header, $post_header} from '../api'
    export default {
        name: "viewAllMenu",
        created() {
            $get_header('/admin/nav/getLastNav').then(res=>{
                this.options = res.data.result;
            })
        },
        data(){
            return{
                options:[],
                value:''
            }
        },
        methods:{
            getIt(a){
                console.log(a)
            },
            submit(){
                let name = '';
                for(let i=0;i<this.options.length;i++)
                if(this.options[i].id===this.value){
                    name = this.options[i].name
                    console.log(this.options[i].name)
                    break;
                }
                this.$router.push({
                    path:'/exp/exp-edit-menu',
                    query:{
                        name:name,
                        id:this.value
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>