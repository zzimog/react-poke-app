type MapItemQta = {
  [key: number]: number;
};

type MapSelected = {
  [key: Key]: MapItemQta;
};

type ComposerData = {
  size: number;
  selected: MapSelected;
};
