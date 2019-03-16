export const Colors: IColor[] = [
  {text: "blue", colorLight: "rgb(96, 105, 196)", colorDark: "rgb(46, 55, 146)"},
  {text: "red", colorLight: "rgb(195, 96, 86)", colorDark: "rgb(145, 46, 46)"},
  {text: "yellow", colorLight: "rgb(195, 190, 94)", colorDark: "rgb(145, 140, 44)"},
  {text: "green", colorLight: "rgb(94, 195, 119)", colorDark: "rgb(44, 145, 69)"},
];

export interface IColor {
  text: string;
  colorLight: string;
  colorDark: string;
}