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
import { useRouter } from 'next/dist/client/router';

const RestaurantCard = ({
  restaurantId,
  name,
  description,
  imageSrc,
}: RestaurantCardProps): JSX.Element => {
  const router = useRouter();

  return (
    <Card css={[tw`w-full flex flex-col`]}>
      <CardActionArea css={[tw`flex-1 flex flex-col`]}>
        <CardMedia image={imageSrc} title={name} css={[tw`h-32 w-full`]} />

        <CardContent css={[tw`flex-1 w-full`]}>
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={(): void => {
            router.push({
              pathname: '/restaurant',
              query: { id: restaurantId },
            });
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
