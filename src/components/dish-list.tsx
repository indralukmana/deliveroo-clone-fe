import React from 'react';
import tw from 'twin.macro';
import { API_URL } from 'src/lib/constants';
import DishCard from './dish-card';

const DishList = ({ dishes }: DishListProps): JSX.Element => {
  return (
    <div>
      <div css={[tw`md:max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-4`]}>
        {dishes?.map((dish) => (
          <DishCard
            key={dish.id}
            name={dish.name}
            price={dish.price}
            imageSrc={API_URL + dish.image.url}
          />
        ))}
      </div>
    </div>
  );
};

export default DishList;
