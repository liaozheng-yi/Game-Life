<template>
  <div class="halfday-wrap">
    <a-button
      @click="() => {showInput = !showInput}"
      :class="{'hide-btn':!data.length & !showInput}"
    >
      {{ button }}
    </a-button>
    <a-input
      @pressEnter="newWork"
      v-model:value="inputData"
      v-if="showInput"
      @blur="() => {showInput = false;}"
    />
    <div v-for="(item, wokrIndex) in data" :key="item" class="work-wrap">
      <a-checkbox :checked="item.done" @click="isDone(wokrIndex)">
        {{ item.work }}
      </a-checkbox>
      <CloseOutlined @click="del(wokrIndex)" />
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import store from "@/store";
export default {
  name: "HalfDay",
  components: {
    CloseOutlined,
  },
  setup(props, ctx) {
    let { button, target, index } = ctx.attrs;

    let data = computed(() => {
      return store.state.weekdays[index][target];
    });

    let isDone = (wokrIndex) => {
      store.commit("daysIsDone", {
        index,
        target,
        wokrIndex,
      });
    };

    let inputData = ref();
    let newWork = () => {
      store.commit("daysNewWork", {
        index,
        target,
        value: inputData.value,
      });
      inputData.value = "";
    };

    let del = (wokrIndex) => {
      store.commit("daysDel", {
        index,
        target,
        wokrIndex,
      });
    };
    // setInterval(() => {
    //   console.log(work.value);
    // }, 2000);
    let showInput = ref(false);
    return { button, data, isDone, newWork, inputData, del, showInput };
  },
};
</script>
<style lang="less" scoped>
.halfday-wrap {
  display: flex;
  flex-direction: column;
  .ant-btn{
    width:5em
  }
  .hide-btn{
    display: none;
  }
  .work-wrap {
    position: relative;
    .ant-checkbox-wrapper {
      margin: 0;
    }
    &:hover .anticon {
      display: block;
    }
    .anticon {
      display: none;
      position: absolute;
      right: 0;
      top: 0.35em;
    }
  }
}
</style>