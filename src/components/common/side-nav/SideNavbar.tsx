import { ScrollArea } from '@mantine/core';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { NavBarLinksGroup } from '../nav-links-group/NavLinksGroup';
import classes from './SideNavbar.module.css';
import { SideNavData } from './data';
import { useFeatureFlagStore } from 'src/store/useFeatureFlagStore';
import { FEATURE_FLAG } from 'src/feature-flag-configs/types';
import { NavBarLinksGroupForComingSoon } from '../nav-links-group/NavLinksGroupForComingSoon';
import { FeatureFlagVariant } from 'src/store/types';

interface SideNavbarProps {
  data: SideNavData;
}

export default function SideNavbar({ data }: SideNavbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { getFeatureFlag } = useFeatureFlagStore();
  const flagConfig = getFeatureFlag(FEATURE_FLAG.SIDE_NAV);
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

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
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
    </>
  );
}
