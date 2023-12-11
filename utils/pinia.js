import * as Pinia from 'pinia'
//官方文档 https://allen-1998.github.io/pinia-plugin-persist-uni/
import persist from 'pinia-plugin-persist-uni'
const pinia=Pinia.createPinia();
pinia.use(persist)
export default pinia;