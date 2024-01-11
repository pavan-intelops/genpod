import { ScrollArea } from '@mantine/core'
import {
	IconNotes,
	IconCalendarStats,
	IconPresentationAnalytics,
	IconFileAnalytics,
	IconAdjustments,
	IconLock,
	IconBinaryTree,
} from '@tabler/icons-react'
import classes from './SideNavbar.module.css'
import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup'

const mockdata = [
	{ label: 'Arch Diagrams', icon: IconBinaryTree },
	{
		label: 'Market news',
		icon: IconNotes,
		initiallyOpened: true,
		links: [
			{ label: 'Overview', link: '/' },
			{ label: 'Forecasts', link: '/' },
			{ label: 'Outlook', link: '/' },
			{ label: 'Real time', link: '/' },
		],
	},
	{
		label: 'Releases',
		icon: IconCalendarStats,
		links: [
			{ label: 'Upcoming releases', link: '/' },
			{ label: 'Previous releases', link: '/' },
			{ label: 'Releases schedule', link: '/' },
		],
	},
	{ label: 'Analytics', icon: IconPresentationAnalytics },
	{ label: 'Contracts', icon: IconFileAnalytics },
	{ label: 'Settings', icon: IconAdjustments },
	{
		label: 'Security',
		icon: IconLock,
		links: [
			{ label: 'Enable 2FA', link: '/' },
			{ label: 'Change password', link: '/' },
			{ label: 'Recovery codes', link: '/' },
		],
	},
]
export default function SideNavbar() {
	const links = mockdata.map((item) => (
		<NavBarLinksGroup {...item} key={item.label} />
	))

	return (
		<nav className={classes.navbar}>
			{/* <div className={classes.header}>
			<Group justify='space-between'>
				<Logo style={{ width: rem(120) }} />
				<Code fw={700}>v3.1.2</Code>
			</Group>
		</div> */}

			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>
		</nav>
	)
}
