export type PropertyDTO = {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
};

export type PropertiesResponse = {
  items: PropertyDTO[];
  total: number;
};
