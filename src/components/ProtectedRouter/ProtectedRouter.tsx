import { useEffect } from 'react';
import { useCurrentMutation } from '../../services/authApi.ts';
import { Outlet, Navigate } from 'react-router-dom';
import { Path } from '../../const/path.ts';
import { useGetApplicationListMutation, useGetUserApplicationListMutation } from '../../services/applicationApi.ts'
import { useCoursesNamesMutation, useCoursesByDateMutation } from '../../services/coursesApi.ts';
import { usePerms, useUserEmail } from '../../hooks/authHooks.ts'
import { Perms } from '../../consts.ts'

export const ProtectedRouter = () => {
	const [getCoursesNames] = useCoursesNamesMutation();
	const [currentUser] = useCurrentMutation();
	const [getApplicationList] = useGetApplicationListMutation();
  const [getCoursesByDate] = useCoursesByDateMutation();
  const [getUserApplicationList] = useGetUserApplicationListMutation();
  
	const firstDayOfMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		1
	);
	const lastDayOfMonth = new Date(
		new Date().getFullYear(),
		new Date().getMonth() + 1,
		0
	);

	const date_from = firstDayOfMonth.toISOString().slice(0, 10);
	const date_to = lastDayOfMonth.toISOString().slice(0, 10);
	
	const token = localStorage.getItem('access_token');
	const accessLevel = usePerms();
	const userEmail = useUserEmail();

	const getApplicationListBody = {
		access_token: token,
		limit: 100
	};

	useEffect(() => {
		token && currentUser({ access_token: token });
    getApplicationList({
			access_token: token,
			limit: 100
		});
		getCoursesNames({ like: '', access_token: token });
		getCoursesByDate({ date_from, date_to, access_token: token });
	}, []);

	useEffect(() => {
		accessLevel === Perms.Admin
			? getApplicationList(getApplicationListBody)
			: getUserApplicationList({
				...getApplicationListBody,
				student_email: userEmail,
			})
	}, [accessLevel, userEmail])

	return token ? <Outlet /> : <Navigate to={Path.login} />;
};
