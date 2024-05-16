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
import { useNavigate } from 'react-router-dom';
import { FeatureFlagVariant } from 'src/store/types';

interface NavBarLinksGroupForComingSoonProps {
  icon: React.FC<TablerIconsProps>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  variant?: FeatureFlagVariant;
}

export function NavBarLinksGroupForComingSoon({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  variant
}: NavBarLinksGroupForComingSoonProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState<boolean>(!!initiallyOpened);
  const navigate = useNavigate();
  const toggleOpen = () => setOpened(o => !o);

  const preventDefault = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    event.preventDefault();
    if (variant?.type === 'IMAGE') {
      return navigate('/coming-soon', {
        state: {
          variant
        }
      });
    }
    return navigate(link);
  };

  const renderLink = (link: { label: string; link: string }) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={e => preventDefault(e, link.link)}
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
