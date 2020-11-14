<template>
  <header class="header">
    <h1>Weekly-Plan</h1>
    <div class="btn-wrap" ref="btnWrap">
    <router-link class="log-off" to="/" title="休息" ref="btn"/>
    </div>
  </header>
</template>
<script>
import {use3D} from '@/use/use3D.js';
export default {
  name: "Header",
  mounted(){
    use3D(this.$refs.btnWrap,this.$refs.btn.$el)
  },
};
</script>
<style lang="less">
.header {
  height: 8vh;
  background: #96c120;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin-left: 2em;
    color: #393E46;
  }
  .btn-wrap{
    margin:0 2em;
    transform-style: preserve-3d;
    transform: perspective(800px); 
    //perspective指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。 
    //z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。
    .log-off {
      position: relative;
      display: inline-block;
      padding: 2vh 5vh;
      user-select: none;  //页面文字不被选中
      color: white;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(45deg, #dcfb6e, #28abf7);
        border-radius: 6px;
        transition: box-shadow .5s ease, transform .2s ease; 
        box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        transform:
          translateY(var(--ty, 0)) //改变位置，默认为0
          rotateX(var(--rx, 0)) //定义沿着X轴的3D旋转，默认为0
          rotateY(var(--ry, 0)) //定义沿着y轴的3D旋转，默认为0
          translateZ(var(--tz, -12px)); //改变在Z轴的位置，默认为0
      }
      &:hover::before {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
      }
      &::after {
      display: inline-block; //定义为inline-block，否则没有transform属性
      content: attr(title); //获取元素属性的值
      transition: transform .2s ease; 
      font-weight: 500;
      letter-spacing: .2em;
      transform:
        translateY(var(--ty, 0))
        rotateX(var(--rx, 0))
        rotateY(var(--ry, 0));
      }
    }
  }
}
</style>