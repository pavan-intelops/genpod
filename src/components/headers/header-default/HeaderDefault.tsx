import { ActionIcon, Autocomplete, Button, Group, rem } from '@mantine/core'
import {
	IconBell,
	IconSearch,
	IconSettings,
	IconUser,
} from '@tabler/icons-react'
import GenPodLogo from 'src/assets/logos/GenpodLogo'
import classes from './HeaderDefault.module.css'

export function HeaderDefault() {
	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<GenPodLogo />
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
					<Group ml={50} gap={5} className={classes.links}>
						<Button
							component='a'
							variant='transparent'
							leftSection={<IconUser />}
						>
							Sign In
						</Button>
						<ActionIcon variant='transparent'>
							<IconSettings />
						</ActionIcon>
						<ActionIcon variant='transparent'>
							<IconBell />
						</ActionIcon>
					</Group>
				</Group>
			</div>
		</header>
	)
}
