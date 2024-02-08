import { AuthSchema } from '../screens/Login/model/types/authSchema.ts';
import { ApplicationSchema } from '../screens/CreateApplication/model/types/applicationSchema.ts';
import { IApplicationListResponseItem } from '../screens/Home/types/ApplicationList.types.ts';
import { CoursesNamesSchema } from './slices/CoursesSlice/CoursesNames/coursesNameSchema.ts';
import { IUserProfile } from '../types/userTypes.ts';
import { CoursesSchema } from './slices/CoursesSlice/coursesSchema.ts';

export interface StateSchema {
	auth: AuthSchema;
	application: ApplicationSchema;
	applicationList: IApplicationListResponseItem[];
	usersList: IUserProfile[];
	coursesNames: CoursesNamesSchema;
	courses: CoursesSchema;
}
