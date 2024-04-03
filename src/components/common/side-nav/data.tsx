import {
  IconBrandGit,
  IconCloudComputing,
  IconCloudLock,
  IconCode,
  IconServer2,
  IconShieldCode,
  IconSitemap,
  IconTag,
  TablerIconsProps
} from '@tabler/icons-react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa6';
import { GrCompliance } from 'react-icons/gr';
import { LuBrainCircuit } from 'react-icons/lu';
import { MdOutlinePolicy } from 'react-icons/md';
import { PiGithubLogo } from 'react-icons/pi';
import { SiKubernetes } from 'react-icons/si';
import { TbCloudLock } from 'react-icons/tb';

export const sideNavData: SideNavData = [
  {
    label: 'Arch Diagrams',
    icon: IconSitemap
  },
  {
    label: 'compage',
    icon: IconCode,
    // icon: props => {
    //   return (
    //     <CompageIcon
    //       style={{ width: 20, height: 20 }}
    //       fill="var(--mantine-color-orange-5)"
    //       {...props}
    //     />
    //   );
    // },
    links: [
      {
        label: 'compage',
        link: '/compage'
      }
    ]
  },
  {
    label: 'Networking',
    icon: IconCloudComputing,
    links: [
      {
        label: 'Networking',
        link: '/networking'
      }
    ]
  },
  {
    label: 'K8s (lac)',
    // @ts-expect-error SiKubernetes is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: SiKubernetes,
    links: [
      {
        label: 'K8s (lac)',
        link: '/k8s'
      }
    ]
  },
  {
    label: 'CI (Tekton)',
    // @ts-expect-error IconCode is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: PiGithubLogo,
    links: [
      {
        label: 'CI (Tekton)',
        link: '/ci'
      }
    ]
  },
  {
    label: 'CD (GitOps)',
    icon: IconBrandGit,
    links: [
      {
        label: 'CD (GitOps)',
        link: '/cd'
      }
    ]
  },
  {
    label: 'SecOps',
    icon: IconShieldCode,
    links: [
      {
        label: 'SecOps',
        link: '/secops'
      }
    ]
  },
  {
    label: 'Network Policies (lac)',
    // @ts-expect-error FaNetworkWired is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: FaNetworkWired,
    links: [
      {
        label: 'Network Policies (lac)',
        link: '/network-policies'
      }
    ]
  },
  {
    label: 'Security (lac)',
    icon: IconCloudLock,
    links: [
      {
        label: 'Security (lac)',
        link: '/security'
      }
    ]
  },
  {
    label: 'Compliance',
    // @ts-expect-error GrCompliance is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: GrCompliance,
    links: [
      {
        label: 'Compliance',
        link: '/compliance'
      }
    ]
  },
  {
    label: 'Optimization Policies (lac)',
    // @ts-expect-error MdOutlinePolicy is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: MdOutlinePolicy,
    links: [
      {
        label: 'Optimization Policies (lac)',
        link: '/optimization-policies'
      }
    ]
  },
  {
    label: 'Access Controls (User Management)',
    // @ts-expect-error TbCloudLock is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: TbCloudLock,
    links: [
      {
        label: 'Access Controls (User Management)',
        link: '/access-controls'
      }
    ]
  },
  {
    label: 'OnBoarding',
    // @ts-expect-error FaChalkboardTeacher is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: FaChalkboardTeacher,
    links: [
      {
        label: 'OnBoarding',
        link: '/onboarding'
      }
    ]
  },
  {
    label: 'Labels',
    icon: IconTag,
    links: [
      {
        label: 'Labels',
        link: '/labels'
      }
    ]
  },
  {
    label: 'DataOps',
    icon: IconServer2,
    links: [
      {
        label: 'DataOps',
        link: '/dataops'
      }
    ]
  },
  {
    label: 'MLOps',
    // @ts-expect-error LuBrainCircuit is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: LuBrainCircuit,
    links: [
      {
        label: 'MLOps',
        link: '/mlops'
      }
    ]
  }
];

export type SideNavData = {
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}[];
