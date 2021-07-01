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
      if(upload.length===1){
        state.wholeWeek[upload[0]].done = !state.wholeWeek[upload[0]].done
      }else{
        let aim = find(upload,state.wholeWeek);
        aim.done = !aim.done;
        upIsDone(state, upload);
      }
    },
    weekDel(state,upload){
      if(upload.length===1){
        state.wholeWeek.splice(upload[0],1)
      }else{
        let [main,side] = toSlice(upload);
        let mainWork = find(main,state.wholeWeek)
        if(mainWork.detail.length===1){
          delete mainWork.detail
        }else{
          mainWork.detail.splice(side,1)
        }
      }
    },
    weekNewWork(state,{data,index}){
      let aim = find(index,state.wholeWeek);
      if(!aim.detail){aim.detail=[]}
      aim.detail.push({
        work:data,
        done:false,
        key:Date.now()
      })
      aim.done = false;
    },
    mainTask(state,upload){
      state.wholeWeek.push({
        work:upload,
        done:false,
        key:Date.now()
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;

function upIsDone(state, upload) {
  let [main] = toSlice(upload);
  let mainWork = find(main, state.wholeWeek);
  let unDoneWorks = mainWork.detail.filter(ele => !ele.done);
  if (unDoneWorks.length === 0) {
    mainWork.done = true;
  } else {
    mainWork.done = false;
  }
  if(main.length>=2){
    upIsDone(state,main)
  }
}

function find(where,data){
  return where.reduce((acc,cur,index)=>{
    return where.length>index+1?acc[cur].detail:acc[cur]
  },data);
}

function toSlice(upload){
  let main = upload.slice(0,upload.length-1)
  let side = upload.slice(upload.length-1)[0]
  return [main,side]
}
// 从上至下的数据更改
// function downIsAllDone(data){
//   if(data.detail){
//     data.detail.forEach(ele => {
//       ele.done=data.done
//       isAllDone(ele)
//     });
//   }
// }