<template>
  <label class="ant-checkbox-wrapper" v-for="item in data" :key="item.key">
    <span class="ant-checkbox ant-checkbox-check">
    <!-- <span class="ant-checkbox ant-checkbox-indeterminate"> -->
    <!-- <span class="ant-checkbox ant-checkbox-checked"> -->
      <input type="checkbox" class="ant-checkbox-input" value="true" />
      <span class="ant-checkbox-inner"></span>
    </span>
    <span>
      {{item.work}}
      <p>sdfdfadfasd</p>
    </span>
    <!-- <br/> -->
  </label>
</template>
<script>
export default {
  props:{
    data:Array
  },
  mounted(){
    console.log(this.$props.data);
    console.log(this.$store.state.wholeWeek);
  }
};
</script>ipt>