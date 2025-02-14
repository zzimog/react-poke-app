type Key = string | number;

type MapItemQta = {
  [key: Key]: number;
};

type MapSelected = {
  [key: Key]: MapItemQta;
};

type ComposerData = {
  totalPrice: number;
  size: number;
  selected: MapSelected;
};
