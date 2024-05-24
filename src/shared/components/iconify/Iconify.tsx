import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';
import { forwardRef } from 'react';
import { IconifyProps } from './types';

interface Props extends BoxProps {
  icon: IconifyProps;
}

export default forwardRef<SVGElement, Props>(function Iconify({ icon, width = 20, sx, ...other }, ref) {
  return <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />;
});
