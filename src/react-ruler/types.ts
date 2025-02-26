import { IObject } from '@daybrush/utils';

/**
 * @typedef
 * @memberof Ruler
 */
export interface RulerInterface {
  /**
   * Scroll to that location. It can be used when the scrollPos prop is not used.
   * @param - scroll position
   */
  scroll(scrollPos: number): void;
  /**
   * Recalculate the style of the ruler.
   */
  resize(): void;
}

/**
 * @typedef
 * @memberof Ruler
 */
export interface RulerProps {
  /**
   * ruler's direction
   * @default "horizontal"
   */
  type?: 'horizontal' | 'vertical';
  /**
   * ruler's width
   * @default target's offsetWidth
   */
  width?: number;
  /**
   * ruler's height
   * @default target's offsetHeight
   */
  height?: number;
  /**
   * main scale unit
   * @default 50
   * @example
   * ```
   * 1px (Default) zoom: 1, unit: 50 (every 50px)
   * 1cm = 37.7952px zoom: 37.7952 unit: 1 (every 1cm)
   * 1in = 96px = 2.54cm zoom: 9 unit: 1 (every 1in)
   * ```
   */
  unit?: number;
  /**
   * zoom
   * @default 1
   * @example
   * ```
   * 1px (Default) zoom: 1, unit: 50 (every 50px)
   * 1cm = 37.7952px zoom: 37.7952 unit: 1 (every 1cm)
   * 1in = 96px = 2.54cm zoom: 9 unit: 1 (every 1in)
   * ```
   */
  zoom?: number;
  /**
   * line's direction (align)
   * @default "end"
   */
  direction?: 'start' | 'center' | 'end';
  /**
   * text align
   * @default "start"
   */
  textAlign?: 'left' | 'center' | 'right';
  /**
   * font and size
   * @default "10px sans-serif"
   */
  font?: string;
  /**
   * Number of areas to divide between two main lines
   * @default 10
   */
  segment?: number;
  /**
   * main line size
   * @default "100%"
   */
  mainLineSize?: string | number;
  /**
   * long line size
   * @default 10
   */
  longLineSize?: string | number;
  /**
   * short line size
   * @default 7
   */
  shortLineSize?: string | number;
  /**
   * line's position offset
   * @default [0, 0]
   */
  lineOffset?: number[];
  /**
   * text's position offset
   * @default [0, 0]
   */
  textOffset?: number[];
  /**
   * Whether to display the ruler in the negative direction.
   * @default true
   */
  negativeRuler?: boolean;
  /**
   * The range to show the ruler's scales
   * @default [-Infinity, Infinity]
   */
  range?: [number, number];
  /**
   * you can set scroll position by prop.
   * If you use the scrollPos prop, you can't use the scroll method.
   * @default undefined
   */
  scrollPos?: number;
  /**
   * ruler canvas style
   */
  style?: IObject<any>;
  /**
   * ruler's background color
   * @default "#333333"
   */
  backgroundColor?: string;
  /**
   * background color within range in ruler
   * @default "transparent"
   */
  rangeBackgroundColor?: string;
  /**
   * ruler's line color
   * @default "#777777"
   */
  lineColor?: string;
  /**
   * ruler's text color
   * @default "#ffffff"
   */
  textColor?: string;
  /**
   * The background color that wraps the text
   * @default "transparent"
   */
  textBackgroundColor?: string;
  /**
   * text foramt
   * @default ownself
   */
  textFormat?: (scale: number) => string;
  /**
   * portal container for other frameworks
   */
  portalContainer?: HTMLElement;
  theme?: 'dark' | 'light';
}

/**
 * @typedef
 * @memberof ThemeRuler
 */
export interface ThemeInterface {
  backgroundColor: string;
  lineColor: string;
  textColor: string;
  borderColor: string;
}

/**
 * @typedef
 * @memberof Ruler
 */
export interface RulerRenderOptions {
  isHorizontal: boolean, 
  containerSize: number, 
  scrollPos: number,  
  zoom: number, 
  zoomUnit: number, 
  minRange: number,
  maxRange: number, 
  mainLineSize: number,
}
