import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
    '@storybook/addon-vitest',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    };
    config.plugins = [...(config.plugins || []), svgr()];
    return config;
  },
};

export default config;
