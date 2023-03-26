export const AccentSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <label class="flex items-center gap-2 w-full">
    <input type="checkbox" class="w-10 h-10" checked />
    <p class="text-xs font-mono font-semibold">{props.text}</p>
  </label>
))

export const BackgroundSample = defineTsxComponent(
  {
    text: TsxProp as string,
    textColor: TsxProp as 'dark' | 'light',
  },
  (props) => (
    <div
      class={
        'w-full h-16 md:h-40 text-xs font-mono font-semibold flex items-end p-2 rounded-lg ' +
        (props.textColor === 'dark' ? 'text-black' : 'text-white')
      }
    >
      {props.text}
    </div>
  )
)

export const BackgroundSampleSmall = defineTsxComponent(
  {
    text: TsxProp as string,
    textColor: TsxProp as 'dark' | 'light',
  },
  (props) => (
    <div
      class={
        'w-20 h-20 text-xs font-mono font-semibold flex items-end p-1 border border-black/10 border-dashed ' +
        (props.textColor === 'dark' ? 'text-black' : 'text-white')
      }
    >
      {props.text}
    </div>
  )
)

export const TextDecorationSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <p class="text-sm place-self-center text-neutral-400 underline decoration-4 font-mono font-bold w-full p-4 bg-neutral-900/25 text-center rounded-lg">
    {props.text}
  </p>
))

export const TextSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <p class="text-sm font-mono font-bold w-full p-4 bg-neutral-900/25 text-center rounded-lg">
    {props.text}
  </p>
))

export const RingOffsetSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <div
    class={
      'w-full h-16 md:h-40 ring ring-neutral-700 ring-offset-4 text-xs font-mono font-semibold flex items-end p-2 rounded-lg '
    }
  >
    {props.text}
  </div>
))

export const RingSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <div
    class={
      'w-full h-16 md:h-40 ring-4 text-xs font-mono font-semibold flex items-end p-2 rounded-lg '
    }
  >
    {props.text}
  </div>
))

export const PlaceholderSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <label class="flex items-center gap-2 w-full">
    <input
      type="text"
      placeholder="text..."
      class={'w-16 h-10 outline outline-2 outline-neutral-500 px-2 bg-black ' + props.text}
    />
    <p class="text-xs font-mono font-semibold">{props.text}</p>
  </label>
))

export const OutlineSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <div
    class={
      'w-full h-16 md:h-40 outline outline-4 text-xs font-mono font-semibold flex items-end p-2 rounded-lg '
    }
  >
    {props.text}
  </div>
))

export const DivideSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <div class="grid grid-rows-3 w-full h-24 md:h-48 divide-y-4 border border-neutral-800">
    <div class="w-full h-full flex items-center justify-center text-neutral-600">1</div>
    <div class="w-full h-full flex items-center justify-center text-neutral-600">2</div>
    <p class="w-full h-full flex items-center justify-center text-xs font-mono font-semibold">
      {props.text}
    </p>
  </div>
))

export const CaretSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <label class="flex items-center gap-2 w-full">
    <input type="text" class={'w-16 h-10 outline outline-2 outline-neutral-500 px-2 bg-black'} />
    <p class="text-xs font-mono font-semibold">{props.text}</p>
  </label>
))

export const BoxShadowSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <div class={'w-full h-16 md:h-40 text-xs font-mono font-semibold flex items-end p-2 rounded-lg '}>
    {props.text}
  </div>
))

export const BorderSample = defineTsxComponent({ text: TsxProp as string }, (props) => (
  <div class={'w-full h-16 md:h-40 text-xs font-mono font-semibold flex items-end p-2 rounded-lg '}>
    {props.text}
  </div>
))

export const Example = defineTsxComponent<{ textColor: 'dark' | 'light' }>(
  ['textColor'],
  (props, ctx) => (
    <div
      class={
        'w-full h-16 md:h-40 text-xs font-mono font-semibold flex items-end p-2 rounded-lg ' +
        (props.textColor === 'dark' ? 'text-black' : 'text-white')
      }
    >
      {props.textColor}
      <div>{ctx.slots.default?.()}</div>
    </div>
  )
)
