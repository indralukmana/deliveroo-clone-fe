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

type Dish = {
  id: string;
  name: string;
  price: number;
  image: {
    url: string;
  };
};

type DishListProps = {
  dishes: Dish[];
};

type RestaurantPageProps = {
  restaurant: {
    name: string;
    dishes: Dish[];
  };
};

type DishCardProps = {
  dish: Dish;
};
