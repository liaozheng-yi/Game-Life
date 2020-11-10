import store from '../store/index.js';
import http from './http.js';
import { getWeek } from '../use/dateCalculator.js';


// userInfo = {user:"",pwd:""}
export function toLogin(userInfo) {
    return http.post('/login', userInfo)
}

export  function getPlan(theYear, theWeek) {

    http.get('/plans', {
        params: {
            year: theYear,
            week: theWeek
        }
    }).then((res) => {
        //添加keys
        addKeys(res.data.data.wholeWeek)
        //如果是空数据，则进行补足
        if (res.data.data.weekdays.length === 0) {
            fillDates(res.data.data.weekdays, theYear, theWeek)
            //添加提醒：本周暂无安排
        }
        //存进store
        store.commit("inject", res.data.data);
        //备份初始数据

        // console.log(store.state.weekdays);
    })
}

// 前后端交互数据操作 start
function addKeys(data, parentKey) {
    if (data.length > 0) {
        data.forEach((item, index) => {
            //添加key值，注意：这一步在原数组上添加了Key值，即改变了原数组
            item.key = (parentKey === undefined) ? index + "" : (parentKey + "-" + index);
            //是否存在detail，若存在则循环
            if (item.detail) {
                addKeys(item.detail, item.key)
            }
        })
    }
}


function fillDates(data, theYear, theWeek) {
    let { weekdaysDate, weekendDate } = getWeek(theYear, theWeek)
    weekdaysDate.forEach(item => {
        data.push({
            date: item.date,
            am: [],
            pm: []
        })
    })
    weekendDate.forEach(item => {
        data.push({
            date: item,
            plan: []
        })
    })
}

// function removeKeys(data) {  //removeKeys完全没有改变原数据
//     if (data.length > 0) {
//         return data.map((item) => {
//             if (item.detail) {
//                 return {
//                     work: item.work,
//                     done: item.done,
//                     detail: removeKeys(item.detail),
//                 }
//             } else {
//                 return {
//                     work: item.work,
//                     done: item.done,
//                 };
//             }
//         })
//     } else {
//         return []
//     }
// }

// 前后端交互数据操作 end