import '@mantine/code-highlight/styles.css'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { Route, Routes } from 'react-router-dom'
import 'reactflow/dist/style.css'
import './App.css'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { ReactFlowProvider } from 'reactflow'
import theme, { cssVariableResolver } from 'src/theme.ts'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

function App() {
	return (
		<MantineProvider
			theme={theme}
			defaultColorScheme='dark'
			cssVariablesResolver={cssVariableResolver}
		>
			<Notifications />
			<ReactFlowProvider>
				<ModalsProvider>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/profile' index element={<Profile />} />
					</Routes>
				</ModalsProvider>
			</ReactFlowProvider>
		</MantineProvider>
	)
}

export default App
