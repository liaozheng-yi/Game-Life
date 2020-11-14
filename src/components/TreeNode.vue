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
// .treeNode{
//     list-style-type: none;
// }
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