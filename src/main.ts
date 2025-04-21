import './assets/styles/main.scss';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Install all plugins inside the `plugins` folder
Object.values(import.meta.glob('./plugins/*.ts', { eager: true })).map((plugin: any) => {
  return plugin.install?.({ app });
});

app.mount('#app');
