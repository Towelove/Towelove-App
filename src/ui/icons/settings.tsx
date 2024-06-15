import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { TabIconState } from './home';

export function Setting(state: TabIconState) {
  return (
    <>
      {state.state.focused ? (
        <Svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.34562 2.09111C9.34731 1.52562 10.57 1.52562 11.5717 2.09111C11.5792 2.09535 11.5867 2.09971 11.594 2.10419L16.7504 5.23114C17.7679 5.81128 18.3337 6.85949 18.3337 7.99686V13.7551C18.3337 14.8549 17.7963 15.9322 16.82 16.4445L11.6774 19.5631C11.67 19.5676 11.6625 19.572 11.655 19.5762C10.6533 20.1417 9.43064 20.1417 8.42896 19.5762C8.42144 19.572 8.41399 19.5676 8.40661 19.5631L3.25019 16.4362C2.23269 15.856 1.66699 14.8078 1.66699 13.6705V7.99686C1.66699 6.86054 2.23166 5.81321 3.2474 5.23274L8.31815 2.10732C8.3272 2.10174 8.33636 2.09634 8.34562 2.09111ZM9.16753 3.56461L4.09917 6.68856C4.09011 6.69414 4.08095 6.69954 4.07169 6.70477C3.59681 6.97286 3.33366 7.44512 3.33366 7.99686V13.6705C3.33366 14.2222 3.59681 14.6945 4.07169 14.9626C4.07921 14.9668 4.08666 14.9712 4.09404 14.9756L9.24852 18.1014C9.74157 18.3752 10.3424 18.3751 10.8355 18.1014L15.9899 14.9756C16.0077 14.9649 16.0258 14.9548 16.0443 14.9454C16.3822 14.7737 16.667 14.3377 16.667 13.7551V7.99686C16.667 7.44512 16.4038 6.97286 15.929 6.70477C15.9214 6.70053 15.914 6.69617 15.9066 6.69169L10.7521 3.56591C10.2599 3.2926 9.66014 3.29217 9.16753 3.56461ZM10.0003 9.09771C9.03382 9.09771 8.25032 9.89388 8.25032 10.876C8.25032 11.8581 9.03382 12.6543 10.0003 12.6543C10.9668 12.6543 11.7503 11.8581 11.7503 10.876C11.7503 9.89388 10.9668 9.09771 10.0003 9.09771ZM6.58365 10.876C6.58365 8.95852 8.11335 7.4041 10.0003 7.4041C11.8873 7.4041 13.417 8.95852 13.417 10.876C13.417 12.7935 11.8873 14.3479 10.0003 14.3479C8.11335 14.3479 6.58365 12.7935 6.58365 10.876Z"
            fill="#000000"
          />
        </Svg>
      ) : (
        <Svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.34562 2.09111C9.34731 1.52562 10.57 1.52562 11.5717 2.09111C11.5792 2.09535 11.5867 2.09971 11.594 2.10419L16.7504 5.23114C17.7679 5.81128 18.3337 6.85949 18.3337 7.99686V13.7551C18.3337 14.8549 17.7963 15.9322 16.82 16.4445L11.6774 19.5631C11.67 19.5676 11.6625 19.572 11.655 19.5762C10.6533 20.1417 9.43064 20.1417 8.42896 19.5762C8.42144 19.572 8.41399 19.5676 8.40661 19.5631L3.25019 16.4362C2.23269 15.856 1.66699 14.8078 1.66699 13.6705V7.99686C1.66699 6.86054 2.23166 5.81321 3.2474 5.23274L8.31815 2.10732C8.3272 2.10174 8.33636 2.09634 8.34562 2.09111ZM9.16753 3.56461L4.09917 6.68856C4.09011 6.69414 4.08095 6.69954 4.07169 6.70477C3.59681 6.97286 3.33366 7.44512 3.33366 7.99686V13.6705C3.33366 14.2222 3.59681 14.6945 4.07169 14.9626C4.07921 14.9668 4.08666 14.9712 4.09404 14.9756L9.24852 18.1014C9.74157 18.3752 10.3424 18.3751 10.8355 18.1014L15.9899 14.9756C16.0077 14.9649 16.0258 14.9548 16.0443 14.9454C16.3822 14.7737 16.667 14.3377 16.667 13.7551V7.99686C16.667 7.44512 16.4038 6.97286 15.929 6.70477C15.9214 6.70053 15.914 6.69617 15.9066 6.69169L10.7521 3.56591C10.2599 3.2926 9.66014 3.29217 9.16753 3.56461ZM10.0003 9.09771C9.03382 9.09771 8.25032 9.89388 8.25032 10.876C8.25032 11.8581 9.03382 12.6543 10.0003 12.6543C10.9668 12.6543 11.7503 11.8581 11.7503 10.876C11.7503 9.89388 10.9668 9.09771 10.0003 9.09771ZM6.58365 10.876C6.58365 8.95852 8.11335 7.4041 10.0003 7.4041C11.8873 7.4041 13.417 8.95852 13.417 10.876C13.417 12.7935 11.8873 14.3479 10.0003 14.3479C8.11335 14.3479 6.58365 12.7935 6.58365 10.876Z"
            fill="#4D5E75"
          />
        </Svg>
      )}
    </>
  );
}
