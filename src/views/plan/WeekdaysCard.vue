<template>
    <a-card :title="weekdays[0].date+' 周一'">
        <HalfDay button="上午" target="am" index="0"/>
        <HalfDay button="下午" target="pm" index="0"/>
    </a-card>
    <a-card :title="weekdays[1].date+' 周二'">
        <HalfDay button="上午" target="am" index="1"/>
        <HalfDay button="下午" target="pm" index="1"/>
    </a-card>
    <a-card :title="weekdays[2].date+' 周三'">
        <HalfDay button="上午" target="am" index="2"/>
        <HalfDay button="下午" target="pm" index="2"/>
    </a-card>
    <a-card :title="weekdays[3].date+' 周四'">
        <HalfDay button="上午" target="am" index="3"/>
        <HalfDay button="下午" target="pm" index="3"/>
    </a-card>
    <a-card :title="weekdays[4].date+' 周五'">
        <HalfDay button="上午" target="am" index="4"/>
        <HalfDay button="下午" target="pm" index="4"/>
    </a-card>
    <a-card :title="weekdays[5].date+'~'+weekdays[6].date+' 周末'">
        <HalfDay button="周六" target="plan" index="5"/>
        <HalfDay button="周日" target="plan" index="6"/>
    </a-card>
</template>
<script>
import HalfDay from "@/components/HalfDay.vue" 
import { computed } from 'vue'
import store from "@/store";

export default {
    name:"WeekdaysCard",
    components:{
        HalfDay,
    },
    setup(){
        let weekdays = computed(()=>{
            return store.state.weekdays
        })
        return {weekdays}
    }
}
</script>