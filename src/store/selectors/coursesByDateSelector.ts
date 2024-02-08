import { StateSchema } from '../StateSchema.ts';

export const getCoursesByDate = (state: StateSchema) =>
	state.courses?.coursesData;
