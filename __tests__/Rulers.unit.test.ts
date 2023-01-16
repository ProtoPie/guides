import Ruler, { defaultProps, RulerProps, RulerRenderOptions } from '../src/react-ruler';
import { createCanvas } from 'canvas';
// Ruler
describe('Rulers', () => {
  let rulerInstance: any;
  let renderOptions;
  beforeEach(() => {
    renderOptions = {
      isHorizontal: true,
      containerSize: 5,
      scrollPos: 2,
      zoom: 1,
      zoomUnit: 50,
      minRange: -5,
      maxRange: -1,
      mainLineSize: 4,
    };
    rulerInstance = createInstance();
  });

  it('should be defined', () => {
    expect(rulerInstance).toBeDefined();
  });

  it('should correctly get styles for the horizontal ruler', () => {
    expect(rulerInstance._rulerStyle.marginLeft).toEqual(rulerInstance._offset + 'px');
  });

  it('should correctly get style for the vertical ruler', () => {
    rulerInstance.props.type = 'vertical';
    expect(rulerInstance._rulerStyle.marginTop).toEqual(rulerInstance._offset + 'px');
  });

  it('should redraw the ruler while scrolling', () => {
    jest.spyOn(rulerInstance, 'draw').mockImplementation();
    rulerInstance.scroll(3);
    expect(rulerInstance.draw).toHaveBeenCalled();
  });

  it('should change size of the ruler with default props', () => {
    jest.spyOn(rulerInstance, 'draw').mockImplementation();
    rulerInstance.resize();
    expect(rulerInstance.canvasElement.width).toEqual(0);
    expect(rulerInstance.canvasElement.height).toEqual(0);
  });

  it('should change size of the ruler with changed default props', () => {
    rulerInstance.props.width = 4;
    rulerInstance.props.height = 2;
    jest.spyOn(rulerInstance, 'draw').mockImplementation();
    rulerInstance.resize();
    expect(rulerInstance.canvasElement.width).toEqual(8);
    expect(rulerInstance.canvasElement.height).toEqual(4);
  });

  it('should call functions for drawing ruler', () => {
    jest.spyOn(rulerInstance, 'calculateRenderOptions').mockImplementation(() => ({} as RulerRenderOptions));
    jest.spyOn(rulerInstance, 'renderBackground').mockImplementation();
    jest.spyOn(rulerInstance, 'renderRangeBackground').mockImplementation();
    jest.spyOn(rulerInstance, 'renderSegments').mockImplementation();
    jest.spyOn(rulerInstance, 'renderLabels').mockImplementation();
    rulerInstance.draw();
    expect(rulerInstance.renderBackground).toHaveBeenCalled();
    expect(rulerInstance.renderRangeBackground).toHaveBeenCalledWith({} as RulerRenderOptions);
    expect(rulerInstance.renderSegments).toHaveBeenCalledWith({} as RulerRenderOptions);
    expect(rulerInstance.renderLabels).toHaveBeenCalledWith({} as RulerRenderOptions);
  });

  it('should calculate options for rendering ruler with default props', () => {
    const props = rulerInstance.calculateRenderOptions(3, 1);
    expect(props.isHorizontal).toBeTruthy();
    expect(props.containerSize).toEqual(0);
    expect(props.zoomUnit).toEqual(50);
    expect(props.minRange).toEqual(0);
  });

  it('should calculate options for rendering ruler with changed default props', () => {
    rulerInstance.props.unit = 10;
    rulerInstance.props.type = 'vertical';
    const props = rulerInstance.calculateRenderOptions(3, 1);
    expect(props.isHorizontal).toBeFalsy();
    expect(props.containerSize).toEqual(0);
    expect(props.zoomUnit).toEqual(10);
    expect(props.maxRange).toEqual(1);
  });

  it('should render background for ruler with default props', () => {
    rulerInstance.renderBackground();
    expect(rulerInstance._canvasContext.strokeStyle).toEqual('#777777');
    expect(rulerInstance._canvasContext.fillStyle).toEqual('#ffffff');
    expect(rulerInstance._canvasContext.strokeStyle).toEqual('#777777');
  });

  it('should return text for base line with different props', () => {
    expect(rulerInstance.getCanvasTextBaseline()).toEqual('bottom');
    rulerInstance.props.direction = 'start';
    expect(rulerInstance.getCanvasTextBaseline()).toEqual('top');
    rulerInstance.props.direction = 'center';
    expect(rulerInstance.getCanvasTextBaseline()).toEqual('middle');
  });

  it('should render range background for horizontal ruler', () => {
    rulerInstance.props.range = [0, 10];
    jest.spyOn(rulerInstance, 'isRangeBackgroundActive').mockReturnValue(true);
    jest.spyOn(rulerInstance._canvasContext, 'fillRect').mockImplementation();

    expect(rulerInstance.renderRangeBackground(renderOptions)).toEqual([-2, 10]);
    expect(rulerInstance._canvasContext.fillRect).toBeCalledWith(-2, 0, 10, 5);
  });

  it('should render range background for vertical ruler', () => {
    renderOptions.isHorizontal = false;
    rulerInstance.props.range = [10, 0];
    jest.spyOn(rulerInstance, 'isRangeBackgroundActive').mockReturnValue(true);
    jest.spyOn(rulerInstance._canvasContext, 'fillRect').mockImplementation();

    expect(rulerInstance.renderRangeBackground(renderOptions)).toEqual([8, -10]);
    expect(rulerInstance._canvasContext.fillRect).toBeCalledWith(0, 8, 5, -10);
  });

  it('should not render range background', () => {
    jest.spyOn(rulerInstance, 'isRangeBackgroundActive').mockReturnValue(false);
    expect(rulerInstance.renderRangeBackground(renderOptions)).toBeUndefined();
  });

  it('should be range background activated', () => {
    rulerInstance.props.range = [10, 10];
    rulerInstance.props.rangeBackgroundColor = 'white';
    expect(rulerInstance.isRangeBackgroundActive()).toBeTruthy();
  });

  it('should not be range background activated', () => {
    expect(rulerInstance.isRangeBackgroundActive()).toBeFalsy();
  });

  describe('render segments', () => {
    it('should render segments with default units', () => {
      renderOptions.minRange = 5;
      renderOptions.maxRange = 15;
      jest.spyOn(rulerInstance, 'renderSegment').mockImplementation();
      rulerInstance.renderSegments(renderOptions);

      expect(rulerInstance.renderSegment).toBeCalledTimes(11);
    });

    it('should render segments with changed default units', () => {
      jest.spyOn(rulerInstance, 'renderSegment').mockImplementation();
      rulerInstance.props.negativeRuler = false;
      rulerInstance.renderSegments(renderOptions);

      expect(rulerInstance.renderSegment).not.toBeCalled();
    });

    it('should render a segment with default props for horizontal ruler', () => {
      rulerInstance.props.range = [-1, 2];
      rulerInstance._width = 5;
      jest.spyOn(rulerInstance, 'getSegmentMargin').mockReturnValue(0);
      jest.spyOn(rulerInstance, 'getSegmentLineSize').mockReturnValue(2);
      expect(rulerInstance.renderSegment(renderOptions, 0, 0, 4, 0, [0, 10], 0)).toEqual([0, 0, 10, 12]);
    });

    it('should render a segment with default props for vertical ruler', () => {
      rulerInstance.props.range = [-1, 2];
      rulerInstance._height = 5;
      renderOptions.isHorizontal = false;
      jest.spyOn(rulerInstance, 'getSegmentMargin').mockReturnValue(0);
      jest.spyOn(rulerInstance, 'getSegmentLineSize').mockReturnValue(2);
      expect(rulerInstance.renderSegment(renderOptions, 0, 0, 4, 0, [0, 10], 0)).toEqual([0, 2, 10, 10]);
    });

    it('should not render a segment with default props', () => {
      expect(rulerInstance.renderSegment(renderOptions, 0, 0, 4, 0, [0, 10], 2)).toBeUndefined();
    });
  });

  it('should return the size for a segment line with different parameters', () => {
    expect(rulerInstance.getSegmentLineSize(0, 1, 2, 3)).toEqual(1);
    expect(rulerInstance.getSegmentLineSize(4, 1, 2, 3)).toEqual(2);
    expect(rulerInstance.getSegmentLineSize(5, 1, 2, 3)).toEqual(3);
  });

  it('should return the margin for segment with different props', () => {
    expect(rulerInstance.getSegmentMargin(2, 4)).toEqual(2);
    rulerInstance.props.direction = 'start';
    expect(rulerInstance.getSegmentMargin(2, 4)).toEqual(0);
    rulerInstance.props.direction = 'center';
    expect(rulerInstance.getSegmentMargin(2, 4)).toEqual(1);
  });

  describe('render labels', () => {
    it('should render labels', () => {
      renderOptions.zoom = -1;
      renderOptions.zoomUnit = 5;
      renderOptions.minRange = -1;
      renderOptions.maxRange = 10;
      rulerInstance.props.range = [-10, 10];
      rulerInstance.props.unit = 0;
      rulerInstance._width = 10;
      jest.spyOn(rulerInstance, 'renderLabel').mockImplementation();
      rulerInstance.renderLabels(renderOptions);
      expect(rulerInstance.renderLabel).toBeCalledTimes(12);
    });

    it('should not render labels', () => {
      jest.spyOn(rulerInstance, 'renderLabel').mockImplementation();
      rulerInstance.renderLabels(renderOptions);
      expect(rulerInstance.renderLabel).not.toBeCalled();
    });

    it('should render label for horizontal', () => {
      jest.spyOn(rulerInstance, 'getLabelBackgroundOffset').mockReturnValue(5);
      jest.spyOn(rulerInstance, 'getLabelStartCoordinates').mockReturnValue([3, 6]);
      jest.spyOn(rulerInstance._canvasContext, 'measureText').mockReturnValue({ width: 2 });
      jest.spyOn(rulerInstance._canvasContext, 'fillRect').mockImplementation();
      jest.spyOn(rulerInstance._canvasContext, 'fillText').mockImplementation();
      rulerInstance.renderLabel(renderOptions, 1, 1);

      expect(rulerInstance._canvasContext.fillRect).toBeCalledWith(8, 0, 2, 4);
      expect(rulerInstance._canvasContext.fillText).toBeCalledWith('1', 3, 16);
    });

    it('should render label for vertical', () => {
      renderOptions.isHorizontal = false;
      rulerInstance.props.textFormat = startValue => `${startValue + 4}`;
      jest.spyOn(rulerInstance, 'getLabelBackgroundOffset').mockReturnValue(5);
      jest.spyOn(rulerInstance, 'getLabelStartCoordinates').mockReturnValue([3, 6]);
      jest.spyOn(rulerInstance._canvasContext, 'measureText').mockReturnValue({ width: 2 });
      jest.spyOn(rulerInstance._canvasContext, 'fillRect').mockImplementation();
      jest.spyOn(rulerInstance._canvasContext, 'fillText').mockImplementation();
      jest.spyOn(rulerInstance._canvasContext, 'translate').mockImplementation();
      rulerInstance.renderLabel(renderOptions, 1, 1);

      expect(rulerInstance._canvasContext.translate).toBeCalledWith(0, 6);
      expect(rulerInstance._canvasContext.fillRect).toBeCalledWith(5, 0, 2, 4);
      expect(rulerInstance._canvasContext.fillText).toBeCalledWith('5', 0, 0);
    });

    it("should return offset for label's background with different parameters", () => {
      expect(rulerInstance.getLabelBackgroundOffset('left', 2)).toEqual(0);
      expect(rulerInstance.getLabelBackgroundOffset('center', 2)).toEqual(-1);
      expect(rulerInstance.getLabelBackgroundOffset('right', 2)).toEqual(-2);
    });

    it('should return started coordinates for horizontal label with different parameters', () => {
      expect(rulerInstance.getLabelStartCoordinates(true, 5, 'center', 2)).toEqual([2, -12]);
      rulerInstance.props.direction = 'center';
      expect(rulerInstance.getLabelStartCoordinates(true, -2, 'end', -4)).toEqual([-1, -1]);
      rulerInstance.props.direction = 'start';
      expect(rulerInstance.getLabelStartCoordinates(true, 7, 'right', 0)).toEqual([-3, 17]);
    });

    it('should return started coordinates for vertical label with different parameters', () => {
      expect(rulerInstance.getLabelStartCoordinates(false, 5, 'left', 2)).toEqual([-12, -1]);
      rulerInstance.props.direction = 'center';
      expect(rulerInstance.getLabelStartCoordinates(false, -2, 'end', -4)).toEqual([-1, -7]);
      rulerInstance.props.direction = 'start';
      expect(rulerInstance.getLabelStartCoordinates(false, 7, 'right', 0)).toEqual([17, 3]);
    });
  });

  it('should return properties for dark theme', () => {
    expect(rulerInstance.currentTheme).toEqual({
      backgroundColor: '#444',
      lineColor: '#777777',
      textColor: '#FFFFFF',
      borderColor: '#777777',
    });
  });

  it('should return properties for light theme', () => {
    rulerInstance.props.theme = 'light';
    expect(rulerInstance.currentTheme).toEqual({
      backgroundColor: '#FFFFFF',
      lineColor: '#BBBBBB',
      textColor: '#BBBBBB',
      borderColor: '#BBBBBB',
    });
  });
});

function createInstance() {
  const ruler = new Ruler({ ...defaultProps } as Required<RulerProps>);
  ruler.canvasElement = document.createElement('canvas');
  const canvas = createCanvas(200, 200);
  ruler['_canvasContext'] = canvas.getContext('2d')! as any;

  return ruler;
}
