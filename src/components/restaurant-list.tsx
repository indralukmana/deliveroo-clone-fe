import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  console.log({ loading, data, error });
  return <div />;
};

export default RestaurantList;
