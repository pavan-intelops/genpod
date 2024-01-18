import { Meta, StoryObj } from '@storybook/react'
import { IconHome2 } from '@tabler/icons-react'
import { NavBarLinksGroup } from './NavLinksGroup'

const meta: Meta = {
	title: 'Components/NavBarLinksGroup',
	component: NavBarLinksGroup,
	// Add argTypes if your component accepts any props
	argTypes: {
		initiallyOpened: {
			control: 'boolean',
			defaultValue: false,
		},
	},
} satisfies Meta<typeof NavBarLinksGroup>

export default meta

export const Default: StoryObj<typeof meta> = {
	args: {
		icon: IconHome2,
		label: 'Home',
		initiallyOpened: false,
		links: [
			{ label: 'Dashboard', link: '/dashboard' },
			{ label: 'Settings', link: '/settings' },
			// Add more links if necessary
		],
	},
}

export const NoSubLinks: StoryObj<typeof meta> = {
	args: {
		icon: IconHome2,
		label: 'Home',
	},
}

// You can add more stories to showcase different states or variations of the component
