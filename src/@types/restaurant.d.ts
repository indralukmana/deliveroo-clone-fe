type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
};

type RestaurantCardProps = {
  restaurantId;
  name: string;
  description: string;
  imageSrc: string;
};

type DishListProps = {
  restaurantId: string;
};

type Dish = {
  id: string;
  name: string;
  price: number;
  image: {
    url: string;
  };
};

type DishCardProps = {
  name: string;
  price: number;
  imageSrc: string;
};
