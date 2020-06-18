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

const RestaurantCard = ({ name, description, imageSrc }: RestaurantCardProps): JSX.Element => {
  return (
    <Card css={[tw`w-full`]}>
      <CardActionArea>
        <CardMedia image={`http://localhost:1338${imageSrc}`} title={name} css={[tw`h-32`]} />

        <CardContent>
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Buy</Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
