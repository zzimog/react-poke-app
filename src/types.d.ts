type Data = {
  sizes: Array<{
    size: 's' | 'm' | 'l';
    label: string;
    image: string;
    price: number;
    content: {
      [key: string]: number;
    };
  }>;
  choices: {
    [key: string]: {
      label: string;
      extraPrice?: number;
      list: Array<{
        id: string;
        label: string;
        image: string;
        extraPrice?: number;
      }>;
    };
  };
};
