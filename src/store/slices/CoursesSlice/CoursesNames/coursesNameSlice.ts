import { createSlice } from '@reduxjs/toolkit';
import { coursesApi } from '../../../../services/coursesApi.ts';
import { CoursesNamesSchema } from './coursesNameSchema.ts';

const initialState: CoursesNamesSchema = {
	names: []
};

export const coursesNameSlice = createSlice({
	name: 'coursesName',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			coursesApi.endpoints.coursesNames.matchFulfilled,
			(state, action) => {
				state.names = action.payload.response;
			}
		);
	}
});

export const { actions: coursesNamesActions } = coursesNameSlice;
export const { reducer: coursesNamesReducer } = coursesNameSlice;
