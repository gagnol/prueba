import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  _id: number;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
  address: string;
  city: string;
  postal: string;
  country: string;
}

interface Plan {
  name: string;
  price: number;
}

interface State {
  userInfo: UserInfo | null;
  selectedPlan: Plan | null;
}

const initialState: State = {
  userInfo: null,
  selectedPlan: null,
};

export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    selectPlan: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const { addUser, removeUser, selectPlan } = nextSlice.actions;
export default nextSlice.reducer;
