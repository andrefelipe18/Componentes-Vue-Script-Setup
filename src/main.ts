import { createApp } from 'vue'
import App from './App.vue'

//Importa o mitt
import mitt from 'mitt';

//Cria uma instância do mitt
const emitter = mitt();

//Cria uma propriedade global para o mitt
const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app.mount('#app')
