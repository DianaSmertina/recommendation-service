import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
    groups: Array<{id: number, name: string}>
};

const initialState: SliceState = { groups: [] };

export const reviewGroupsSlice = createSlice({
    name: "reviewGroups",
    initialState,
    reducers: {
        setGroups(state, action) {
            state.groups = action.payload;
        },
    },
});

export const { setGroups } = reviewGroupsSlice.actions;
export default reviewGroupsSlice.reducer;
