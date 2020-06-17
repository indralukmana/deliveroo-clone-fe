import * as React from 'react';
import tw from 'twin.macro';

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return <div css={[tw`min-h-screen bg-gray-300`]}>{children}</div>;
};

export default MainLayout;
