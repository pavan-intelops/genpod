import { rem } from '@mantine/core';

interface ArchDiagramIconProps
  extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'stroke'> {
  size?: number | string;
  stroke?: string | number;
}
export const ArchDiagramIcon = ({
  size,
  style,
  stroke,
  ...others
}: ArchDiagramIconProps) => {
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
        d="M4.48556 13.6402V9.79832H15.514V13.67H16.5426V9.26224C16.5426 8.96442 16.314 8.72616 16.0283 8.72616H10.5141V4.37797H12.3426C13.1998 4.37797 13.9141 3.6632 13.9141 2.76974V1.60823C13.9141 0.714771 13.1998 0 12.3426 0H7.54267C6.68553 0 5.97126 0.714771 5.97126 1.60823V2.76974C5.97126 3.6632 6.68553 4.37797 7.54267 4.37797H9.51408V8.72616H3.97128C3.68556 8.72616 3.457 8.96442 3.457 9.26224V13.6402H4.48556Z"
        fill="#F9995C"
      />
      <path
        d="M18.4286 14.622H13.6286C12.7715 14.622 12.0572 15.3368 12.0572 16.2303V17.3918C12.0572 18.2852 12.7715 19 13.6286 19H18.4286C19.2857 19 20 18.2852 20 17.3918V16.2303C20 15.3368 19.2857 14.622 18.4286 14.622Z"
        fill="#F9995C"
      />
      <path
        d="M6.37136 14.622H1.57141C0.714278 14.622 0 15.3368 0 16.2303V17.3918C0 18.2852 0.714278 19 1.57141 19H6.37136C7.2285 19 7.94278 18.2852 7.94278 17.3918V16.2303C7.94278 15.3368 7.25707 14.622 6.37136 14.622Z"
        fill="#F9995C"
      />
    </svg>
  );
};
