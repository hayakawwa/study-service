import { StateSchema } from '../StateSchema.ts';

export const getCoursesNames = (state: StateSchema) =>
	state.coursesNames?.names;
