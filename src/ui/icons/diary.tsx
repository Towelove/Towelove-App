import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import type { TabIconState } from './home';

export function Diary(state: TabIconState) {
  return (
    <>
      {state.state.focused ? (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <G clip-path="url(#clip0_2047_33888)">
            <Path
              d="M10 2.67241C10 2.67241 8.24138 1.5 5.89655 1.5C3.55172 1.5 1.5 2.67241 1.5 2.67241V18.5C1.5 18.5 3.55172 17.3276 5.89655 17.3276C8.24138 17.3276 10 18.5 10 18.5M10 2.67241C10 2.67241 11.7586 1.5 14.1034 1.5C14.4024 1.5 14.6967 1.51876 14.9828 1.55276M10 2.67241V18.5M10 18.5C10 18.5 11.7586 17.3276 14.1034 17.3276C16.4483 17.3276 18.5 18.5 18.5 18.5V2.67241C18.5 2.67241 16.9383 1.78021 14.9828 1.55276M14.9828 1.55276V6.77586"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_2047_33888">
              <Rect width="20" height="20" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      ) : (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <G clip-path="url(#clip0_2047_33888)">
            <Path
              d="M10 2.67241C10 2.67241 8.24138 1.5 5.89655 1.5C3.55172 1.5 1.5 2.67241 1.5 2.67241V18.5C1.5 18.5 3.55172 17.3276 5.89655 17.3276C8.24138 17.3276 10 18.5 10 18.5M10 2.67241C10 2.67241 11.7586 1.5 14.1034 1.5C14.4024 1.5 14.6967 1.51876 14.9828 1.55276M10 2.67241V18.5M10 18.5C10 18.5 11.7586 17.3276 14.1034 17.3276C16.4483 17.3276 18.5 18.5 18.5 18.5V2.67241C18.5 2.67241 16.9383 1.78021 14.9828 1.55276M14.9828 1.55276V6.77586"
              stroke="#4D5E75"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_2047_33888">
              <Rect width="20" height="20" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      )}
    </>
  );
}
