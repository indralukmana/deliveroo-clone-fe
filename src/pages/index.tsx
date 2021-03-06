import React from 'react';
import MainLayout from 'src/layout/main';
import RestaurantList from 'src/components/restaurant-list';
import tw from 'twin.macro';

const Home = (): JSX.Element => {
  return (
    <MainLayout>
      <div css={[tw`flex flex-col items-center`]}>
        <h1>Deliveraa</h1>
        <RestaurantList />
      </div>
    </MainLayout>
  );
};

export default Home;
