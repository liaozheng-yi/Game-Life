<template>
    <a-card :title="item.date+' '+item.title" v-for="(item,index) in weekdaysDate" :key="item.date">
        <HalfDay button="上午" target="am" :index="index"/>
        <HalfDay button="下午" target="pm" :index="index"/>
    </a-card>
    <a-card :title="weekendDate[0]+'~'+weekendDate[1]+' 周末'">
        <HalfDay button="周六" target="plan" :index="5"/>
        <HalfDay button="周日" target="plan" :index="6"/>
    </a-card>
</template>
<script>
import HalfDay from "@/components/HalfDay.vue" 
import { reactive,toRefs,watchEffect } from 'vue'
// import store from "@/store";
import {getWeek} from '@/use/dateCalculator.js'
import { useRoute } from 'vue-router';

export default {
    name:"WeekdaysCard",
    components:{
        HalfDay,
    },
    setup(){
        const route = useRoute();
        let dates = reactive({
            weekdaysDate:[],
            weekendDate:[]
        });
        watchEffect(()=>{
            dates.weekdaysDate = getWeek(route.query.year,route.query.week).weekdaysDate;
            dates.weekendDate = getWeek(route.query.year,route.query.week).weekendDate;
        });
        return {...toRefs(dates)}
    }
}
</script>