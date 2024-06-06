import { createSlice } from '@reduxjs/toolkit';

export interface User {
  boyId?: null | number;
  girlId?: null | number;
  coupleId?: null | number | string;
  avatar?: null | string;
  email?: null | string;
  nickName?: null | string;
  sex?: null | string;
  smtpCode?: null | string;
  userName?: null | string;
  [property: string]: any;
}

interface State {
  // token: string
  user: null | User;
}
const initialState: State = {
  // token: '',
  user: null,
};

const customerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    customerLogout: (state) => {
      // state.token = ''
      state.user = null;
    },

    customerLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { customerLogout, customerLogin } = customerSlice.actions;

export default customerSlice.reducer;
