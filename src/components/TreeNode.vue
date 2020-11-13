<template>
    <li>
      <div class="tree-work-wrap">
        <a-checkbox :checked="data.done" @click="isDone">
            {{ data.work }}
        </a-checkbox>
        <span class="icon-wrap">
            <PlusOutlined 
                style="margin:0 1em 0 0"
                @click="() => {
                    input.isShow = !input.isShow
                }"
            />
            <CloseOutlined 
                @click="del"
            />
        </span>
      </div>
      <a-input 
        v-if="input.isShow"
        v-model:value="input.work"
        @blur="() => {input.isShow = false;}"
        @pressEnter="newWork"
      />
      <ul v-if="!!data.detail">
        <TreeNode v-for="(item,ranking) in data.detail" :key="item.key" :data="item" :index="[...index,ranking]"/>
      </ul>
    </li>
</template>
<script>
import { CloseOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { reactive } from 'vue';
import store from "@/store";

export default {
    name:"TreeNode",
    props:{
        data:Object,
        index:Array
    },
    components: {
        CloseOutlined,
        PlusOutlined,
    },
    setup(props) {
        let input = reactive({
            work:"",
            isShow:false
        })
    
        let isDone = () => {
            store.commit("weekIsDone",props.index)
        };

        let del = ()=>{
            store.commit("weekDel",props.index)
        }

        let newWork = ()=>{
            store.commit("weekNewWork",{
                data:input.work,
                index:props.index
            })
            input.work = ""
        }
        return { isDone,input,del,newWork}
    }
}

</script>