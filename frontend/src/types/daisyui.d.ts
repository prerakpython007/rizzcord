declare module 'daisyui' {
  import { Config } from 'tailwindcss'
  const daisyui: Config['plugins'][number]
  export default daisyui
}
