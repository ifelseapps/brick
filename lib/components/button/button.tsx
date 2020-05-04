import './button.scss';
import { classnames } from '@bem-react/classnames';
import { IClassNameProps } from '@bem-react/core';
import React, { ElementType, FC, PropsWithChildren } from 'react';
import { cn } from '../../classname';

export const cnButton = cn('button');
const buttonBlock = cnButton();

export interface IButtonProps extends IClassNameProps {
  as?: ElementType;
}

export const Button: FC<PropsWithChildren<IButtonProps>> = ({ children, className, as: Component = 'button', ...props }) =>
  <Component {...props} className={classnames(buttonBlock, className)}>{children}</Component>;
