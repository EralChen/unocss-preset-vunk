import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetFont, presetGap, presetFlex } from 'unocss-preset-vunk'
export default defineConfig({
  presets: [
    presetUno(), 
    presetAttributify(), 
    presetIcons(),

    presetFont({
      theme: {
        xxxs: '2rem',
        xxxl: '1rem',
        '5xl': '4rem',
      },
    }),
    presetGap(),
    presetFlex({
      prefix: 'sk',
    }),
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
