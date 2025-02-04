export const breakpoints: {
  [key: string]: number;
} = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const mediaQuery = (bp: string) => {
  const value = breakpoints[bp];
  return `@media (min-width: ${value}px)`;
};

export default mediaQuery;
