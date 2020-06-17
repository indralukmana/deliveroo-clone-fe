import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
