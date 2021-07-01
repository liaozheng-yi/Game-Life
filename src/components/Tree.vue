<template>
  <ul class="main-tree">
    <TreeNode v-for="(item,index) in data" :key="item.key" :data="item" :index="[index]"/>   
  </ul>
</template>
<script>
import TreeNode from "./TreeNode.vue"

export default {
  name: "Tree",
  props: {
    data: Array,
  },
  components:{
      TreeNode
  }
}
</script>
<style lang="less">
.main-tree{
  padding-inline-start: 16px;
}
.son-tree{
  padding-inline-start: 24px;
}
</style>