--- 
title: Font 字体
lang: zh-CN
---

# Font 字体
```ts
import { defineConfig } from 'unocss'
import { presetFont, presetGap } from 'unocss-preset-vunk'
export default defineConfig({
  presets: [
    // ...
    presetFont({
      // set :root size
      theme: {} // ex. { s: '0.9rem' m: '1rem' l: '1.1rem'  }
    }),
  ]
})
```
## 基础用法

:::demo
font/index
:::

## Font 其他

