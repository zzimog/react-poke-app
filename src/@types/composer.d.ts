type Key = string | number;

type MapItemQta = {
  [key: Key]: number;
};

type MapSelected = {
  [key: Key]: MapItemQta;
};

type ComposerData = {
  size: number;
  selected: MapSelected;
};
