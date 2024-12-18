import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    location: "Pune",
    batch: null
};

function activeLocation(state, action) {
    state.location = action.payload;
}

function CurrentBatch(state, action) {
    state.batch = action.payload;
};

export const allSlices = createSlice({
    name: 'currentBatch',
    initialState,
    reducers: {
        setActiveLocation: activeLocation,
        fetchCurrentBatch: CurrentBatch
    }
})

export const {setActiveLocation, fetchCurrentBatch} = allSlices.actions;
export default allSlices.reducer;