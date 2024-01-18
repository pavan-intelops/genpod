import { Meta, StoryObj } from '@storybook/react'
import SideNavbar from './SideNavbar'
import { sideNavData } from './data'

const meta: Meta = {
	title: 'Components/SideNavbar',
	component: SideNavbar,
} satisfies Meta<typeof SideNavbar>

export default meta

export const Default: StoryObj<typeof meta> = {
	args: {
		data: sideNavData,
	},
}
