<template>
    <a-card >
        <template v-slot:title>
            <h2>{{date.year}}年第{{date.week}}周_PLAN</h2>
        </template>
        <!-- <Tree :data="wholeWeek" /> -->
    </a-card>
</template>
<script>
import { reactive, watchEffect} from 'vue';
import { useRoute } from 'vue-router'
// import Tree from "@/components/Tree.vue";

export default {
    name:"WholeWeekCard",
    setup(){
        const route = useRoute();
        let date = reactive({
            year:'',
            week:''
        });
        watchEffect(()=>{
            date.year = route.query.year;
            date.week = route.query.week
        })
        // setInterval(()=>{
        //     console.log(date.year);
        // },4000)
        return {date}
    }
}
</script>