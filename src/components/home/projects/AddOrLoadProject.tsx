import { Box, Flex, Text } from '@mantine/core'
import classes from './AddOrLoadProject.module.css'

export default function AddOrLoadProject() {
	return (
		<Box className={classes.container}>
			<Text size='xl' fw='bold'>
				Add Or Load Project
			</Text>
			<Flex className={classes.formContainer}>
				<Box w='50%' p='md' bg='dark'>
					<Text size='sm'>Add Project</Text>
				</Box>
				<Box w='50%' p='md' bg='dark'>
					<Text size='sm'>Load Project</Text>
				</Box>
			</Flex>
		</Box>
	)
}
