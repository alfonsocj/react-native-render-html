import React, { Fragment, PropsWithChildren } from 'react';
import useToolkit from './useToolkit';

export default function Page({ children }: PropsWithChildren<{}>) {
  const { Container = Fragment } = useToolkit();
  return <Container>{children}</Container>;
}
