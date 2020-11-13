import store from '../store/index.js';
import http from './http.js';
import { getWeek } from '../use/dateCalculator.js';
import { message } from "ant-design-vue";
import { isChange } from '../use/useIsChange.js';

// userInfo = {user:"",pwd:""}
export function toLogin(userInfo) {
    return http.post('/login', userInfo)
}

export function getPlan(theYear, theWeek) {
    //直接生成一个空数据
    let initData = {
        year: theYear,
        week: theWeek,
        weekdays: createInitData(theYear, theWeek),
        wholeWeek: []
    }
    store.commit("base", initData);
    backup(initData)

    http.get('/plans', {
        params: {
            year: theYear,
            week: theWeek
        }
    }).then((res) => {
        console.log(res.data);
        //如果请求到了数据，再重新注入，否则做空数据提醒。
        if (res.data.state === 1) {
            //添加keys，并提交store
            addKeys(res.data.data.wholeWeek)
            store.commit("inject", {
                weekdays: res.data.data.weekdays,
                wholeWeek: res.data.data.wholeWeek
            });
            backup(store.state)
        } else {
            message.info("本周暂无安排")
        }
    })
}

export function toSave() {
    if(isChange().value){
        backup(store.state)
        let newWholeWeek = removeKeys(store.state.wholeWeek)
        http({
            method:"post",
            url:"/save",
            data:{
                year:store.state.year,
                week:store.state.week,
                weekdays:store.state.weekdays,
                wholeWeek: newWholeWeek
            }
        }).then(res=>{
            console.log('后端返回的通知',res.data);
            if(res.data.state===1){
                message.success('已保存')
            }
        })
    }else{
        message.success('点个保存压压惊')
    }
    
}

function backup(data){
    sessionStorage.setItem('initData',JSON.stringify(data))
}

function createInitData(theYear, theWeek) {
    let data = [];
    let { weekdaysDate, weekendDate } = getWeek(theYear, theWeek);
    weekdaysDate.forEach(item => {
        data.push({
            date: item,
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
    return data
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

function removeKeys(data) {  //removeKeys完全没有改变原数据
    if (data.length > 0) {
        return data.map((item) => {
            if (item.detail) {
                return {
                    work: item.work,
                    done: item.done,
                    detail: removeKeys(item.detail),
                }
            } else {
                return {
                    work: item.work,
                    done: item.done,
                };
            }
        })
    } else {
        return []
    }
}
// 前后端交互数据操作 end