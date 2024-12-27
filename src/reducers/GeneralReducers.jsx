import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "Pune",
    batch: '',
    trainees: [],
    locations: [],
};

function fetchTraineesState(state, action) {
    state.trainees = action.payload;
}

function fetchLocations(state, action) {
    state.locations = action.payload;
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
        fetchTrainees: fetchTraineesState,
        getLocations : fetchLocations
    }
})

export const { setActiveLocation, fetchCurrentBatch, fetchTrainees, getLocations } = allSlices.actions;
export default allSlices.reducer;