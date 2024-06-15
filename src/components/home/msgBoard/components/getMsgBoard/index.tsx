import * as React from 'react';

import { BookMsg } from './bookMsg';
import { GridMsg } from './gridMsg';
import { RabbitMsg } from './rabbitMsg';

export const testAvatar =
  'https://avatar.iran.liara.run/public/job/designer/female';
export type MsgProps = {
  id?: string | number;
  style?: number;
  content?: string;
  createTime?: any;
  avatar?: string;
  onDeleteMsg?: any;
  className?: string;
  [property: string]: any;
};

export const MsgCard = (props: MsgProps) => {
  const { style, onDeleteMsg } = props;
  if (style === 1) {
    return <GridMsg {...props} />;
  }
  if (style === 2) {
    return <BookMsg {...props} />;
  }
  return <RabbitMsg {...props} />;
};
