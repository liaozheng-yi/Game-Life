import { createStore } from 'vuex'

let store = createStore({
  state: {
    year:'',
    week:'',
    weekdays:[],
    wholeWeek:[]
  },
  mutations: {
    base(state,payload){
      state.year = payload.year;
      state.week = payload.week;
      state.weekdays = payload.weekdays;
      state.wholeWeek = payload.wholeWeek;
    },
    inject(state,payload){
      state.weekdays = payload.weekdays;
      state.wholeWeek = payload.wholeWeek;
    },
    daysIsDone(state,{index,target,wokrIndex}){
      state.weekdays[index][target][wokrIndex].done=!state.weekdays[index][target][wokrIndex].done
    },
    daysNewWork(state,{index,target,value}){
      state.weekdays[index][target].push({
        work:value,
        done:false
      })
    },
    daysDel(state,{index,target,wokrIndex}){
      state.weekdays[index][target].splice(wokrIndex,1)
    },
    weekIsDone(state,upload){
      let aim = find(upload,state.wholeWeek)
      aim.done = !aim.done;
      isAllDone(aim)
    },
    weekDel(state,upload){
      if(upload.length===1){
        state.wholeWeek.splice(upload[0],1)
      }else{
        let rank = upload.pop();
        let aim = find(upload,state.wholeWeek)
        if(aim.length===1){
          delete aim.detail
        }else{
          aim.detail.splice(rank,1)
        }
      }
    },
    weekNewWork(state,{data,index}){
      let aim = find(index,state.wholeWeek);
      if(!aim.detail){aim.detail=[]}
      aim.detail.push({
        work:data,
        done:false
      })
    },
    mainTask(state,upload){
      state.wholeWeek.push({
        work:upload,
        done:false
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;

function find(where,data){
  return where.reduce((acc,cur,index)=>{
    return where.length>index+1?acc[cur].detail:acc[cur]
  },data);
}

function isAllDone(data){
  if(data.detail){
    data.detail.forEach(ele => {
      ele.done=data.done
      isAllDone(ele)
    });
  }
}