<template>
    <div>
        <el-tree
                :data="JSON.parse(JSON.stringify(data))"
                accordion
                node-key="id"
                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
        </el-tree>
    </div>
</template>

<script>
    import {$get_header, $delete_header, $post_header} from "../api";

    export default {
        name: "UserTree",
        created() {
            $get_header('/admin/sys-user/getTree').then(res=>{
                this.data = res.data.result
                console.log(this.data)
            })
        },
        data() {
            return {
                data: [],
            }
        },

        methods: {
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                const d = data;
                let type = children[index].type;
                if(type===1){
                    console.log(d.id)
                    $delete_header('/admin/sys-user/deleteById',d.id).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('删除成功')
                            children.splice(index, 1);
                        }else{
                            this.$message.error(res.data.errorMessage)
                        }
                    });
                    return;
                }
                if(type===2){
                    console.log('删除用户的角色')
                    let data = {
                        roleName:d.name,
                        parentId:parent.data.id
                    };
                    $post_header('/admin/sys-role/deleteUserRole',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('删除成功')
                            children.splice(index, 1);
                        }else{
                            this.$message.error(res.data.errorMessage)
                        }
                    });
                    console.log(data)
                }
                if(type===3){
                    let data = {
                        perName:d.name,
                        parentKey:parent.data.name
                    };
                    //删除_角色的权限
                    $post_header('/admin/sys-per/deleteRolePerm',this.qs.stringify(data)).then(res=>{
                        if(res.data.errorCode=='0000'){
                            this.$message.success('删除成功');
                            children.splice(index, 1);
                        }else{
                            this.$message.error(res.data.errorMessage)
                        }
                    });
                }

            },
        }
    }
</script>

<style scoped>
    .custom-tree-node {
        flex: 0.2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>