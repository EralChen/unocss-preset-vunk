import { NormalObject } from '@vunk/core'
import type { Preset } from 'unocss'

interface Theme {
  xs: string,
  s: string,
  m: string,
  l: string,
  xl: string,
  [s: string]: any
}

const acronym = {
  ml: 'margin-left',
  mr: 'margin-right',
  mt: 'margin-top',
  mb: 'margin-bottom',
  ma: 'margin',

  mtb: [ 'margin-top',  'margin-bottom' ],
  mlr: [ 'margin-left',  'margin-right'],
  

  pl: 'padding-left',
  pr: 'padding-right',
  pt: 'padding-top',
  pb: 'padding-bottom',
  pa: 'padding',

  ptb: [ 'padding-top',  'padding-bottom' ],
  plr: [ 'padding-left',  'padding-right'],

} as const

export function presetGap (config?: {
  varPrefix?: string
  theme?: Partial<Theme> 
}): Preset  {

  const _config = {
    varPrefix: 'gap',
    theme: {},
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
    name: 'unocss-preset-vunk-gap',
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
    variants: [
      matcher => {

        if (!(
          matcher.startsWith('sub-') 
          || matcher.startsWith('sub:')
        )) {
          return matcher
        }
         
        return {
          matcher: matcher.slice(4),
          selector: s => `${s} > * + *`,
        }
      },
    ],
    rules: [
      [
        /^(mt|mb|mr|ml|ma|pt|pb|pr|pl|pa|mtb|mlr|ptb|plr)-(\d?([A-Za-z]|-)+)$/,
        ([, a, w]) => {
          const props = acronym[a]
          const rule = `var(${resolveVar(w)})`
          if (Array.isArray(props)) {
            return props.reduce((a, c) => (a[c] = rule, a) , {} as NormalObject)
          }
          return { 
            [acronym[a]]: rule,
          }
        },
      ],
      [
        /^(mt|mb|mr|ml|ma|pt|pb|pr|pl|pa|mtb|mlr|ptb|plr)-((\d+|-?(?:([1-9]\d*)?\.\d*|0\.\d*[1-9]\d*|0\.0+|0))r?)$/,
        ([, a, d]) => {
          const props = acronym[a]
          const rule = `${d}em`
          if (Array.isArray(props)) {
            return props.reduce((a, c) => (a[c] = rule, a) , {} as NormalObject)
          }
          return { 
            [props]: rule,
          }
        },
      ],
    ],
  } 
}