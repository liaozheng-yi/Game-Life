<template>
  <header class="header">Weekly-Plan</header>
  <main class="main">
    <div class="weekdays">
      <WeekdaysCard/>
    </div>
    <div class="wholeWeek" >
      <WholeWeekCard/>
    </div>
  </main>
  <footer class="footer">
    <Footer></Footer>
  </footer>
</template>

<script>
import WeekdaysCard from "@/views/plan/WeekdaysCard.vue";
import WholeWeekCard from "@/views/plan/WholeWeekCard.vue";
import Footer from "@/components/Footer.vue";
// import store from "@/store";
import { getPlan } from "@/service/api.js";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Plan",
  components: {
    WeekdaysCard,
    WholeWeekCard,
    Footer,
  },
  setup() {
    const route = useRoute();
    watchEffect(() => {
      getPlan(route.query.year, route.query.week)
    });
    // setInterval(()=>{
    // console.log(store.state.weekdays);
    // },3000)
    return {};
  }
};
</script>

<style lang="less">
@head: 8vh;
@content: 100-2 * @head;
.header {
  height: @head;
  background: #96c120;
}
.main {
  min-height: @content;
  max-height: @content;
  display: flex;
  .weekdays {
    background: #c7d59f;
    max-width: 63vw;
    min-width: 63vw;
    display: flex;
    flex-wrap: wrap;
    .ant-card {
      flex: 1 1;
      max-height: 50%; //42vh
      max-height: 50%;
      max-width: 33.33%;
      min-width: 33.33%;
      .ant-card-head {
        height: 6vh;
      }
      .ant-card-body {
        height: 36vh;
        overflow: hidden;
      }
    }
  }
  .wholeWeek {
    background: #c7d59f;
    flex: 1;
    display: flex;
    .ant-card {
      flex: 1;
    }
  }
}
.footer {
  height: @head;
  background: #96c120;
}
</style>