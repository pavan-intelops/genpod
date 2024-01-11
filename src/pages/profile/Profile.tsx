import { Box, Tabs, Text } from '@mantine/core'
import { IconFileSettings, IconGitBranch } from '@tabler/icons-react'
import React from 'react'
import Layout from 'src/components/common/layout/Layout'
import User from 'src/components/user'
import classes from './profile.module.css'

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
	return (
		<Layout>
			<Box className={classes.box}>
				<Text variant='text' size='xl' fw='bolder'>
					Profile
				</Text>
				<Tabs
					defaultValue='projects'
					orientation='vertical'
					activateTabWithKeyboard
					classNames={{
						tab: classes.tab,
						root: classes.root,
						list: classes.list,
					}}
				>
					<Tabs.List>
						<Tabs.Tab value='projects' leftSection={<IconFileSettings />}>
							Projects
						</Tabs.Tab>
						<Tabs.Tab value='gitPlatforms' leftSection={<IconGitBranch />}>
							GIT Platforms
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='projects'>
						<User.Projects />
					</Tabs.Panel>
					<Tabs.Panel value='gitPlatforms'>
						<User.GitPlatforms />
					</Tabs.Panel>
				</Tabs>
			</Box>
		</Layout>
	)
}
export default Profile
