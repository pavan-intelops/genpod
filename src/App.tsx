import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import '@mantine/code-highlight/styles.css'

import { Route, Routes } from 'react-router-dom'
import './App.css'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { ReactFlowProvider } from 'reactflow'
import theme, { cssVariableResolver } from 'src/theme.ts'
import Home from './pages/home/Home'
import Layout from './pages/layout/Layout'

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
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
							{/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
							{/* <Route path="*" element={<NoMatch />} /> */}
						</Route>
					</Routes>
				</ModalsProvider>
			</ReactFlowProvider>
		</MantineProvider>
	)
}

export default App
