import * as TsxComponents from '~/components/samples'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(TsxComponents).forEach(([componentName, fn]) => {
    nuxtApp.vueApp.component(componentName, fn)
  })
})
