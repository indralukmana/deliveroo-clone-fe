import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import tw from 'twin.macro';
import { Typography } from '@material-ui/core';
import { API_URL } from 'src/lib/constants';
import DishCard from './dish-card';

const GET_RESTAURANT_DISHES = gql`
  query RestaurantAndDishes($restaurantId: ID!) {
    restaurant(id: $restaurantId) {
      name
      dishes {
        id
        name
        price
        image {
          url
        }
      }
    }
  }
`;

const DishList = ({ restaurantId }: DishListProps): JSX.Element => {
  const { loading, data, error } = useQuery(GET_RESTAURANT_DISHES, { variables: { restaurantId } });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <Typography component="h1" css={[tw`text-xl font-bold py-10 text-center`]}>
        {data?.restaurant?.name}
      </Typography>
      <div css={[tw`md:max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-4`]}>
        {data?.restaurant?.dishes?.map((dish: Dish) => (
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
