import type { App } from 'vue';

interface PluginContext {
  app: App;
}

export type AppPlugin = (context: PluginContext) => void;
