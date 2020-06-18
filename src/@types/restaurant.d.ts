type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
};

type RestaurantCardProps = {
  name: string;
  description: string;
  imageSrc: string;
};
