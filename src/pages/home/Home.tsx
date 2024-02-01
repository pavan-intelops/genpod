import { Alert, Grid } from '@mantine/core'
import React, { useEffect } from 'react'
import SideNavbar from 'src/components/common/side-nav/SideNavbar'
import { sideNavData } from 'src/components/common/side-nav/data'
import AddOrLoadProject from 'src/components/home/projects/AddOrLoadProject.1'
import Protected from 'src/hoc/protected'
import Layout from '../../components/common/layout/Layout'
import useUserStore from 'src/store/userStore'

const Home = React.memo(() => {
	const { gitPlatformStore } = useUserStore()
	useEffect(() => {
		if (gitPlatformStore.gitPlatforms.length === 0) {
			Alert({
				title: 'No Git Platforms',
			})
		}
	}, [])
	return (
		<Protected>
			<Layout>
				<Grid
					style={{
						width: '100vw',
					}}
					gutter={0}
				>
					<Grid.Col span={2}>
						<SideNavbar data={sideNavData} />
					</Grid.Col>
					<Grid.Col span={10}>
						<AddOrLoadProject />
					</Grid.Col>
				</Grid>
			</Layout>
		</Protected>
	)
})

export default Home
