import type { Preset } from 'unocss'
interface Theme {
  xs: string,
  s: string,
  m: string,
  l: string,
  xl: string,
}

export function presetFont<T extends Partial<Theme>> (config?: {
  varPrefix?: string
  theme?: T
}): Preset<T>  {
  const _config = {
    varPrefix: 'f',
    theme: {} as T,
    ...config || {},
  }
  function resolveVar (name: string) {
    const prefix = _config.varPrefix
    return `--${prefix ? `${prefix}-` : ''}${name}`
  }
  const theme = {
    xs: '.8rem',
    s: '.9rem',
    m: '1rem',
    l: '1.1rem',
    xl: '1.2rem',
    ..._config.theme,
  }
  return {
    name: 'unocss-preset-vunk-font',
    theme, 
    preflights: [
      {
        getCSS () {
          let ruleStr = ''
          for (const key in theme) {
            if (Object.prototype.hasOwnProperty.call(theme, key)) {
              ruleStr += resolveVar(key) + ':' + theme[key] + ';'
            }
          }
          return `:root{
            ${ruleStr}
          }`
        },
      },
    ],
    rules: [
      [
        /^f-([A-Za-z]+)$/,
        ([, w]) => {
          return { 
            'font-size': `var(${resolveVar(w)})`,
          }
        },
      ],
      
      [
        /^f-((\d+|-?(?:([1-9]\d*)?\.\d*|0\.\d*[1-9]\d*|0\.0+|0))r?)$/,
        ([, d]) => {
          return { 
            'font-size': `${d}em`,
          }
        },
      ],
    ],
  } 
}