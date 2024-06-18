import { Flex, Loader, Text } from '@mantine/core';
interface LoadingProps {
  color?: string;
  loadingText?: string;
  showLoadingText?: boolean;
}
export default function Loading({
  color,
  loadingText,
  showLoadingText
}: LoadingProps) {
  return (
    <Flex p="lg" align="center">
      <Loader color={color || 'orange'} mr="lg" />
      {(loadingText || showLoadingText) && (
        <Text>{loadingText || 'Loading ...'}</Text>
      )}
    </Flex>
  );
}
