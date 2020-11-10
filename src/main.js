import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,Form,Input,message,Card,Checkbox} from 'ant-design-vue'

const app = createApp(App);

app.config.productionTip = false;
app.config.globalProperties.$message = message;

app.use(Button).use(Form).use(Input).use(Card).use(Checkbox)

app.use(store).use(router).mount('#app')

