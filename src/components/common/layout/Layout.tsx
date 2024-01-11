import { Stack } from '@mantine/core'
import { HeaderDefault } from '../headers/header-default/HeaderDefault'

interface LayoutProps {
	children?: React.ReactNode | React.ReactNode[] | null
}

export default function Layout({ children }: LayoutProps) {
	return (
		<Stack>
			<HeaderDefault />
			{children}
		</Stack>
	)
}
