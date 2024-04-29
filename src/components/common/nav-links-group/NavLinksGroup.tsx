import { useState } from 'react';

import {
  Box,
  Collapse,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core';
import { IconChevronRight, TablerIconsProps } from '@tabler/icons-react';

import classes from './NavLinksGroup.module.css';

interface NavBarLinksGroupProps {
  icon: React.FC<TablerIconsProps>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  disableClickActions?: boolean;
}

export function NavBarLinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links
}: NavBarLinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState<boolean>(!!initiallyOpened);

  const toggleOpen = () => setOpened(o => !o);

  const preventDefault = (event: React.MouseEvent<HTMLAnchorElement>) =>
    event.preventDefault();

  const renderLink = (link: { label: string; link: string }) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={preventDefault}
    >
      {link.label}
    </Text>
  );

  const items = hasLinks ? links.map(renderLink) : [];

  return (
    <>
      <UnstyledButton onClick={toggleOpen} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="dark" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md" w={rem(150)}>
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none'
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
