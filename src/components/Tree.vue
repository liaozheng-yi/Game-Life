<template>
  <ul>
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
.tree-work-wrap {
  position: relative;
//   .ant-checkbox-wrapper{
//       padding: 0;
//   }
  &:hover .icon-wrap {
    display: inline-block;
  }
  .icon-wrap {
    display: none;
    position: absolute;
    right: 0;
  }
}
</style>