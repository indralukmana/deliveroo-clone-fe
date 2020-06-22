/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const LOGIN_QUERY_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`;

export const MUTATION_REGISTER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;
