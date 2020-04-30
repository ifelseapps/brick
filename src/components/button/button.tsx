import React, { FC, PropsWithChildren } from 'react';

import './button.scss';

export const Button: FC<PropsWithChildren<{}>> = ({ children }) =>
  <button className="button" type="button">{children}</button>;
