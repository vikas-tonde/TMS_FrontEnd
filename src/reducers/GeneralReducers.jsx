import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "Pune",
    batch: '',
    trainees: []
};

function fetchTraineesState(state, action) {
    state.trainees = action.payload;
}

function activeLocation(state, action) {
    state.location = action.payload;
}

function currentBatch(state, action) {
    state.batch = action.payload;
};


export const allSlices = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActiveLocation: activeLocation,
        fetchCurrentBatch: currentBatch,
        fetchTrainees: fetchTraineesState
    }
})

export const { setActiveLocation, fetchCurrentBatch, fetchTrainees } = allSlices.actions;
export default allSlices.reducer;