<template>
  <a-form
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 4 }"
    style="margin-top: 40vh"
  >
    <a-form-item label="账户">
      <a-input v-model:value="formInline.user">
        <template v-slot:suffix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formInline.pwd" type="password">
        <template v-slot:suffix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 2, offset: 8 }">
      <a-button
        type="primary"
        @click="onSubmit"
        :disabled="formInline.user === '' || formInline.password === ''"
      >
        提交
      </a-button>
    </a-form-item>
  </a-form>
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
    return {
      formInline,
      onSubmit,
    };
  },
};
</script>

<style lang="less">
</style>