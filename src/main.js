import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Account from "./components/Account.vue";
import Watch from "./components/Watch.vue";
import Videos from "./components/Videos.vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/account",
        component: Account
    },
    {
        path: "/watch",
        component: Watch
    },
    {
        path: "/videos",
        component: Videos
    }
];
const router = new VueRouter({
    routes
});
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
