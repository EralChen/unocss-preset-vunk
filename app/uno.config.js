import { defineConfig, presetAttributify, presetWind } from 'unocss'
import { presetGap } from 'unocss-preset-vunk'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind(),
    presetGap({
      prefix: 'g'
    })
  ]
})