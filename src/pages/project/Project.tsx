import { Anchor, Breadcrumbs, Grid } from '@mantine/core'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations'
import Flow from 'src/canvas/Flow'
import { useFlowsStore } from 'src/canvas/store/flowstore'
import Layout from 'src/components/common/layout/Layout'
import SideNavbar from 'src/components/common/side-nav/SideNavbar'
import { sideNavData } from 'src/components/common/side-nav/data'
import Protected from 'src/hoc/protected'

interface ProjectParams {
	projectId: string
}

export default function Project() {
	const params = useParams() as unknown as ProjectParams
	const { getProject } = useProjectOperations()
	const { addFlow } = useFlowsStore()

	useEffect(() => {
		addFlow('flow' + params.projectId)
		;(async function () {
			const { data } = await getProject(params.projectId)
			console.log('res: ', data)
		})()
	}, [])

	const items = [
		{ title: 'Home', href: '/' },
		{
			title: params.projectId,
			href: `/project/${params.projectId}`,
			active: false,
		},
	].map((item, index) => (
		<Anchor href={item.href} key={index}>
			{item.title}
		</Anchor>
	))

	return (
		<Protected>
			<Layout>
				<Grid
					style={{
						width: '100vw',
					}}
					gutter='sm'
				>
					<Grid.Col span={2}>
						<SideNavbar data={sideNavData} />
					</Grid.Col>
					<Grid.Col span={10}>
						<Breadcrumbs separator='>'>{items}</Breadcrumbs>
						<Flow />
					</Grid.Col>
				</Grid>
			</Layout>
		</Protected>
	)
}
