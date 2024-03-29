import { EnableBefore, listHoverProps, listFocusedProps } from './transaction-list-item-pseudo';
import { Flex, FlexProps } from '@stacks/ui';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';
import React from 'react';

interface TransactionListItemContainerProps extends FlexProps {
  focused: boolean;
  hovered: boolean;
  txId: string;
}

export const TransactionListItemContainer: ForwardRefExoticComponentWithAs<
  TransactionListItemContainerProps,
  'div'
> = forwardRefWithAs<TransactionListItemContainerProps, 'div'>((args, ref) => {
  const { hovered, focused, txId, ...props } = args;

  return (
    <Flex
      ref={ref}
      mb="loose"
      cursor="default"
      textAlign="left"
      position="relative"
      outline={0}
      zIndex={2}
      data-txid={txId}
      _before={listHoverProps(hovered)}
      _after={listFocusedProps(focused)}
      {...props}
      as={EnableBefore}
    />
  );
});
