import { computed } from 'vue';
import store from "@/store"

function isChange(){
    let initData = sessionStorage.getItem("initData");
    return computed(()=>{
        return initData!==JSON.stringify(store.state); 
    })
}


export {isChange}