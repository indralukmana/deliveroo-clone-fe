import * as React from 'react';
import tw from 'twin.macro';
import MainAppBar from 'src/components/main-appbar';

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div css={[tw`min-h-screen bg-gray-300`]}>
      <MainAppBar />
      {children}
    </div>
  );
};

export default MainLayout;
