<template>
  <Header/>
  <main class="main">
    <div class="weekdays">
      <WeekdaysCard/>
    </div>
    <div class="wholeWeek" >
      <WholeWeekCard/>
      <span class="transport" ref="box"/>
    </div>
  </main>
  <footer class="footer">
    <Footer></Footer>
  </footer>
</template>

<script>
import WeekdaysCard from "@/views/plan/WeekdaysCard.vue";
import WholeWeekCard from "@/views/plan/WholeWeekCard.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { getPlan } from "@/service/api.js";
import { getCurrentInstance,watchEffect,onMounted } from "vue";
import { useRoute } from "vue-router";
import {giveBox} from "@/use/useArrange.js"

export default {
  name: "Plan",
  components: {
    WeekdaysCard,
    WholeWeekCard,
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    watchEffect(() => {
      getPlan(route.query.year, route.query.week)
    });
    onMounted(()=>{
      giveBox(getCurrentInstance().refs.box);
    })
    return {};
  }
};
</script>

<style lang="less">
@head: 8vh;
@content: 100-2 * @head;
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
        .ant-card-head-wrapper{
          height: 6vh;
          text-align: center;
        }
      }
      .ant-card-body {
        height: 36vh;
        overflow: hidden;
        padding: 12px;
        &:hover .halfday-wrap>.hide-btn{
          display: block;
        }
      }
    }
  }
  .wholeWeek {
    background: #c7d59f;
    flex: 1;
    display: flex;
    .ant-card {
      flex: 1;
      .ant-card-head{
        height: 8vh;
        .ant-card-head-wrapper{
          height: inherit;
        }
      }
      .ant-card-body{
        padding: 16px;
      }
    }
    .transport{
      display: none;
      position: fixed;
      border: 1px solid #FFCC00; 
      background: #96c120;
      padding: 0 8px;
      border-radius: 8px;
    }
  }
}
.footer {
  height: @head;
  background: #96c120;
}
</style>