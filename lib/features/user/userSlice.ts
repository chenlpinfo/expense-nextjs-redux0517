import { createAppSlice } from '@/lib/createAppSlice';
import { IUserData } from '@/src/features/user/data/UserData';

export interface UserSliceState {
  userData: IUserData | undefined;
}

const initialState: UserSliceState = {
  userData: undefined,
};

export const userSlice = createAppSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    setUserData: (sliceState, action) => {
      sliceState.userData = action.payload;
    },
  },
});
export const sliceUserActions = userSlice.actions;

export const selectUserData = (state: any): IUserData => state.userSlice?.userData;

export default userSlice.reducer;
