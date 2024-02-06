import App from 'src/App'
import { mount } from '@cypress/react18'

describe('App', () => {
	it('mounts app component', () => {
		mount(<App />)
	})
})
