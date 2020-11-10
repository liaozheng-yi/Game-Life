<template>
  <div>
      <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
        Check all
      <p>sdfdfadfasd</p>
      </a-checkbox>
    <br/>
    <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
  </div>
</template>
<script>
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
export default {
  name: "TreeNode",
  data() {
    return {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
    };
  //   data(){
  //   return this.$store.state.wholeWeek
  // }
  },
  methods: {
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
  },
};
</script>
