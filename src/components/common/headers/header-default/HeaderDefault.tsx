import {
	ActionIcon,
	Autocomplete,
	Group,
	Tooltip,
	rem,
	useMantineColorScheme,
} from '@mantine/core'
import {
	IconBell,
	IconMoon,
	IconSearch,
	IconSettings,
	IconSun,
	IconUser,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import GenPodLogo from 'src/assets/logos/GenpodLogo'
import classes from './HeaderDefault.module.css'

export function HeaderDefault() {
	const { colorScheme, setColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	})
	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<Link to='/'>
						<GenPodLogo />
					</Link>
				</Group>
				<Group>
					<Autocomplete
						className={classes.search}
						placeholder='Search'
						leftSection={
							<IconSearch
								style={{ width: rem(16), height: rem(16) }}
								stroke={1.5}
							/>
						}
					/>
					<Group ml={50} gap='sm' className={classes.links}>
						<Link to='/profile'>
							<Tooltip label='Profile'>
								<ActionIcon variant='transparent' display='block'>
									<IconUser />
								</ActionIcon>
							</Tooltip>
						</Link>
						<Link to='/settings'>
							<Tooltip label='Settings'>
								<ActionIcon display='block' variant='transparent'>
									<IconSettings />
								</ActionIcon>
							</Tooltip>
						</Link>
						<Link to='/notifications'>
							<Tooltip label='Notifications'>
								<ActionIcon display='block' variant='transparent'>
									<IconBell />
								</ActionIcon>
							</Tooltip>
						</Link>
						<Tooltip label='Toggle Theme'>
							{colorScheme === 'dark' ? (
								<ActionIcon
									variant='gradient'
									bg='orange'
									onClick={() => setColorScheme('light')}
								>
									<IconSun />
								</ActionIcon>
							) : (
								<ActionIcon
									bg='gray'
									variant='gradient'
									onClick={() => setColorScheme('dark')}
								>
									<IconMoon />
								</ActionIcon>
							)}
						</Tooltip>
					</Group>
				</Group>
			</div>
		</header>
	)
}
