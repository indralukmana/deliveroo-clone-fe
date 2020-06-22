import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { ActionType, useCart } from 'src/Context/Cart';
import { API_URL } from 'src/lib/constants';
import tw from 'twin.macro';

const DishCard = ({ dish }: DishCardProps): JSX.Element => {
  const { cartDispatch } = useCart();

  return (
    <Card css={[tw`w-56`]}>
      <CardActionArea>
        <CardMedia image={API_URL + dish.image.url} title={dish.name} css={[tw`h-32`]} />

        <CardContent>
          <Typography>{dish.name}</Typography>
          <Typography>${dish.price}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={(): void => {
            cartDispatch({ payload: dish, type: ActionType.AddToCart });
          }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishCard;
