import { Box, Drawer, Flex, Grid, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowForwardUp, IconEdit } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { Handle, NodeProps, Position } from 'reactflow'
import { useFlowStore } from '../store/flowstore'
import { CustomNodeFormData, NodeTypes } from '../store/types.store'
import classes from './styles.module.css'

export default function MicroserviceNode(props: NodeProps<CustomNodeFormData>) {
	const { selected, id } = props
	const { getNodeFormData } = useFlowStore()
	const [opened, { open, close }] = useDisclosure(false)

	if (props.data.type === NodeTypes.MICROSERVICE)
		return (
			<>
				<Handle type='target' position={Position.Right} />
				<Flex
					direction='column'
					justify='center'
					className={`${classes.node} ${selected && classes.node_selected}`}
					gap={0}
				>
					<Grid
						className={classes.node__header}
						// align='center'
						// justify='center'
					>
						<Grid.Col span={8}>
							<Text tt='uppercase' c='orange.5' fw='bold' ta='left'>
								{getNodeFormData(id)?.data.name}
							</Text>
						</Grid.Col>
						<Grid.Col span={2}>
							<IconEdit
								onClick={() => {
									open()
								}}
							/>
						</Grid.Col>

						<Grid.Col span={2}>
							<Link to={`/node/${id}`}>
								<IconArrowForwardUp
									onClick={() => {
										// addInitialNode(id)
									}}
								/>
							</Link>
						</Grid.Col>
					</Grid>
					<Box bg='gray.4' w='100%'>
						<h3>{getNodeFormData(id)?.data.description}</h3>
					</Box>
				</Flex>
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
