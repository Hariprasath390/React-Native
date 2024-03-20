import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const ProfileReducer = createSlice({
  name: "ProfileList",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: async (state, action) => {
      console.log("user");
      await AsyncStorage.getItem("user")
        .then((userString) => {
          const user = JSON.parse(userString);
          state.userInfo = user ?? {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

export const { setUserInfo } = ProfileReducer.actions;

export default ProfileReducer.reducer;
