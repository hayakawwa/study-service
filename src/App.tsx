import './App.css'
import Calendar from './screens/Calendar/ui/Calendar.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login/ui/Login.tsx'
import Table from './components/DataGridTable/ui/Table.tsx'
import { Path } from './const/path.ts'
import CreateApplication from './screens/CreateApplication/ui/CreateApplication.tsx'
import Home from './screens/Home/ui/Home.tsx'
import { ProtectedRouter } from './components/ProtectedRouter/ProtectedRouter.tsx'
import Header from './components/Header/ui/Header.tsx'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import ApplicationView from './Screens/ApplicationView/ui/ApplicationView.tsx'
import 'dayjs/locale/ru.js'
import { LevelRouter } from './components/AdminRouter/LevelRouter.tsx'
import { Perms } from './consts.ts'
import { History } from './Screens/History/ui/History.tsx'

dayjs.locale('ru')
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route element={<ProtectedRouter />}>
					<Route element={<LevelRouter accessLevel={Perms.Admin} />}>
						<Route path={Path.calendar} element={<Calendar />} />
						<Route path={Path.table} element={<Table />} />
					</Route>
					<Route element={<LevelRouter accessLevel={Perms.Employee} />}>
						<Route path={Path.history} element={<History />} />
					</Route>
					<Route path={Path.home} element={<Home />} />
					<Route path={Path.application} element={<CreateApplication />} />
					<Route path={Path.applications}>
						<Route path={':id'} element={<ApplicationView />} />
					</Route>
				</Route>
				<Route path={Path.login} element={<Login />} />
			</Routes>
		</Router>
	)
}

export default App
