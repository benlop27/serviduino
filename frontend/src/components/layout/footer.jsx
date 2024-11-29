import React from 'react';
import { Layout } from 'antd';

export const Footer = () => {
  const { Footer: AntDFooter } = Layout;
  return (
    <AntDFooter
      style={{
        textAlign: 'center',
      }}
    >
      Tech Guard 2023 ®
    </AntDFooter>
  );
}