import React from 'react';
import MainLayout from 'src/layout/main';
import tw from 'twin.macro';
import { useRouter } from 'next/dist/client/router';
import DishList from 'src/components/dish-list';

const Home = (): JSX.Element => {
  const router = useRouter();

  const { id } = router.query;

  console.log({ router });

  return (
    <MainLayout>
      <div css={[tw`flex flex-col items-center`]}>
        <DishList restaurantId={id.toString()} />
      </div>
    </MainLayout>
  );
};

export default Home;
