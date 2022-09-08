--- 
title: Gap 间距
lang: zh-CN
---

# Gap 间距
```ts
import { defineConfig } from 'unocss'
import { presetFont, presetGap } from 'unocss-preset-vunk'
export default defineConfig({
  presets: [
    // ...
    presetFont({
      // set :root size
      theme: {} // ex. { s: '0.9rem' m: '1rem' l: '1.1rem'  }

      // --${varPrefix}-${theme} will be set in :root
      varPrefix: 'gap' // default 
    }),
  ]
})

```
## 基础用法
:::demo
gap/index
:::
## Gap 其他

