export interface Options {
  _id: string;
  text: string;
  price: number;
}

export interface ProductProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  prices: number[];
  extraOptions?: Options[];
}

export interface CartItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  extras: Options[];
}

export interface OrderProps {
  _id: string;
  customer: string;
  address: string;
  total: number;
  status: number;
  method: number;
}
