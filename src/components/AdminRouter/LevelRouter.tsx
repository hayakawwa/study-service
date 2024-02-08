import { usePerms } from '../../hooks/authHooks.ts';
import { Outlet, useNavigate } from 'react-router-dom'
import { Path } from '../../const/path.ts';
import { Perms } from '../../consts.ts';
import { FC, useEffect } from 'react'

export const LevelRouter: FC<{accessLevel: Perms}> = ({accessLevel}) => {
	const navigate = useNavigate();
	const currentLevel = usePerms();

	useEffect(() => {
		if (currentLevel !== accessLevel) {
			navigate(Path.home);
			return;
		}
	}, []);

	return <Outlet />
};