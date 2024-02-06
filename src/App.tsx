import '@mantine/code-highlight/styles.css'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'reactflow/dist/style.css'
import './App.css'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ReactFlowProvider } from 'reactflow'
import theme, { cssVariableResolver } from 'src/theme.ts'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import { runEnvVariablesCheck } from './utils/checkEnvVariables'

const queryClient = new QueryClient()
function App() {
	useEffect(() => {
		runEnvVariablesCheck()
	}, [])
	return (
		<BrowserRouter>
			<MantineProvider
				theme={theme}
				defaultColorScheme='dark'
				cssVariablesResolver={cssVariableResolver}
			>
				<QueryClientProvider client={queryClient}>
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
				</QueryClientProvider>
			</MantineProvider>
		</BrowserRouter>
	)
}

export default App
