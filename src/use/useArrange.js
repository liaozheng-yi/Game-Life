import store from "@/store";

let startPos = {};
let content = "";
let box;

function giveBox(which) {
    box = which;
}

function useArrange(instance) {
    instance.addEventListener('mousedown', function (e) {
        if (e.target.nodeName === 'SPAN') {
            content = e.target.innerText;

            //记录最初的位置
            startPos.x = e.clientX;
            startPos.y = e.clientY;

            document.addEventListener('mousemove', move)

            document.addEventListener('mouseup', function (e) {
                console.log('抬起了');
                //隐藏box
                box.style.display = 'none';
                //移除绑定的事件
                document.removeEventListener('mousemove', move)

                let parentNode = e.target.parentNode.attributes;
                //判定落点位置
                if (parentNode.target) {
                    //添加数据
                    let target = parentNode.target.value;
                    let index = parentNode.index.value;
                    store.commit("daysNewWork", {
                        index,
                        target,
                        value: content
                    })
                }
            }, {
                once: true
            })
        }
    })
}
function move(e) {
    //当移动距离超过12的时候
    if (Math.abs(e.clientX - startPos.x) > 12) {
        //把内容给到box
        box.innerText = content;
        //显示box，并把它的位置改变
        box.style.display = 'block';
        box.style.left = (e.clientX + 8) + 'px'; //此行代码是关键！！
        box.style.top = e.clientY + 'px';
    }
    //拖拽的过程中，避免内容选中
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
}
export { useArrange, giveBox };