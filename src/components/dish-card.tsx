import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import tw from 'twin.macro';

const DishCard = ({ name, price, imageSrc }: DishCardProps): JSX.Element => {
  return (
    <Card css={[tw`w-full`]}>
      <CardActionArea>
        <CardMedia image={imageSrc} title={name} css={[tw`h-32`]} />

        <CardContent>
          <Typography>{name}</Typography>
          <Typography>${price}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default DishCard;
