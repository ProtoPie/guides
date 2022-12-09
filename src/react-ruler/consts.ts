import { RulerInterface, RulerProps } from './types';

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

export const DARK_THEME = {
  backgroundColor: '#444',
  lineColor: '#777777',
  textColor: '#FFFFFF'
}
export const LIGHT_THEME = {
  backgroundColor: '#FFFFFF',
  lineColor: '#BBBBBB',
  textColor: '#BBBBBB'
}
