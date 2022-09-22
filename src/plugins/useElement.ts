import { App } from "vue";
import { ElButton, ElMessage } from "element-plus";
export default {
  install(app: App, options: []) {
    let coms = [ElButton, ElMessage];
    coms.forEach((item) => {
      app.use(item);
    });
  },
};
