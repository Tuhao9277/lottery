import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  rules: [
    ['bg-full', { 'background-size': '100% 100%' }],
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    [/^p-safe-t-(\d+)$/, ([, d]) => ({ 'padding-top': `calc(${d}px + env(safe-area-inset-top))` })],
    [/^p-safe-b-(\d+)$/, ([, d]) => ({ 'padding-bottom': `calc(${d}px + env(safe-area-inset-bottom))` })],
    [/^safe-b-(\d+)$/, ([, d]) => ({ bottom: `calc(${d}px + env(safe-area-inset-bottom))` })],
    [
      /^w-h-(\d+)(px)?(?:-(\d+)(px)?)?$/,
      ([, w, wUnit, h, hUnit]) => {
        const width = w + (wUnit || 'px')
        const height = h ? h + (hUnit || 'px') : width
        return { width, height }
      },
    ],
    [
      /^circle-(\w+)$/,
      ([, d]) => {
        const len = d.includes('px') ? d : `${d}px`
        return { 'width': len, 'height': len, 'border-radius': '50%' }
      },
    ],
    [
      /^border-(\d+)-#([\da-fA-F]{3,8})$/,
      ([, width, color]) => ({
        'border-style': 'solid',
        'border-width': `${width}px`,
        'border-color': `#${color}`,
      }),
    ],
    [
      'absolute-center',
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    ],
    [/^bg-image-[\w+]$/, ([, url]) => ({ 'background': `url(${url}) center no-repeat`, 'background-size': '100% 100%' })],
    ['flex-center', { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-direction': 'row' }],
    [
      'flex-between',
      { 'display': 'flex', 'justify-content': 'space-between', 'align-items': 'center', 'flex-direction': 'row' },
    ],
    [
      'border-thins-line',
      {
        'background-color': '#e8e8e8',
        'bottom': 0,
        'content': '',
        'display': 'block',
        'height': '1px',
        'left': 0,
        'position': 'absolute',
        'transform': 'scaleY(.5)',
        'transform-origin': '50% 0',
        'width': '100%',
      },
    ],
    [
      /^border-rd-(top|bottom)-(left|right)-(\d+)(px)?$/,
      ([, vertical, horizontal, size]) => {
        const radius = `${size}${'px'}`
        return {
          [`border-${vertical}-${horizontal}-radius`]: radius,
        }
      },
    ],
    [
      'touch-none',
      {
        'touch-action': 'none',
        '-moz-user-select': 'none',
        '-webkit-user-drag': 'none',
        'user-select': 'none',
      },
    ],
  ],
  presets: [presetUno()],
  shortcuts: {
    'center': 'justify-center items-center',
    'full': 'h-full w-full',
    'bgContain': 'bg-contain bg-no-repeat bg-center box-border',
    'bgCover': 'bg-cover bg-no-repeat bg-center box-border',
    'flex-start': 'flex justify-start items-center flex-row',
    'flex-start-col': 'flex justify-start items-center flex-col',
    'flex-center': 'flex center flex-row',
    'flex-center-col': 'flex center flex-col',
    'flex-between': 'flex justify-between items-center flex-row',
    'flex-between-col': 'flex justify-between items-center flex-col',
    'flex-end': 'flex justify-end items-center flex-row',
    'flex-end-col': 'flex justify-end items-center flex-col',
    'flex-around': 'flex justify-around items-center flex-row',
    'flex-around-col': 'flex justify-around items-center flex-col',
    'inset-0': 'top-0 left-0 right-0 bottom-0',
  },
})
