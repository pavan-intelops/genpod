import { mount } from '@cypress/react18'
import App from 'src/App'

describe('App', () => {
	it('mounts app component', () => {
		mount(<App />)
	})
})
