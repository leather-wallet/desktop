import { Box, BoxProps, color } from '@stacks/ui';
import React, { FC } from 'react';

type NodeSelectProps = BoxProps;

export const NodeSelect: FC<NodeSelectProps> = props => (
  <Box
    mt="extra-loose"
    boxShadow="low"
    border={`1px solid ${color('border')}`}
    borderRadius="8px"
    width={[null, '432px']}
    {...props}
  />
);
