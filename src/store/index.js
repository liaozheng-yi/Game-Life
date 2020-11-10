import { createStore } from 'vuex'
import {  } from '@/store/storeMethods.js'

export default createStore({
  state: {
    // loading:true,
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
    },
    inject(state,payload){
      // state.loading=false;
      // state.year = payload.thisYear;
      // state.week = payload.thisWeek;
      state.weekdays = payload.weekdays;
      state.wholeWeek = payload.wholeWeek;
    },
    // loading(state,payload){
    //   state.loading = payload;
    // }
  },
  actions: {
  },
  modules: {
  }
})
