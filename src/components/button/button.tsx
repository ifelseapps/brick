import React, { FC, PropsWithChildren } from 'react';

export const Button: FC<PropsWithChildren<{}>> = ({ children }) => <button type="button">{children}</button>;
