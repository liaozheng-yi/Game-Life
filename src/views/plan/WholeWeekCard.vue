<template>
    <a-card >
        <template v-slot:title>
            <h2>{{date.year}}年第{{date.week}}周_PLAN</h2>
        </template>
        <a-input v-model:value="mainTask" @pressEnter="newMainTask"/>
        <Tree :data="data" ref="tree"/>
    </a-card>
</template>
<script>
import { computed, getCurrentInstance, onMounted, ref,reactive, watchEffect} from 'vue';
import { useRoute } from 'vue-router'
import store from "@/store";
import Tree from "@/components/Tree.vue";
import {useArrange} from "@/use/useArrange.js"

export default {
    name:"WholeWeekCard",
    components:{
        Tree
    },
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

        let data = computed(()=>{return store.state.wholeWeek})
        onMounted(()=>{
            useArrange(getCurrentInstance().refs.tree.$el);
        })

        let mainTask = ref();
        let newMainTask = ()=>{
            if(mainTask.value){
                store.commit("mainTask",mainTask.value)
                console.log(mainTask.value);
                mainTask.value = "";
            }
        }
        return {date,data,mainTask,newMainTask}
    }
}
</script>
