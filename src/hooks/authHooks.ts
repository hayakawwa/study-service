import { useAppSelector } from './hooks.ts'

export const usePerms = () => useAppSelector(state => state.auth.authData?.perms);

export const useUserEmail = () => useAppSelector(state => state.auth.authData?.email);