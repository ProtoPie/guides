import { convertUnitSize } from '@daybrush/utils';
import * as React from 'react';

import { ref } from '../utils';
import { RulerInterface, RulerProps, RulerRenderOptions } from './types';

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
    const renderOptions: RulerRenderOptions = this.calculateRenderOptions(scrollPos, nextZoom);

    this.renderBackground();
    this.renderRangeBackground(renderOptions);
    this.renderSegments(renderOptions);
    this.renderLabels(renderOptions);
  }

  private calculateRenderOptions(scrollPos: number, nextZoom: number): RulerRenderOptions {
    this._zoom = nextZoom;
    const props = this.props;
    const { unit, type } = props as Required<RulerProps>;
    const width = this._width;
    const height = this._height;
    const state = this.state;
    state.scrollPos = scrollPos;
    const isHorizontal = type === 'horizontal';
    const containerSize = isHorizontal ? height : width;
    const mainLineSize = convertUnitSize(`${props.mainLineSize || '100%'}`, containerSize);
    const size = isHorizontal ? width : height;
    const zoomUnit = nextZoom * unit;
    const minRange = Math.floor((scrollPos * nextZoom) / zoomUnit);
    const maxRange = Math.ceil((scrollPos * nextZoom + size) / zoomUnit);

    return {
      isHorizontal,
      containerSize,
      scrollPos,
      zoom: nextZoom,
      zoomUnit,
      minRange,
      maxRange,
      mainLineSize,
    };
  }

  private renderBackground() {
    const { backgroundColor, lineColor, textColor } = this.props as Required<RulerProps>;
    const context = this._canvasContext;
    const width = this._width;
    const height = this._height;
    const font = this.props.font || '10px sans-serif';

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
    context.textBaseline = this.getCanvasTextBaseline();
    context.translate(0.5, 0);
    context.beginPath();
  }

  private getCanvasTextBaseline(): CanvasTextBaseline {
    switch (this.props.direction) {
      case 'start':
        return 'top';
      case 'center':
        return 'middle';
      case 'end':
        return 'bottom';
    }
  }

  private renderRangeBackground(renderOptions: RulerRenderOptions) {
    const { isHorizontal, containerSize, scrollPos, zoom } = renderOptions;
    const { range = [-Infinity, Infinity], rangeBackgroundColor } = this.props;
    const context = this._canvasContext;

    if (rangeBackgroundColor !== 'transparent' && range[0] !== -Infinity && range[1] !== Infinity) {
      const rangeStart = (range[0] - scrollPos) * zoom;
      const rangeEnd = (range[1] - range[0]) * zoom;
      context.save();
      context.fillStyle = rangeBackgroundColor;
      if (isHorizontal) {
        context.fillRect(rangeStart, 0, rangeEnd, containerSize);
      } else {
        context.fillRect(0, rangeStart, containerSize, rangeEnd);
      }
      context.restore();
    }
  }

  private renderSegments(renderOptions: RulerRenderOptions) {
    const { containerSize, scrollPos, zoom, minRange, maxRange } = renderOptions;
    const { unit, negativeRuler = true, segment = 10 } = this.props;
    const context = this._canvasContext;
    const length = maxRange - minRange;
    const isNegative = negativeRuler !== false;

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
        this.renderSegment(renderOptions, startValue, startPos, longLineSize, shortLineSize, lineOffset, j);
      }
    }
    context.stroke();
  }

  private renderSegment(
    renderOptions: RulerRenderOptions,
    startValue: number,
    startPos: number,
    longLineSize: number,
    shortLineSize: number,
    lineOffset: number[],
    segmentIndex: number,
  ) {
    const { isHorizontal, containerSize, zoomUnit, mainLineSize } = renderOptions;
    const { unit, segment = 10, range = [-Infinity, Infinity] } = this.props;
    const context = this._canvasContext;
    const size = isHorizontal ? this._width : this._height;

    const pos = startPos + (segmentIndex / segment) * zoomUnit;
    const value = startValue + (segmentIndex / segment) * unit;

    if (pos < 0 || pos >= size || value < range[0] || value > range[1]) {
      return;
    }

    const lineSize = this.getSegmentLineSize(segmentIndex, mainLineSize, longLineSize, shortLineSize);
    const segmentMargin = this.getSegmentMargin(lineSize, containerSize);

    const [x1, y1] = isHorizontal
      ? [pos + lineOffset[0], segmentMargin + lineOffset[1]]
      : [segmentMargin + lineOffset[0], pos + lineOffset[1]];
    const [x2, y2] = isHorizontal ? [x1, y1 + lineSize] : [x1 + lineSize, y1];

    context.moveTo(x1 + lineOffset[0], y1 + lineOffset[1]);
    context.lineTo(x2 + lineOffset[0], y2 + lineOffset[1]);
  }

  private getSegmentLineSize(segmentIndex: number, mainLineSize: number, longLineSize: number, shortLineSize: number) {
    if(segmentIndex === 0) {
      return mainLineSize;
    }
    if(segmentIndex % 2 === 0) {
      return longLineSize;
    }
    return shortLineSize;
  }

  private getSegmentMargin(lineSize: number, containerSize: number) {
    switch (this.props.direction) {
      case 'start': 
        return 0;
      case 'center': 
        return containerSize / 2 - lineSize / 2;
      case 'end': 
        return containerSize - lineSize;
    }
  }

  private renderLabels(renderOptions: RulerRenderOptions) {
    const { isHorizontal, scrollPos, zoom, zoomUnit, minRange, maxRange } = renderOptions;
    const { unit, negativeRuler = true, range = [-Infinity, Infinity] } = this.props;
    const context = this._canvasContext;
    const isNegative = negativeRuler !== false;
    const size = isHorizontal ? this._width : this._height;
    const length = maxRange - minRange;

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

      this.renderLabel(renderOptions, startValue, startPos);
    }

    context.restore();
  }

  private renderLabel(renderOptions: RulerRenderOptions, startValue: number, startPos: number) {
    const { isHorizontal, containerSize, mainLineSize } = renderOptions;
    const { textBackgroundColor, textFormat } = this.props;
    const context = this._canvasContext;

    const textAlign = this.props.textAlign || 'left';
    const textOffset = this.props.textOffset || [0, 0];

    const [startX, startY] = this.getLabelStartCoordinates(isHorizontal, containerSize, textAlign, startPos);

    let text = `${startValue}`;

    if (textFormat) {
      text = textFormat(startValue);
    }

    context.textAlign = textAlign;

    const textSize = context.measureText(text).width;
    const backgroundOffset = this.getLabelBackgroundOffset(textAlign, textSize);

    if (isHorizontal) {
      context.save();
      context.fillStyle = textBackgroundColor;
      context.fillRect(startX + textOffset[0] + backgroundOffset, 0, textSize, mainLineSize);
      context.restore();

      context.fillText(text, startX + textOffset[0], startY + textOffset[1]);
    } else {
      context.save();
      context.translate(0, startY + textOffset[1]);
      context.rotate(-Math.PI / 2);
      context.fillStyle = textBackgroundColor;
      context.fillRect(backgroundOffset, 0, textSize, mainLineSize);
      context.restore();

      context.save();
      context.translate(startX + textOffset[0], startY + textOffset[1]);
      context.rotate(-Math.PI / 2);
      context.fillText(text, 0, 0);
      context.restore();
    }
  }

  private getLabelBackgroundOffset(textAlign: CanvasTextAlign, textSize: number): number {
    switch (textAlign) {
      case 'left':
        return 0;
      case 'center':
        return -textSize / 2;
      case 'right':
        return -textSize;
    }
  }

  private getLabelStartCoordinates(
    isHorizontal: boolean,
    containerSize: number,
    textAlign: CanvasTextAlign,
    startPos: number,
  ): [number, number] {
    let origin = 0;

    switch (this.props.direction) {
      case 'start':
        origin = 17;
        break;
      case 'center':
        origin = containerSize / 2;
        break;
      case 'end':
        origin = containerSize - 17;
    }

    const alignOffset = Math.max(['left', 'center', 'right'].indexOf(textAlign) - 1, -1);

    return isHorizontal ? [startPos + alignOffset * -3, origin] : [origin, startPos + alignOffset * 3];
  }
}
