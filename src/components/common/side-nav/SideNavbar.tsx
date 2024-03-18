import { ScrollArea } from '@mantine/core';
import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup';
import classes from './SideNavbar.module.css';
import { SideNavData } from './data';

interface SideNavbarProps {
  data: SideNavData;
}
export default function SideNavbar({ data }: SideNavbarProps) {
  const links = data.map(item => (
    <NavBarLinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
