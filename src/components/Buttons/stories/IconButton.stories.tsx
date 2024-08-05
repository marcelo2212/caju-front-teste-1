import React from 'react';
import { IconButton } from './IconButton';
import { HiOutlineMail } from 'react-icons/hi';

export default {
  title: 'Components/IconButton',
  component: IconButton,
};

export const Default = () => (
  <IconButton>
    <HiOutlineMail />
  </IconButton>
);
export const WithLabel = () => (
  <IconButton aria-label="Email">
    <HiOutlineMail />
  </IconButton>
);
