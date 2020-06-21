import React from 'react';
import tw from 'twin.macro';
import MainAppBar from 'src/components/main-appbar';

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div css={[tw`min-h-screen bg-gray-300 flex flex-col`]}>
      <MainAppBar />
      {children}
    </div>
  );
};

export default MainLayout;
