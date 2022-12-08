import { convertUnitSize } from '@daybrush/utils';
import * as React from 'react';

import { ref } from '../utils';
import { RulerInterface, RulerProps } from './types';

export default class Ruler extends React.PureComponent<RulerProps> implements RulerInterface {
  public static defaultProps: RulerProps = {
    type: 'horizontal',
    zoom: 1,
    width: 0,
    height: 0,
    unit: 50,
    negativeRuler: true,
    mainLineSize: '100%',
    longLineSize: 10,
    shortLineSize: 7,
    segment: 10,
    direction: 'end',
    style: { width: '100%', height: '100%' },
    backgroundColor: '#333333',
    font: '10px sans-serif',
    textColor: '#ffffff',
    textBackgroundColor: 'transparent',
    lineColor: '#777777',
    range: [-Infinity, Infinity],
    rangeBackgroundColor: 'transparent',
  };
  public divisionsElement!: HTMLElement;
  public state = {
    scrollPos: 0,
  };
  public canvasElement!: HTMLCanvasElement;
  private _canvasContext!: CanvasRenderingContext2D;
  private _width = 0;
  private _height = 0;
  private _zoom = 0;

  public render() {
    const props = this.props;
    const portalContainer = props.portalContainer;
    let portalAttributes: Record<string, any> = {};

    if ((React.version || '').indexOf('simple') > -1 && portalContainer) {
      portalAttributes = { portalContainer };
    }
    this._zoom = props.zoom!;
    return <canvas ref={ref(this, 'canvasElement')} {...portalAttributes} style={this.props.style} />;
  }
  public componentDidMount() {
    const canvas = this.canvasElement;
    const context = canvas.getContext('2d')!;

    this._canvasContext = context;

    this.resize();
  }
  public componentDidUpdate() {
    this.resize();
  }
  /**
   * @method Ruler#scroll
   * @param scrollPos
   */
  public scroll(scrollPos: number, nextZoom?: number) {
    this.draw(scrollPos, nextZoom);
  }
  /**
   * @method Ruler#resize
   */
  public resize(nextZoom?: number) {
    const canvas = this.canvasElement;
    const { width, height, scrollPos } = this.props;

    this._width = width || canvas.offsetWidth;
    this._height = height || canvas.offsetHeight;
    canvas.width = this._width * 2;
    canvas.height = this._height * 2;
    this.draw(scrollPos, nextZoom);
  }
  private draw(scrollPos: number = this.state.scrollPos, nextZoom = this._zoom) {
    this._zoom = nextZoom;
    const context = this._canvasContext;
    const props = this.props;
    const {
      unit,
      type,
      backgroundColor,
      lineColor,
      textColor,
      direction,
    } = props as Required<RulerProps>;
    const width = this._width;
    const height = this._height;
    const state = this.state;
    state.scrollPos = scrollPos;
    const isHorizontal = type === 'horizontal';
    
    const font = props.font || '10px sans-serif';
    const containerSize = isHorizontal ? height : width;
    const mainLineSize = convertUnitSize(`${props.mainLineSize || '100%'}`, containerSize);

    if (backgroundColor === 'transparent') {
      // Clear existing paths & text
      context.clearRect(0, 0, width * 2, height * 2);
    } else {
      // Draw the background
      context.rect(0, 0, width * 2, height * 2);
      context.fillStyle = backgroundColor;
      context.fill();
    }

    context.save();
    context.scale(2, 2);
    context.strokeStyle = lineColor;
    context.lineWidth = 1;
    context.font = font;
    context.fillStyle = textColor;

    switch (direction) {
      case 'start':
        context.textBaseline = 'top';
        break;
      case 'center':
        context.textBaseline = 'middle';
        break;
      case 'end':
        context.textBaseline = 'bottom';
        break;
    }

    context.translate(0.5, 0);
    context.beginPath();

    const size = isHorizontal ? width : height;
    const zoomUnit = nextZoom * unit;
    const minRange = Math.floor((scrollPos * nextZoom) / zoomUnit);
    const maxRange = Math.ceil((scrollPos * nextZoom + size) / zoomUnit);
    
    // Draw Range Background
    this.drawRangeBackground(scrollPos, nextZoom);

    // Render Segments First
    this.renderSegments(scrollPos, nextZoom, zoomUnit, minRange, mainLineSize);

    // Render Labels
    this.renderLabes(scrollPos, nextZoom, zoomUnit, minRange, maxRange, mainLineSize);
  }

  private drawRangeBackground(scrollPos: number, zoom: number) {
    const {
      type,
      range = [-Infinity, Infinity],
      rangeBackgroundColor,
    } = this.props;
    const context = this._canvasContext;
    const isHorizontal = type === 'horizontal';
    const barSize = isHorizontal ? this._height : this._width;

    if (rangeBackgroundColor !== 'transparent' && range[0] !== -Infinity && range[1] !== Infinity) {
      const rangeStart = (range[0] - scrollPos) * zoom;
      const rangeEnd = (range[1] - range[0]) * zoom;
      context.save();
      context.fillStyle = rangeBackgroundColor;
      if (isHorizontal) {
        context.fillRect(rangeStart, 0, rangeEnd, barSize);
      } else {
        context.fillRect(0, rangeStart, barSize, rangeEnd);
      }

      context.restore();
    }
  }

  private renderSegments(scrollPos: number,  zoom: number, zoomUnit: number, minRange: number, mainLineSize: number) {
    const {
      unit,
      type,
      direction,
      negativeRuler = true,
      segment = 10,
      range = [-Infinity, Infinity],
    } = this.props;
    const context = this._canvasContext;
    const isHorizontal = type === 'horizontal';
    const isNegative = negativeRuler !== false;
    const containerSize = isHorizontal ? this._height : this._width;
    const barSize = isHorizontal ? this._height : this._width;
    const size = isHorizontal ? this._width : this._height;

    for (let i = 0; i <= length; ++i) {
      const value = i + minRange;

      if (!isNegative && value < 0) {
        continue;
      }
      const startValue = value * unit;
      const startPos = (startValue - scrollPos) * zoom;
      const longLineSize = convertUnitSize(`${this.props.longLineSize || 10}`, containerSize);
      const shortLineSize = convertUnitSize(`${this.props.shortLineSize || 7}`, containerSize);
      const lineOffset = this.props.lineOffset || [0, 0];

      for (let j = 0; j < segment; ++j) {
        const pos = startPos + (j / segment) * zoomUnit;
        const value = startValue + (j / segment) * unit;

        if (pos < 0 || pos >= size || value < range[0] || value > range[1]) {
          continue;
        }

        const lineSize = j === 0 ? mainLineSize : j % 2 === 0 ? longLineSize : shortLineSize;

        let origin = 0;
        switch (direction) {
          case 'start':
            origin = 0;
            break;
          case 'center':
            origin = barSize / 2 - lineSize / 2;
            break;
          case 'end':
            origin = barSize - lineSize;
            break;
        }

        const [x1, y1] = isHorizontal ? [pos + lineOffset[0], origin + lineOffset[1]] : [origin + lineOffset[0], pos + lineOffset[1]];

        const [x2, y2] = isHorizontal ? [x1, y1 + lineSize] : [x1 + lineSize, y1];

        context.moveTo(x1 + lineOffset[0], y1 + lineOffset[1]);
        context.lineTo(x2 + lineOffset[0], y2 + lineOffset[1]);
      }
    }
    context.stroke();
  }

  private renderLabes(scrollPos: number,  zoom: number, zoomUnit: number, minRange: number, maxRange: number, mainLineSize: number) {
    const {
      unit,
      type,
      textBackgroundColor,
      direction,
      negativeRuler = true,
      textFormat,
      range = [-Infinity, Infinity],
    } = this.props;
    const context = this._canvasContext;
    const textAlign = this.props.textAlign || 'left';
    const textOffset = this.props.textOffset || [0, 0];
    const isHorizontal = type === 'horizontal';
    const isNegative = negativeRuler !== false;
    const size = isHorizontal ? this._width : this._height;
    const length = maxRange - minRange;
    const alignOffset = Math.max(['left', 'center', 'right'].indexOf(textAlign) - 1, -1);
    const barSize = isHorizontal ? this._height : this._width;

    for (let i = 0; i <= length; ++i) {
      const value = i + minRange;

      if (!isNegative && value < 0) {
        continue;
      }
      const startValue = value * unit;
      const startPos = (startValue - scrollPos) * zoom;

      if (startPos < -zoomUnit || startPos >= size + unit * zoom || startValue < range[0] || startValue > range[1]) {
        continue;
      }

      let origin = 0;
      switch (direction) {
        case 'start':
          origin = 17;
          break;
        case 'center':
          origin = barSize / 2;
          break;
        case 'end':
          origin = barSize - 17;
          break;
      }

      const [startX, startY] = isHorizontal ? [startPos + alignOffset * -3, origin] : [origin, startPos + alignOffset * 3];

      let text = `${startValue}`;

      if (textFormat) {
        text = textFormat(startValue);
      }

      context.textAlign = textAlign;

      let backgroundOffset = 0;
      const textSize = context.measureText(text).width;
      switch (textAlign) {
        case 'left':
          backgroundOffset = 0;
          break;
        case 'center':
          backgroundOffset = -textSize / 2;
          break;
        case 'right':
          backgroundOffset = -textSize;
          break;
      }

      if (isHorizontal) {
        context.save();
        context.fillStyle = textBackgroundColor;
        context.fillRect(startX + textOffset[0] + backgroundOffset, 0, textSize, mainLineSize);
        context.restore();
      } else {
        context.save();
        context.translate(0, startY + textOffset[1]);
        context.rotate(-Math.PI / 2);
        context.fillStyle = textBackgroundColor;
        context.fillRect(backgroundOffset, 0, textSize, mainLineSize);
        context.restore();
      }

      if (isHorizontal) {
        context.fillText(text, startX + textOffset[0], startY + textOffset[1]);
      } else {
        context.save();
        context.translate(startX + textOffset[0], startY + textOffset[1]);
        context.rotate(-Math.PI / 2);
        context.fillText(text, 0, 0);
        context.restore();
      }
    }

    context.restore();
  }
}
