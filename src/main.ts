import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import useElement from "@/plugins/useElement";
import router from "@/router";
import useMarkdown from "./plugins/useMarkdown";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(useElement);
app.use(useMarkdown);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
