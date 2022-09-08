import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetFont, presetGap } from 'unocss-preset-vunk'
export default defineConfig({
  presets: [
    presetUno(), 
    presetAttributify(), 
    presetIcons(),

    presetFont(),
    presetGap(),
  ],
  include: [`${__dirname}/**/*`],
  exclude: [`${__dirname}/node_modules/**/*`],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#2563eb',
        deep: '#1d4ed8',
      },
    },
  },
})
