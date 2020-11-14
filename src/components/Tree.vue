<template>
  <ul class="tree">
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
.tree{
  padding-inline-start: 16px;
}
</style>