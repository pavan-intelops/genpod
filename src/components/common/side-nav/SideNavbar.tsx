import { ScrollArea } from '@mantine/core';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup';
import classes from './SideNavbar.module.css';
import { SideNavData } from './data';

interface SideNavbarProps {
  data: SideNavData;
}

export default function SideNavbar({ data }: SideNavbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const links = data.map(item => (
    <NavBarLinksGroup {...item} key={item.label} />
  ));

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
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
    </>
  );
}
