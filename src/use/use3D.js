export function use3D(dad,child){
    let dadStyle = dad.style;
    let son = child;
    
    //获取元素的长度height、宽度width、各边框相对于顶部、左侧的视口距离：
    //boundingClientRect={x,y,height,width,left,right,top,bottom}
    //left=x, right=x+width, top=y, bottom=y+height
    son.onmousemove = function(e) {
        let boundingClientRect = son.getBoundingClientRect()
        //获取鼠标位置在元素内的相对位置
        const x = e.clientX - boundingClientRect.left
        const y = e.clientY - boundingClientRect.top
        //获取元素宽高的一半
        const xc = boundingClientRect.width/2
        const yc = boundingClientRect.height/2
        //获取鼠标相对于元素中心的位置
        const dx = x - xc
        const dy = y - yc
        
        //定义css变量的值
        dadStyle.setProperty('--rx', `${ dy/-0.5 }deg`)
        dadStyle.setProperty('--ry', `${ dx/1 }deg`)
    }

        //鼠标离开时恢复原样
    son.onmouseleave = function() {
        dadStyle.setProperty('--ty', '0')
        dadStyle.setProperty('--rx', '0')
        dadStyle.setProperty('--ry', '0')
    }

        //按钮被点击的效果
    son.onmousedown = function() {
        dadStyle.setProperty('--tz', '-25px')
    }

        //按钮被松开的效果
    son.onmouseup = function() {
        dadStyle.setProperty('--tz', '-12px')
    }
}

