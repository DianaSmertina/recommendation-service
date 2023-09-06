import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
    id: number | null;
    email: string | null;
    isAdmin: false | null;
};

const initialState: SliceState = { id: null, email: null, isAdmin: null };

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
