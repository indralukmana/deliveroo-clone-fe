/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { NextPageContext } from 'next';
import React from 'react';
import DishList from 'src/components/dish-list';
import MainLayout from 'src/layout/main';
import { initializeApollo } from 'src/lib/apolloClient';
import tw from 'twin.macro';

const GET_RESTAURANT_DISHES = gql`
  query RestaurantAndDishes($restaurantId: ID!) {
    restaurant(id: $restaurantId) {
      name
      dishes {
        id
        restaurant {
          id
        }
        name
        price
        image {
          url
        }
      }
    }
  }
`;

export async function getServerSideProps(
  context: NextPageContext,
): Promise<{ props: RestaurantPageProps }> {
  const { id } = context.query;

  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_RESTAURANT_DISHES,
    variables: { restaurantId: id },
  });

  return {
    props: { restaurant: response.data.restaurant },
  };
}

const RestaurantPage = ({ restaurant }: RestaurantPageProps): JSX.Element => {
  return (
    <MainLayout>
      <div css={[tw`flex flex-col items-center`]}>
        <Typography component="h1" css={[tw`text-xl font-bold py-10 text-center`]}>
          {restaurant.name}
        </Typography>
        <DishList dishes={restaurant.dishes} />
      </div>
    </MainLayout>
  );
};

export default RestaurantPage;
