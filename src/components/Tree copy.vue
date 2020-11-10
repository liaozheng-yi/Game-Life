<template>
  <a-tree
    v-model="checkedKeys"
    checkable
    :expanded-keys="expandedKeys"
    :auto-expand-parent="autoExpandParent"
    :selected-keys="selectedKeys"
    :tree-data="treeData"
    :replace-fields="replaceFields"
    @expand="onExpand"
    @select="onSelect"
  >
  </a-tree>
</template>
<script>
export default {
  name: "Tree",
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData:this.$store.state.wholeWeek,
      replaceFields:{children:'detail',title:'work'}
    };
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
  },
};
</script>
