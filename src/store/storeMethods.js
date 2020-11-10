function dataToTree(data) {
    if (data.length > 0) {
        return data.map((item) => {
            if (item.detail) {
                return {
                    title: item.work,
                    key: item.key,
                    children: dataToTree(item.detail)
                }
            } else {
                return {
                    title: item.work,
                    key: item.key
                }
            }
        })
    } else {
        return []
    }
}
function doneToKeys(data) {
    let checkedKeys = [];
    data.forEach(item => {
        if (item.done === true) {
            checkedKeys.push(item.key)
        }
        if (item.detail) {
            checkedKeys = checkedKeys.concat(doneToKeys(item.detail))
        }
    })
    return checkedKeys;
}

function keysToDone(data, keys) {
    return data.map(item => {
        if (item.detail) {
            return {
                ...item,
                done: keys.includes(item.key),
                detail: keysToDone(item.detail, keys)
            }
        } else {
            return {
                ...item,
                done: keys.includes(item.key),
            }
        }
    })
}

function defaultExpandParent(data) {
    let parentKeys = [];
    data.forEach((item) => {
        if (item.detail) {
            parentKeys.push(item.key)
            parentKeys = parentKeys.concat(defaultExpandParent(item.detail))
        }
    })
    return parentKeys;
}

function weekdaysIsDone(data, date, time, target) {
    return data.map(day => {
        if (day.date === date) {
            return time === '上午' ? {
                ...day,
                am: day.am.map((item, index) => {
                    return index === target ? {
                        ...item,
                        done: !item.done
                    } : item;
                })
            } : {
                    ...day,
                    pm: day.pm.map((item, index) => {
                        return index === target ? {
                            ...item,
                            done: !item.done
                        } : item;
                    })
                };
        } else {
            return day;
        }
    });
}

function toDelTree(data, key) {
    let newd = getTarget(data).map(item => {
        if (item.detail) {
            return {
                ...item,
                detail: toDelTree(item.detail, key)
            }
        } else {
            return item
        }
    })
    return newd
    function getTarget(targets) {
        return targets.filter(item => item.key !== key);
    }
}

//data是wholeweek数据，key是父级的key，work是要输入的工作内容
function addWorkToWhole(data, key, work) {
    return data.map((item) => {
        if (item.key === key) {
            if (item.detail) {
                return {
                    ...item,
                    detail: [
                        ...item.detail,
                        {
                            work: work,
                            done: false,
                            key: Date.now()
                        }
                    ]
                }
            } else {
                return {
                    ...item,
                    detail: [{
                        work: work,
                        done: false,
                        key: Date.now()
                    }]
                }
            }
        } else if (item.detail) {
            return {
                ...item,
                detail: addWorkToWhole(item.detail, key, work)
            }
        } else {
            return item;
        }

    })
}
function addToHalfday(data, time, date, work) {
    console.log(data, time, date, work);
    return data.map(day => {
        if (day.date === date) {
            return time === '上午' ? {
                ...day,
                am: [
                    ...day.am,
                    {
                        work: work,
                        done: false
                    }
                ]
            } : {
                    ...day,
                    pm: [
                        ...day.pm,
                        {
                            work: work,
                            done: false
                        }
                    ]
                }
        } else {
            return day
        }
    })
}
function delHalfday(data, date, time, target) {
    return data.map(day => {
        if (day.date === date) {
            return time === '上午' ? {
                ...day,
                am: day.am.filter((item, index) => index !== target)
            } : {
                    ...day,
                    pm: day.pm.filter((item, index) => index !== target)
                };
        } else {
            return day;
        }
    });
}
function weekendIsDone(data, date, target) {
    return data.map(item => {
        if (item.date === date) {
            return {
                ...item,
                plan: item.plan.map((ele, index) => {
                    if (index === target) {
                        return {
                            ...ele,
                            done: !ele.done
                        }
                    } else {
                        return ele
                    }
                })
            }
        } else {
            return item
        }
    })
}
function addToWeekend(data, target, work) {
    return data.map(item => {
        if (item.date === target) {
            return {
                ...item,
                plan: [
                    ...item.plan,
                    {
                        work: work,
                        done: false
                    }
                ]
            }
        } else {
            return item
        }
    })
}
function delWeekend(data,date,target) {
    return data.map(item => {
        if (item.date === date) {
            return {
                ...item,
                plan: item.plan.filter((ele, index) => 
                    index !== target
                )
            }
        } else {
            return item
        }
    })
}
export {
    doneToKeys,
    dataToTree,
    keysToDone,
    defaultExpandParent,
    weekdaysIsDone,
    toDelTree,
    addWorkToWhole,
    addToHalfday,
    delHalfday,
    weekendIsDone,
    addToWeekend,
    delWeekend
}