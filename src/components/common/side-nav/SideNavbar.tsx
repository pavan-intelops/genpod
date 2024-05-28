import {
  ActionIcon,
  Autocomplete,
  Code,
  Group,
  rem,
  ScrollArea,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import {
  IconLogout,
  IconMenu2,
  IconMoon,
  IconSearch,
  IconSun,
  IconSwitchHorizontal,
  IconUser,
  IconX
} from '@tabler/icons-react';
import { useState } from 'react';
import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup';
import classes from './SideNavbar.module.css';
import { SideNavData } from './data';
import { useFeatureFlagStore } from 'src/store/useFeatureFlagStore';
import { FEATURE_FLAG } from 'src/feature-flag-configs/types';
import { NavBarLinksGroupForComingSoon } from '../nav-links-group/NavLinksGroupForComingSoon';
import { FeatureFlagVariant } from 'src/store/types';
import GenPodLogo from 'src/assets/logos/GenpodLogo';
import useUserStore from 'src/store/userStore';
import { Link, useNavigate } from 'react-router-dom';

interface SideNavbarProps {
  data: SideNavData;
}

export default function SideNavbar({ data }: SideNavbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { getFeatureFlag } = useFeatureFlagStore();
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true
  });
  const flagConfig = getFeatureFlag(FEATURE_FLAG.SIDE_NAV);
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const links = data.map(item => {
    if (flagConfig.features[item.id] === 'hidden') return null;
    if (flagConfig.features[item.id] === 'coming-soon') {
      const variant: FeatureFlagVariant =
        flagConfig.variants && flagConfig.variants[item.id];

      return (
        <NavBarLinksGroupForComingSoon
          {...item}
          key={item.label}
          links={item.links?.map(() => ({
            label: 'Coming Soon',
            link: variant.url
          }))}
          variant={variant}
        />
      );
    }
    return <NavBarLinksGroup {...item} key={item.label} />;
  });

  return (
    <>
      <nav
        className={`${classes.navbar} ${
          isNavOpen ? classes.open : classes.closed
        }`}
      >
        {isNavOpen ? (
          <IconX onClick={handleNavToggle} className={classes.menuButton} />
        ) : (
          <IconMenu2 onClick={handleNavToggle} className={classes.menuButton} />
        )}

        <div className={classes.navbarMain}>
          <ScrollArea className={classes.links}>
            <Group className={classes.header}>
              <Group justify="space-between">
                <GenPodLogo />
                <Tooltip label="Toggle Theme">
                  {colorScheme === 'dark' ? (
                    <ActionIcon
                      variant="gradient"
                      bg="orange"
                      onClick={() => setColorScheme('light')}
                    >
                      <IconSun />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      bg="gray"
                      variant="gradient"
                      onClick={() => setColorScheme('dark')}
                    >
                      <IconMoon />
                    </ActionIcon>
                  )}
                </Tooltip>
                <Code fw={700}>v1.0.0</Code>
              </Group>
              <Group>
                <Autocomplete
                  className={classes.search}
                  placeholder="Search"
                  leftSection={
                    <IconSearch
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                />
              </Group>
            </Group>

            <div className={classes.linksInner}>{links}</div>
            <div className={classes.footer}>
              <Link to="/profile" className={classes.link}>
                <IconUser className={classes.linkIcon} stroke={1.5} />
                <span>Profile</span>
              </Link>

              <Link
                to="/login"
                className={classes.link}
                onClick={() => {
                  logout();
                }}
              >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
              </Link>
            </div>
          </ScrollArea>
        </div>
      </nav>
    </>
  );
}
