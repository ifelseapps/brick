import { compose, composeU } from '@bem-react/core';
import { withButtonTypeLink } from './_type/button_type_link';
import { Button as ButtonPresenter } from './button';

export const Button = compose(withButtonTypeLink)(ButtonPresenter);
