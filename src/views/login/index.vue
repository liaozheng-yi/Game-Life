<template>
  <div id="login">
    <div id="form-wrap">
      <span class="form-item">
        <UserOutlined :style="iconStyle" />
        <input class="input-item" v-model="formInline.user" />
      </span>
      <span class="form-item">
        <LockOutlined class="icon" :style="iconStyle" />
        <input class="input-item" v-model="formInline.pwd" type="password" />
      </span>
    </div>
    <button class="btn green" @click="onSubmit">登录</button>
  </div>
</template>
<script>
import { toLogin } from "@/service/api.js";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { thisYear, thisWeek } from "@/use/dateCalculator.js";

export default {
  components: {
    LockOutlined,
    UserOutlined,
  },
  setup() {
    let formInline = reactive({
      user: "",
      pwd: "",
    });

    let router = useRouter();
    let onSubmit = () => {
      toLogin(formInline).then((res) => {
        if (res.data.state === 1) {
          sessionStorage.setItem("token", res.data.data.token);
          router.push(`/plans?year=${thisYear}&week=${thisWeek}`);
        } else {
          message.error("用户名或密码错误");
        }
      });
    };

    let iconStyle = {
      color: "rgba(185, 231, 105, 1)",
      fontSize: "18px",
    };
    return {
      formInline,
      onSubmit,
      iconStyle,
    };
  },
};
</script>

<style lang="less">
@sao-green:rgba(185, 231, 105, 1);
#login {
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  #form-wrap {
    display: flex;
    flex-direction: column;
    .form-item {
      margin: 2em;
      .input-item {
        margin-left: 2em;
        background: transparent;
        border-style: solid;
        border-color: @sao-green;
        border-radius: 1em;
        outline: none;
        color: @sao-green;
        text-align: center;
        &:focus {
          background: @sao-green;
          border-color: #fff;
          box-shadow: 0 0 8px 8px @sao-green;
          color: black;
        }
      }
    }
  }
}

.btn {
  border: 2px solid;
  width: 6em;
  height: 6em;
  background-color: transparent;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  border-radius: 50%;
  &:hover {
    color: white;
    border: 0;
  }
}

.green {
  color: @sao-green;
  &:hover {
    background-color: @sao-green;
    box-shadow: 0 0 160px 80px @sao-green;
  }
}
// data(){
//   return {
//     formInline:{
//       user: "",
//       pwd: "",
//     }
//   }
// },
// methods:{
//   onSubmit(){
//     // 访问后端
//     toLogin(this.formInline).then((res) => {
//       if (res.data.state === 1) {
//         // console.log('成功了',res.data);
//         sessionStorage.setItem("token", res.data.data.token);
//         //跳转页面的逻辑
//         this.$router.push(`/plans?year=${thisYear}&week=${thisWeek}`)
//       } else {
//         this.$message.error("用户名或密码错误");
//       }
//     });
//   }
// }
</style>


