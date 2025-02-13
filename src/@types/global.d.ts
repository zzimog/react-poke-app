type Key = string | number;

type Size = {
  size: 's' | 'm' | 'l';
  label: string;
  image: string;
  price: number;
  limits: {
    bases: number;
    proteins: number;
    sides: number;
    crunch: number;
    sauces: number;
  };
};

type Choice = {
  label: string;
  extraPrice?: number;
  list: Item[];
};

type Item = {
  id: string;
  label: string;
  image?: string;
  extraPrice?: number;
};

type Data = {
  sizes: Size[];
  categories: {
    [key in keyof Size['limits'] as string]: Choice;
  };
};
