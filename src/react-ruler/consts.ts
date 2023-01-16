import { RulerInterface, RulerProps, ThemeInterface } from './types';

export const PROPERTIES: Array<keyof RulerProps> = [
  'type',
  'width',
  'height',
  'unit',
  'zoom',
  'direction',
  'textAlign',
  'font',
  'segment',
  'mainLineSize',
  'longLineSize',
  'shortLineSize',
  'lineOffset',
  'textOffset',
  'negativeRuler',
  'range',
  'scrollPos',
  'style',
  'backgroundColor',
  'rangeBackgroundColor',
  'lineColor',
  'textColor',
  'textBackgroundColor',
  'textFormat',
  'portalContainer',
  'theme',
];
export const METHODS: Array<keyof RulerInterface> = ['scroll', 'resize'];

export const DARK_THEME: ThemeInterface = {
  backgroundColor: '#444',
  lineColor: '#777777',
  textColor: '#FFFFFF',
  borderColor: '#777777',
}

export const LIGHT_THEME: ThemeInterface = {
  backgroundColor: '#FFFFFF',
  lineColor: '#BBBBBB',
  textColor: '#BBBBBB',
  borderColor: '#BBBBBB',
}

export const defaultProps: RulerProps = {
  type: 'horizontal',
  zoom: 1,
  width: 0,
  height: 0,
  unit: 50,
  negativeRuler: true,
  mainLineSize: 4,
  longLineSize: 10,
  shortLineSize: 7,
  segment: 1,
  direction: 'end',
  textAlign: 'center',
  style: { zIndex: 10 },
  backgroundColor: '#333333',
  font: '10px Inter, sans-serif',
  textColor: '#ffffff',
  textBackgroundColor: 'transparent',
  lineColor: '#777777',
  range: [-Infinity, Infinity],
  rangeBackgroundColor: 'transparent',
  theme: 'dark',
};