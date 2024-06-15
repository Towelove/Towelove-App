import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import type { TabIconState } from './home';

export function Album(state: TabIconState) {
  return (
    <>
      {state.state.focused ? (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <G clip-path="url(#clip0_2047_33885)">
            <Path
              d="M1.5 14.6897L4.71967 10.5941C5.63264 9.43267 7.3791 9.39468 8.34174 10.5153L11.1724 13.8103M8.72793 10.9649C9.94396 9.41813 11.6382 7.22671 11.7485 7.08414C11.7524 7.07904 11.7562 7.07422 11.7601 7.06916C12.6749 5.91529 14.4157 5.87992 15.3762 6.998L18.2069 10.2931M3.84483 18.5H16.1552C17.4502 18.5 18.5 17.4502 18.5 16.1552V3.84483C18.5 2.54981 17.4502 1.5 16.1552 1.5H3.84483C2.54981 1.5 1.5 2.54981 1.5 3.84483V16.1552C1.5 17.4502 2.54981 18.5 3.84483 18.5Z"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_2047_33885">
              <Rect width="20" height="20" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      ) : (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <G clip-path="url(#clip0_2047_33885)">
            <Path
              d="M1.5 14.6897L4.71967 10.5941C5.63264 9.43267 7.3791 9.39468 8.34174 10.5153L11.1724 13.8103M8.72793 10.9649C9.94396 9.41813 11.6382 7.22671 11.7485 7.08414C11.7524 7.07904 11.7562 7.07422 11.7601 7.06916C12.6749 5.91529 14.4157 5.87992 15.3762 6.998L18.2069 10.2931M3.84483 18.5H16.1552C17.4502 18.5 18.5 17.4502 18.5 16.1552V3.84483C18.5 2.54981 17.4502 1.5 16.1552 1.5H3.84483C2.54981 1.5 1.5 2.54981 1.5 3.84483V16.1552C1.5 17.4502 2.54981 18.5 3.84483 18.5Z"
              stroke="#4D5E75"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_2047_33885">
              <Rect width="20" height="20" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      )}
    </>
  );
}
