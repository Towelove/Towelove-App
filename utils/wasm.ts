interface ILib {
  exFunction? : any
  [property: string]: any;
}
export const lib: ILib = {}

WebAssembly.instantiateStreaming(
  fetch(`release.wasm`),
).then(res=>{
  lib.exFunction = res?.instance?.exports
})