<template>
  <li class="twig">
    <div class="tree-work-wrap">
      <span class="switch" v-if="!!data.detail" @click="toSpread">
        <CaretRightOutlined v-show="!spread"/>
        <CaretDownOutlined v-show="spread"/>
      </span>
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
    <ul v-if="!!data.detail" class="son-tree" v-show="spread">
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
import { CloseOutlined,PlusOutlined,CaretRightOutlined,CaretDownOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import store from "@/store";

export default {
  name: "TreeNode",
  components: {
    CloseOutlined,
    PlusOutlined,
    CaretRightOutlined,
    CaretDownOutlined
  },
  props: {
    data: Object,
    index: Array,
  },
  data(){
    return {
      spread:true
    }
  },
  methods:{
    toSpread(){
      this.$data.spread = !this.$data.spread
    }
  },
  setup(props) {
    let input = reactive({
      work: "",
      isShow: false,
    });
    let toPlus=()=>{
      input.isShow = !input.isShow
    }
    let isDone = () => {
      store.commit("weekIsDone", props.index);
    };
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
.twig{
  list-style-type:none;
  .tree-work-wrap {
    position: relative; 
    .switch{
      position: absolute;
      left: -16px;
    }
    &:hover{
      box-shadow: -1px -1px 0 1px rgba(103, 182, 247, 0.5) inset;
    }
    &:hover .icon-wrap {
      display: inline-block;
    }
    .icon-wrap {
      display: none;
      position: absolute;
      right: 0;
    }
  }
}
</style>