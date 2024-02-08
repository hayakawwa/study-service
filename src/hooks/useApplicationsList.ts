import { useAppSelector } from './hooks.ts'

export const useApplicationsList = () => useAppSelector((state) => state.applicationList.list);
