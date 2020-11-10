<template>
  <a-button>{{ button }}</a-button>
  <br/>
  <a-input></a-input>
  <a-checkbox  v-for="item in data" :key="item">{{item.work}}</a-checkbox>
</template>
<script>
import { computed } from 'vue';
import store from "@/store";
export default {
  name: "HalfDay",
  props: {
    index: Number,
  },
  setup(props, ctx) {
    let button = ctx.attrs.button;
    let target = ctx.attrs.target;
    console.log('target',target,typeof(target));
    let data = computed(()=>{
        let weekdays = store.state.weekdays;
        // let day = weekdays[props.index];
        // console.log(day);
        return weekdays;
    });
    // let works = data[props.index]
    // setInterval(() => {
    //   console.log(data);
    // }, 5000);
    return { button,data };
  },
};
</script>