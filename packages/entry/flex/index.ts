import type { Preset } from 'unocss'

const directionAcronym = {
  col: 'column',
  colr: 'column-reverse',
  row: 'row',
  rowr: 'row-reverse',
}
const justifyAcronym = {
  center: 'center',
  start: 'flex-start',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  end: 'flex-end',
}
const alignAcronym = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  baseline: 'baseline',
}

// vk-flex-row-between-center
export function presetFlex (config?: {
  prefix? : string
}): Preset  {
  const _config = {
    prefix: config?.prefix || 'vk',
  }
  const direction = Reflect.ownKeys(directionAcronym).join('|')
  const justify = Reflect.ownKeys(justifyAcronym).join('|')
  const align = Reflect.ownKeys(alignAcronym).join('|')

  const reg3 = new RegExp(
    `^${_config.prefix}-flex-(${direction})-(${justify})-(${align})$`,
  )

  const reg2a = new RegExp(
    `^${_config.prefix}-flex-(${direction})-(${justify})$`,
  )
  const reg2b = new RegExp(
    `^${_config.prefix}-flex-(${direction})_(${align})$`,
  )
  const reg2c = new RegExp(
    `^${_config.prefix}-flex-(${direction})-(${justify})2$`,
  )
  
  const reg1 = new RegExp(
    `^${_config.prefix}-flex-(${direction})$`,
  )

  return {
    name: 'unocss-preset-vunk-flex',
    
    rules: [
      [
        `${_config.prefix}-flex`, {
          display: 'flex',
        },
      ],

      [
        reg1,
        ([_, d]) => {
          return {
            display: 'flex',
            'flex-direction': directionAcronym[d],
          }
        },
      ],

      [
        reg2a,
        ([_, d, j]) => {
          return {
            display: 'flex',
            'justify-content': justifyAcronym[j],
            'flex-direction': directionAcronym[d],
          }
        },
      ],

      [
        reg2b,
        ([_, d, a]) => {
          return {
            display: 'flex',
            'align-items': alignAcronym[a],
            'flex-direction': directionAcronym[d],
          }
        },
      ],
  

      [
        reg2c,
        ([_, d, j]) => {
          return {
            display: 'flex',
            'align-items': alignAcronym[j],
            'flex-direction': directionAcronym[d],
            'justify-content': justifyAcronym[j],
          }
        },
      ],

      [
        reg3,
        ([_, d, j, a]) => {
          return {
            display: 'flex',
            'flex-direction': directionAcronym[d],
            'justify-content': justifyAcronym[j],
            'align-items': alignAcronym[a],
          }
        },
      ],
      
    ],
  } 
}