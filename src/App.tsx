import '@mantine/core/styles.css'
import './App.css'

import { Box, Button, MantineProvider } from '@mantine/core'
import theme from 'src/theme.ts'

function App() {
	return (
		<MantineProvider theme={theme} defaultColorScheme='dark'>
			<Box>
				<Button>Hello</Button>
			</Box>
		</MantineProvider>
	)
}

export default App
