import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import tw from 'twin.macro';
import RestaurantCard from './restaurant-card';

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (): JSX.Element => {
  const { loading, data, error } = useQuery(query);

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
    <div css={[tw`md:max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-4`]}>
      {data?.restaurants?.map((restaurant: Restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          description={restaurant.description}
          imageSrc={restaurant.image.url}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
