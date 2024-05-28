import {
	ActionIcon,
	Autocomplete,
	Group,
	Menu,
	Tooltip,
	rem,
	useMantineColorScheme,
} from '@mantine/core'
import {
	IconBell,
	IconLogout,
	IconMoon,
	IconSearch,
	IconSettings,
	IconSun,
	IconUser,
} from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import GenPodLogo from 'src/assets/logos/GenpodLogo'
import classes from './HeaderDefault.module.css'
import useUserStore from 'src/store/userStore'

export function HeaderDefault() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true
  });
  const { logout } = useUserStore();
  const navigate = useNavigate();
  return null;
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Link to="/">
            <GenPodLogo />
          </Link>
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
          <Group ml={50} gap="sm" className={classes.links}>
            <Link to="/profile">
              <Tooltip label="Profile">
                <ActionIcon variant="transparent" display="block">
                  <IconUser />
                </ActionIcon>
              </Tooltip>
            </Link>
            <Menu shadow="md" width={300}>
              <Menu.Target>
                <Tooltip label="Settings">
                  <ActionIcon display="block" variant="transparent">
                    <IconSettings />
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                <Link to="/settings">
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Settings
                  </Menu.Item>
                </Link>
                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Link to="/notifications">
              <Tooltip label="Notifications">
                <ActionIcon display="block" variant="transparent">
                  <IconBell />
                </ActionIcon>
              </Tooltip>
            </Link>
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
          </Group>
        </Group>
      </div>
    </header>
  );
}
