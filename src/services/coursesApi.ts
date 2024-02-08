import { api } from './api.ts';
import { Courses } from '../store/slices/CoursesSlice/coursesSchema.ts';

interface GetCoursesNamesResponse {
	response: string[];
}

interface GetCoursesNamesArg {
	access_token: string | null;
	like?: string;
}

interface CoursesByDateResponse {
	success: boolean;
	response: Courses[];
}

interface CoursesByDateArg {
	access_token: string | null;
	date_from: string;
	date_to: string;
	limit?: number;
	page?: number;
}

export const coursesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		coursesNames: builder.mutation<GetCoursesNamesResponse, GetCoursesNamesArg>(
			{
				query: (args) => ({
					url: '/api/courses/names',
					method: 'POST',
					body: args
				})
			}
		),
		coursesByDate: builder.mutation<CoursesByDateResponse, CoursesByDateArg>({
			query: (args) => ({
				url: '/api/applications/date',
				method: 'POST',
				body: args
			})
		})
	})
});

export const { useCoursesNamesMutation, useCoursesByDateMutation } = coursesApi;
export const {
	endpoints: { coursesNames, coursesByDate }
} = coursesApi;
