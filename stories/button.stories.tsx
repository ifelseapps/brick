import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';


import { Button } from '../lib/components/button';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

export const button = () => <Button>Click me</Button>;
export const buttonTypeLink = () => <Button type="link" href={text('href', 'http://yandex.ru')} className="test">Some link</Button>;
