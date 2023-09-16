import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
    groups: Array<{id: number, name: string}>;
    tags: Array<{tag_id: number, tag: string}>
};

const initialState: SliceState = { groups: [], tags: [] };

export const reviewSlice = createSlice({
    name: "reviewGroups",
    initialState,
    reducers: {
        setGroups(state, action) {
            state.groups = action.payload;
        },
        setTags(state, action) {
            state.tags = action.payload;
        }
    },
});

export const { setGroups, setTags } = reviewSlice.actions;
export default reviewSlice.reducer;
