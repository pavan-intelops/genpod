import { Drawer, Grid, GridCol, Stack, Text } from '@mantine/core'
import { IconArrowForwardUp, IconEdit } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { Handle, NodeProps, Position } from 'reactflow'
import { useFlowStore } from '../store/flowstore'
import { CustomNodeFormData, NodeTypes } from '../store/types.store'
import classes from './styles.module.css'
import { useDisclosure } from '@mantine/hooks'

export default function MicroserviceNode(props: NodeProps<CustomNodeFormData>) {
	const { selected, id } = props
	const { getNodeFormData } = useFlowStore()
	const [opened, { open, close }] = useDisclosure(false)

	if (props.data.type === NodeTypes.MICROSERVICE)
		return (
			<>
				<Handle type='target' position={Position.Right} />
				<Stack
					className={`${classes.node} ${selected && classes.node_selected}`}
					align='center'
				>
					<Grid
						className={classes.node__header}
						style={{
							width: '100%',
						}}
						align='center'
					>
						<GridCol span={8}>
							<Text tt='uppercase' c='orange.5' fw='bold' ta='left'>
								{getNodeFormData(id)?.data.name}
							</Text>
						</GridCol>
						<GridCol span={2}>
							<IconEdit
								onClick={() => {
									open()
								}}
							/>
						</GridCol>

						<GridCol span={2}>
							<Link to={`/node/${id}`}>
								<IconArrowForwardUp
									onClick={() => {
										// addInitialNode(id)
									}}
								/>
							</Link>
						</GridCol>
					</Grid>
					<Stack align='center'>
						<h3>{getNodeFormData(id)?.data.description}</h3>
					</Stack>
				</Stack>
				<Drawer
					opened={opened}
					onClose={close}
					title='Authentication'
					position='right'
					size='xl'
					overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				>
					{/* Drawer content */}
				</Drawer>
				<Handle type='source' position={Position.Left} id='a' />
			</>
		)

	return null
}
