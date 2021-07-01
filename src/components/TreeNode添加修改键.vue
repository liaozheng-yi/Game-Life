<template>
  <li>
    <div class="tree-work-wrap">
      <a-checkbox :checked="data.done" @click="isDone">
        {{ data.work }}
      </a-checkbox>
      <span class="icon-wrap">
        <PlusOutlined style="margin: 0 1em 0 0" @click="toPlus" />
        <CloseOutlined @click="del" />
      </span>
    </div>
    <a-input
      v-if="input.isShow"
      v-model:value="input.work"
      @blur="
        () => {
          input.isShow = false;
        }
      "
      @pressEnter="newWork"
      ref="write"
    />
    <input type="text" class="leaf-input">
    <ul v-if="!!data.detail">
      <TreeNode
        v-for="(item, ranking) in data.detail"
        :key="item.key"
        :data="item"
        :index="[...index, ranking]"
      />
    </ul>
  </li>
</template>
<script>
import { CloseOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import store from "@/store";

export default {
  name: "TreeNode",
  props: {
    data: Object,
    index: Array,
  },
  components: {
    CloseOutlined,
    PlusOutlined,
  },
  setup(props) {
    let input = reactive({
      work: "",
      isShow: false,
    });

    let isDone = () => {
      store.commit("weekIsDone", props.index);
    };

    let toPlus=()=>{
      input.isShow = !input.isShow
    }

    let del = () => {
      store.commit("weekDel", props.index);
    };

    let newWork = () => {
      if (input.work) {
        store.commit("weekNewWork", {
          data: input.work,
          index: props.index,
        });
      }
      input.work = "";
    };
    return { isDone, input, del, newWork,toPlus };
  },
};
</script>
<style lang="less" scoped>
.leaf-input{
  width: 100%;
  padding: 3px 10px;
  border:1px solid #d9d9d9;
  border-radius: 2px;
  letter-spacing: 1px;
}
.add{
  &:hover{
    border-color:#40a9ff;
  }
  &:focus{
    border-color: #40a9ff;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
  }
}
.rewrite{
  &:hover{
    border-color:#fd73f2;
  }
  &:focus{
    border-color: #fd73f2;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
  }
}
.tree-work-wrap {
  position: relative;
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