import { rem } from '@mantine/core';

interface CompageIconProps
  extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'stroke'> {
  size?: number | string;
  stroke?: string | number;
}
export const CompageIcon = ({
  size,
  style,
  stroke,
  ...others
}: CompageIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={{ width: rem(size || 20), height: rem(size || 20), ...style }}
      {...others}
      stroke={stroke?.toString() || 'currentColor'}
    >
      <path
        d="M8.00638 17.202L2.17798 10.6714L8.00638 4.03544C8.15853 3.9067 8.54007 3.68433 8.84904 3.82477C9.15802 3.96522 9.21185 4.30462 9.20015 4.45677V5.93143C9.20015 6.35276 8.96608 6.8092 8.84904 6.98475L5.65395 10.6714L8.56817 14.042C8.80223 14.2644 9.25632 14.8636 9.20015 15.4816C9.14398 16.0995 9.17675 16.7222 9.20015 16.9562C9.17675 17.1318 9.03867 17.4899 8.67352 17.518C8.30837 17.5461 8.07661 17.319 8.00638 17.202Z"
        fill={others.fill || '#0F0F0F'}
      />
      <path
        d="M13.1861 13.9425L19.0145 7.41187L13.1861 0.775917C13.0339 0.647177 12.6524 0.424808 12.3434 0.565252C12.0344 0.705695 11.9806 1.0451 11.9923 1.19725V2.6719C11.9923 3.09323 12.2264 3.54967 12.3434 3.72523L15.5385 7.41187L12.6243 10.7825C12.3902 11.0049 11.9361 11.6041 11.9923 12.2221C12.0485 12.84 12.0157 13.4626 11.9923 13.6967C12.0157 13.8723 12.1538 14.2304 12.5189 14.2585C12.8841 14.2866 13.1159 14.0595 13.1861 13.9425Z"
        fill={others.fill || '#0F0F0F'}
      />
      <path
        d="M6.18188 1.81369H7.79698V3.42879H6.18188V1.81369Z"
        fill={others.fill || '#0F0F0F'}
      />
      <path
        d="M0.985596 5.32468H2.6007V6.93978H0.985596V5.32468Z"
        fill={others.fill || '#0F0F0F'}
      />
      <path
        d="M1.47778 0.479584H3.58443V2.58624H1.47778V0.479584Z"
        fill={others.fill || '#0F0F0F'}
      />
    </svg>
  );
};
