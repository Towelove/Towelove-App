import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BlueLove = (props: SvgProps) => (
  <Svg
    width={13}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#77B9FF"
      stroke="#F4FDFF"
      d="M6.5 11c-.156 0-.382-.121-.58-.248C2.93 8.855 1 6.62 1 4.363 1 2.371 2.409 1 4.145 1c1.08 0 1.882.59 2.355 1.45C6.978 1.585 7.78 1 8.86 1 10.591 1 12 2.37 12 4.363c0 2.256-1.93 4.492-4.914 6.39-.199.126-.43.247-.586.247Z"
    />
  </Svg>
)
export default BlueLove
