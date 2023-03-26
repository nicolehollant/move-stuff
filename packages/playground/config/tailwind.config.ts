import type { Config } from 'tailwindcss'
import { default as chromatikaColors } from '@chromatika/tailwind-palette'

const colorSamplePoints = Object.fromEntries(
  Array.from({ length: 90 }).map((_, i) => [i * 10, i * 10])
)
const themeFromSamplePoints = Object.fromEntries(
  Object.entries(chromatikaColors).map(([colorKey, colorScale]) => {
    return [
      colorKey,
      Object.fromEntries(
        Object.values(colorSamplePoints).map((value) => [value, colorScale.at(value).hex])
      ),
    ]
  })
)

export default <Partial<Config>>{
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: themeFromSamplePoints,
    },
  },
}
