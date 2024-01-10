import { Box, Drawer, Flex, Grid, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowForwardUp, IconEdit } from '@tabler/icons-react'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Handle, NodeProps, Position } from 'reactflow'
import { useFlowStore } from '../../store/flowstore'
import { CustomNodeFormData, NodeTypes } from '../../store/types.store'
import MicroServiceNodeDrawerForm from './form/MicroserviceNode.modal.form'
import classes from './styles.module.css'

export default function MicroserviceNode(props: NodeProps<CustomNodeFormData>) {
	const { selected, id } = props
	const { getNodeFormData, setActiveNode } = useFlowStore()
	const [opened, { open, close }] = useDisclosure(false)

	useEffect(() => {
		if (selected) setActiveNode(id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	if (props.type === NodeTypes.MICROSERVICE)
		return (
			<>
				<Handle type='target' position={Position.Right} />
				<Flex
					direction='column'
					justify='flex-start'
					className={classNames(classes['node'], {
						[classes['node_selected']]: selected,
					})}
					gap={0}
				>
					<Grid className={classes.node__header}>
						<Grid.Col span={8}>
							<Text tt='uppercase' c='orange.5' fw='bold' ta='left'>
								{getNodeFormData(id)?.name}
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
					<Box
						bg='gray.4'
						w='100%'
						style={{
							flex: 1,
						}}
						p='xs'
					>
						<Text c='gray.0'>{getNodeFormData(id)?.description}</Text>
					</Box>
				</Flex>
				<Drawer
					closeOnEscape
					opened={opened}
					onClose={close}
					title='Fill Node Form Details'
					position='right'
					size='lg'
					overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				>
					<MicroServiceNodeDrawerForm nodeId={id} />
				</Drawer>
				<Handle type='source' position={Position.Left} id='a' />
			</>
		)

	return null
}
