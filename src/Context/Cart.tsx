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
      payload: DishOrder;
    };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case ActionType.AddToCart: {
      const dish = action.payload;
      let newDishOrders = state.dishOrders;

      const foundDishOrder = state.dishOrders.find((dishOrder) => dish.id === dishOrder.id);

      newDishOrders = foundDishOrder
        ? state.dishOrders.map((dishOrder) => {
            if (dishOrder.id === dish.id) {
              return {
                ...dishOrder,
                count: dishOrder.count + 1,
                subtotal: dishOrder.subtotal + dish.price,
              };
            }

            return dishOrder;
          })
        : [...newDishOrders, { ...dish, count: 1, subtotal: dish.price }];

      return {
        ...state,
        restaurantId: dish.restaurant.id,
        dishOrders: newDishOrders,
        total: state.total + dish.price,
      };
    }

    case ActionType.RemoveFromCart: {
      let newDishOrders = state.dishOrders;

      if (action.payload.count === 1) {
        const foundOrderIndex = newDishOrders.findIndex(
          (dishOrder) => dishOrder.id === action.payload.id,
        );
        newDishOrders.splice(foundOrderIndex, 1);
      } else {
        newDishOrders = newDishOrders.map((dishOrder) => {
          if (dishOrder.id === action.payload.id) {
            const mutatedDishOrder: DishOrder = {
              ...dishOrder,
              count: dishOrder.count - 1,
              subtotal: dishOrder.subtotal - action.payload.price,
            };

            return mutatedDishOrder;
          }

          return dishOrder;
        });
      }

      return {
        ...state,
        dishOrders: newDishOrders,
        restaurantId: newDishOrders.length === 0 ? '' : state.restaurantId,
        total: state.total - action.payload.price,
      };
    }

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
