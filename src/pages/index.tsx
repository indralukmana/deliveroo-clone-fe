import React from 'react';
import MainLayout from 'src/layout/main';
import RestaurantList from 'src/components/restaurant-list';
import tw from 'twin.macro';

const Example = {
  name: 'next',
};

const Home = (): JSX.Element => {
  return (
    <MainLayout>
      <div css={[tw`flex flex-col items-center`]}>
        <h1>
          <p>{Example.name}</p>
        </h1>
        <RestaurantList />
      </div>
    </MainLayout>
  );
};

export default Home;
