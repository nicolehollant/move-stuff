const { createHSLScale } = require('@chromatika/core')

const fs = require('fs')
// const chromatikaColors = require('@chromatika/tailwind-palette')

const chromatikaColors = {
  blue: createHSLScale({
    hue: [
      { shade: 50, hue: 214 },
      { shade: 100, hue: 214 },
      { shade: 200, hue: 213 },
      { shade: 300, hue: 212 },
      { shade: 400, hue: 213 },
      { shade: 500, hue: 217 },
      { shade: 600, hue: 221 },
      { shade: 700, hue: 224 },
      { shade: 800, hue: 226 },
      { shade: 900, hue: 224 },
    ],
    saturation: [
      { shade: 50, saturation: 100 },
      { shade: 100, saturation: 95 },
      { shade: 200, saturation: 97 },
      { shade: 300, saturation: 96 },
      { shade: 400, saturation: 94 },
      { shade: 500, saturation: 91 },
      { shade: 600, saturation: 83 },
      { shade: 700, saturation: 76 },
      { shade: 800, saturation: 71 },
      { shade: 900, saturation: 64 },
    ],
    lightness: [
      { shade: 50, lightness: 97 },
      { shade: 100, lightness: 93 },
      { shade: 200, lightness: 87 },
      { shade: 300, lightness: 78 },
      { shade: 400, lightness: 68 },
      { shade: 500, lightness: 60 },
      { shade: 600, lightness: 53 },
      { shade: 700, lightness: 48 },
      { shade: 800, lightness: 40 },
      { shade: 900, lightness: 33 },
    ],
  }),
}

// const samplePoints = [25, 150, 250, 350, 450, 550, 650, 750, 850]
const samplePoints = Array.from({ length: 900 }).map((_, i) => i + 1)

const bg = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `bg-${color}-[${point}]`
    const textColor = scale.at(point).relativeLuminance > 0.6 ? 'dark' : 'light'
    return `<BackgroundSample class="${classname}" text="${classname}" textColor="${textColor}" />`
  })
  return `<SampleRow title="bg-${color}">${samples.join('')}</SampleRow>`
})

const accent = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `accent-${color}-[${point}]`
    return `<AccentSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="accent-${color}">${samples.join('')}</SampleRow>`
})

const border = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `border-${color}-[${point}]`
    return `<BorderSample class="border-4 border-dashed ${classname}" text="${classname}" />`
  })
  return `<SampleRow title="border-${color}">${samples.join('')}</SampleRow>`
})

const boxShadow = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `shadow-${color}-[${point}]`
    return `<BoxShadowSample class="shadow-lg ${classname}" text="${classname}" />`
  })
  return `<SampleRow title="shadow-${color}">${samples.join('')}</SampleRow>`
})

const caret = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `caret-${color}-[${point}]`
    const bgColor = scale.at(point).relativeLuminance > 0.6 ? 'dark' : 'light'
    return `<CaretSample class="${classname} outline-${color}-[${point}] [&_input:focus]:outline-${color}-[${point}]" text="${classname}" bgColor="${bgColor}" />`
  })
  return `<SampleRow title="caret-${color}">${samples.join('')}</SampleRow>`
})

const divide = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `divide-${color}-[${point}]`
    return `<DivideSample class="${classname} " text="${classname}" />`
  })
  return `<SampleRow title="divide-${color}">${samples.join('')}</SampleRow>`
})

const outline = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `outline-${color}-[${point}]`
    return `<OutlineSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="outline-${color}">${samples.join('')}</SampleRow>`
})

const placeholder = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `placeholder-${color}-[${point}]`
    return `<PlaceholderSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="placeholder-${color}">${samples.join('')}</SampleRow>`
})
const ring = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `ring-${color}-[${point}]`
    return `<RingSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="ring-${color}">${samples.join('')}</SampleRow>`
})
const ringOffset = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `ring-offset-${color}-[${point}]`
    return `<RingOffsetSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="ring-offset-${color}">${samples.join('')}</SampleRow>`
})
const text = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `text-${color}-[${point}]`
    return `<TextSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="text-${color}">${samples.join('')}</SampleRow>`
})
const textDecoration = Object.entries(chromatikaColors).map(([color, scale]) => {
  const samples = samplePoints.map((point) => {
    const classname = `decoration-${color}-[${point}]`
    return `<TextDecorationSample class="${classname}" text="${classname}" />`
  })
  return `<SampleRow title="decoration-${color}">${samples.join('')}</SampleRow>`
})

const writeFile = (fname, label, samples) => {
  const contents = `<template>
  <SampleHeader label="${label}" />
  ${samples.flat().join('\n')}
</template>
`
  fs.writeFileSync(`./out/${fname}.vue`, contents)
}

const writeFiles = () => {
  writeFile('background', 'Background Color Samples', bg)
  // writeFile('accent', 'Accent Color Samples', accent)
  // writeFile('border', 'Border Color Samples', border)
  // writeFile('box-shadow', 'Box Shadow Color Samples', boxShadow)
  // writeFile('caret', 'Caret Color Samples', caret)
  // writeFile('divide', 'Divide Color Samples', divide)
  // writeFile('outline', 'Outline Color Samples', outline)
  // writeFile('placeholder', 'Placeholder Color Samples', placeholder)
  // writeFile('ring', 'Ring Color Samples', ring)
  // writeFile('ring-offset', 'Ring Offset Color Samples', ringOffset)
  // writeFile('text', 'Text Color Samples', text)
  // writeFile('decoration', 'Text Decoration Color Samples', textDecoration)
}

writeFiles()
