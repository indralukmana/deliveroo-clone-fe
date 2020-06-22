import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type DishOrder = Dish & { count: number; subtotal: number };

type Cart = {
  restaurantId: string;
  dishOrders: DishOrder[];
  total: number;
  loading: boolean;
  error: Error | null;
};

export enum ActionType {
  AddToCart = 'ADD_TO_CART',
  RemoveFromCart = 'REMOVE_FROM_CART',
}

type CartAction =
  | {
      type: ActionType.AddToCart;
      payload: Dish;
    }
  | {
      type: ActionType.RemoveFromCart;
      payload: Dish;
    };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case ActionType.AddToCart:
      console.log('added');
      console.log(action.payload);
      return state;

    case ActionType.RemoveFromCart:
      console.log('remove');
      return state;

    default:
      return state;
  }
};

type CartContextType = {
  cart: Cart;
  cartDispatch: Dispatch<CartAction>;
};
const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const cartInitialState: Cart = {
    restaurantId: '',
    dishOrders: [],
    total: 0,
    loading: false,
    error: null,
  };

  const [cart, cartDispatch] = useReducer(cartReducer, cartInitialState);

  return <CartContext.Provider value={{ cart, cartDispatch }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => useContext(CartContext);
