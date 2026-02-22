interface ICreateCustomerPayload {
  name: string;
  email: string;
  password: string;
}

interface ICreateRestaurantPayload {
  password: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  restaurant: {
    restaurantName: string;
    city: string;
    address: string;
    contactNumber?: string;
    cuisine?: string;
    openingHours?: string;
    logo?: string;
    coverImage?: string;
    foodCategories?: string[];
  };
}

interface ISignInPayload {
  email: string;
  password: string;
}
