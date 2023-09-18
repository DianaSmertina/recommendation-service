import { createSlice } from "@reduxjs/toolkit";
import { IGroup, ITag } from "../types/types";

type SliceState = {
    groups: Array<IGroup>;
    tags: Array<ITag>
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
