import React from 'react';
import { withBemMod } from '@bem-react/core';
import { cnButton, IButtonProps } from '../button';

export interface IButtonTypeLinkProps {
  type?: 'link';
  href?: string;
}

export const withButtonTypeLink = withBemMod<IButtonTypeLinkProps, IButtonProps>(
  cnButton(),
  { type: 'link' },
  (Button) => (props) => <Button {...props} as="a" />,
);
