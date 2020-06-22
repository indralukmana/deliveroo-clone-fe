import React from 'react';
import tw from 'twin.macro';
import DishCard from './dish-card';

const DishList = ({ dishes }: DishListProps): JSX.Element => {
  return (
    <div
      css={[
        tw`md:max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-4`,
        dishes.length === 2 && tw`md:grid-cols-2`,
        dishes.length === 1 && tw`md:grid-cols-1`,
      ]}
    >
      {dishes?.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

export default DishList;
