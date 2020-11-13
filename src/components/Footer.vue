<template>
  <div class="footer-wrap">
    <a-button @click="pre">上周</a-button>
    <a-button @click="next">下周</a-button>
    <a-button @click="save">保存</a-button>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import {toSave} from "@/service/api.js";
import {isChange} from "@/use/useIsChange.js";
export default {
  name: "Footer",
  setup() {
    const router = useRouter();
    let route = useRoute();
    const pre = ()=>{
      if(isChange().value){toSave()}
      router.push(`/plans?year=${route.query.week - 1 <= 0 ? route.query.year - 1 : route.query.year}&week=${route.query.week- 1 <= 0 ? 52 : route.query.week - 1}`)
    };
    const next = ()=>{
      if(isChange().value){toSave()}
      router.push(`/plans?year=${+route.query.week + 1 > 52 ? +route.query.year + 1 : route.query.year}&week=${+route.query.week + 1 > 52 ? 1 : +route.query.week + 1}`)
    };
    const save = () => {
      toSave();
    };
    return {
      pre,
      next,
      save,
    };
  },
};
</script>
<style lang="less">
.footer-wrap {
  display: flex;
  justify-content: center;
}
</style>