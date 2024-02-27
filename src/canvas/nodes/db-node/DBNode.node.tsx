import { Center, Drawer, Flex, Grid, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { useFlowsStore } from 'src/canvas/store/flowstore'
import { CustomNodeFormData, NodeTypes } from 'src/canvas/store/types.store'
import DBNodeDrawerForm from './form/DBNode.drawer.form'
import classes from './styles.module.css'

export default function DBNode(props: NodeProps<CustomNodeFormData>) {
	const { selected, id } = props
	const { getNodeFormData, setActiveNode } = useFlowsStore()
	const [opened, { open, close }] = useDisclosure(false)

	useEffect(() => {
		if (selected) setActiveNode(id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	if (props.type === NodeTypes.DB_NODE)
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
						<Grid.Col span={12}></Grid.Col>
					</Grid>
					<Center
						bg='gray.4'
						w='100%'
						style={{
							flex: 1,
						}}
						p='xs'
					>
						<Stack gap='xs'>
							<Text c='gray.0'>{getNodeFormData(id)?.description}</Text>
							<IconEdit
								onClick={() => {
									open()
								}}
							/>
						</Stack>
					</Center>
				</Flex>
				<Drawer
					closeOnEscape={false}
					opened={opened}
					onClose={close}
					title='Fill Form Details'
					position='right'
					size='lg'
					overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				>
					<DBNodeDrawerForm
						nodeId={id}
						onSubmit={() => {
							close()
						}}
					/>
				</Drawer>
				<Handle type='source' position={Position.Left} id='a' />
			</>
		)

	return null
}
