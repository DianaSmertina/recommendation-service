import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
   email: string | null;
};

const initialState: SliceState = { email: null };

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser(state, action: { payload: string; type: string }) {
            state.email = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
