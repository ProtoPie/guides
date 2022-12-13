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
