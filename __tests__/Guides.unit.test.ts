import * as _ from 'css-to-mat';
import Gesto from 'gesto';
import { defaultProps, DRAGGING, GUIDE } from '../src/react-guides/consts';
import Guides from '../src/react-guides/Guides';
import { GuidesProps, GuidesState, LockGuides } from '../src/react-guides/types';
import Ruler, { RulerProps } from '../src/react-ruler';

const indexOfDeletedGuide = 2;
const guidesTest: number[] = [5, -6, 3, -4.2];
const deletedGuide = guidesTest[indexOfDeletedGuide];
const selectedGuide: number = guidesTest[1];
const eventMouse: MouseEvent = new MouseEvent('click');

// Guides
describe('Guides', () => {
  let guidesInstance: any;
  beforeEach(() => {
    guidesInstance = createInstance(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guidesInstance).toBeDefined();
  });

  it('should correctly get ruler\'s props', () => {
    expect(guidesInstance.rulerProps).not.toHaveProperty('style');
    expect(guidesInstance.rulerProps).toMatchObject({ zoom: 1 });
  });

  it('should get all guides', () => {
    guidesInstance.getGuides();
    expect(guidesInstance.state.guides).toEqual([]);
  });

  it('should load guides', () => {
    guidesInstance.loadGuides(guidesTest);
    expect(guidesInstance.getGuides()).toEqual(guidesTest);
  });

  describe('update guides when window is scrolling', () => {
    it('should change style for each guide when window scrolls', () => {
      jest.spyOn(guidesInstance, 'shouldShowGuide').mockImplementation();
      guidesInstance.scrollGuides(2);
      expect(guidesInstance.shouldShowGuide).toHaveBeenCalledTimes(guidesInstance.guideElements.length);
      expect(guidesInstance.scrollPos).toEqual(2);
    });
  
    it('should hide a guide if its position is outside the bounds of the scrolled window', () => {
      guidesInstance.loadGuides([2]);
      guidesInstance.scrollPos = 3;
      const element = document.createElement('div');
      expect(guidesInstance.shouldShowGuide(element, 0)).toEqual('none');
    });
  
    it('should show a guide if its position is inside the bounds of the scrolled window', () => {
      guidesInstance.loadGuides([2]);
      guidesInstance.scrollPos = -3;
      const element = document.createElement('div');
      expect(guidesInstance.shouldShowGuide(element, 0)).toEqual('block');
    });
  
    it('shouldn\'t change style display for guides because they aren\'t existing', () => {
      expect(guidesInstance.shouldShowGuide(null, 0)).toBeUndefined();
    });
  });

  describe('selected guide', () => {
    it('should select a guide', () => {
      jest.spyOn(guidesInstance.gesto, 'isDragging').mockReturnValue(false);
      guidesInstance.selectGuide(selectedGuide, eventMouse);
      expect(guidesInstance.state.selectedGuides).toEqual([selectedGuide]);
    });

    it('shouldn\'t select a guide', () => {
      jest.spyOn(guidesInstance.gesto, 'isDragging').mockReturnValue(true);
      guidesInstance.selectGuide(selectedGuide, eventMouse);
      expect(guidesInstance.state.selectedGuides).toEqual([]);
    });

    it('should reset a selected guide', () => {
      guidesInstance.selectGuide(selectedGuide, eventMouse);
      guidesInstance.resetSelected();
      expect(guidesInstance.state.selectedGuides).toEqual([]);
    });

    it('should return an index of selected guide', () => {
      guidesInstance.selectGuide(selectedGuide, eventMouse);
      expect(guidesInstance.getSelectedGuideIndex(guidesTest)).toEqual(1);
    });

    it('should delete a selected guide because a button Backspace was pressed', () => {
      guidesInstance.loadGuides(guidesTest);
      const newGuides = guidesInstance.getGuides().slice();
      newGuides.splice(indexOfDeletedGuide, 1);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Backspace',
      });
      guidesInstance.selectGuide(deletedGuide, eventMouse);
      guidesInstance.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance.state.selectedGuides).toEqual([]);
      expect(guidesInstance.getGuides()).toEqual(newGuides);
    });

    it('shouldn\'t delete a selected guide because of incorrect button\'s click', () => {
      guidesInstance.loadGuides(guidesTest);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
      });
      guidesInstance.selectGuide(deletedGuide, eventMouse);
      guidesInstance.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance.state.selectedGuides).toEqual([deletedGuide]);
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it('shouldn\'t delete a guide because none of the guides isn\'t selected', () => {
      guidesInstance.loadGuides(guidesTest);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Backspace',
      });
      guidesInstance.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance.state.selectedGuides).toEqual([]);
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });
  });

  it('should return a name of class for an unselected guide', () => {
    expect(guidesInstance.currentGuideClassName(selectedGuide)).toContain(defaultProps.type);
    expect(guidesInstance.currentGuideClassName(selectedGuide)).not.toContain('selected');
  });

  it('should return a name of class for a selected guide', () => {
    guidesInstance.selectGuide(selectedGuide, eventMouse);
    expect(guidesInstance.currentGuideClassName(selectedGuide)).toContain(defaultProps.type);
    expect(guidesInstance.currentGuideClassName(selectedGuide)).toContain('selected');
  });

  it('should calculate the transform style for a horizontal guide', () => {
    const testData = [4, -2, 5, 14, -65, 231, 0];
    const resultData = [-21, -27, -20, -11, -90, 206, -25];
    testData.forEach((item, i) => {
      expect(guidesInstance.calcHorizontalTransform(item)).toMatch(`${resultData[i]}`);
    });
  });

  it('should calculate the transform style for a vertical guide', () => {
    const testData = [4, -2, 5, 14, -65, 231, 0];
    const resultData = [-56, -62, -55, -46, -125, 171, -60];
    testData.forEach((item, i) => {
      expect(guidesInstance.calcVerticalTransform(item)).toMatch(`${resultData[i]}`);
    });
  });

  it('should hide a position of drag number', () => {
    guidesInstance.hideDragPosition();
    expect(guidesInstance.displayElement.style.display).toEqual('none');
  });

  describe('delete a guide', () => {
    it('should clear all guides', () => {
      guidesInstance.loadGuides(guidesTest);
      guidesInstance.clearAllGuides();
      expect(guidesInstance.getGuides()).toEqual([]);
    });

    it('should delete a guide when it dragged to the ruler', () => {
      guidesInstance.loadGuides(guidesTest);
      const newGuides = guidesInstance.getGuides().slice();
      newGuides.splice(indexOfDeletedGuide, 1);
      const element = document.createElement('div');
      element.setAttribute('data-index', indexOfDeletedGuide.toString());
      const event = {
        datas: {
          target: element,
        },
      };
      guidesInstance.removeGuide(event);
      expect(guidesInstance.getGuides()).toEqual(newGuides);
    });

    it('shouldn\'t delete a guide when it dragged to the ruler because guides are locked', () => {
      guidesInstance.loadGuides(guidesTest);
      guidesInstance.props.lockGuides = true;
      const element = document.createElement('div');
      element.setAttribute('data-index', indexOfDeletedGuide.toString());
      const event = {
        datas: {
          target: element,
        },
      };
      expect(guidesInstance.removeGuide(event)).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it('shouldn\'t delete a guide when it dragged to the ruler because lockGuides is [remove]', () => {
      guidesInstance.loadGuides(guidesTest);
      guidesInstance.props.lockGuides = ['remove'];
      expect(guidesInstance.removeGuide({})).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });
  });

  it('should update the ruler scroll', () => {
    jest.spyOn(guidesInstance.ruler, 'scroll').mockImplementation();
    guidesInstance.scroll(selectedGuide);
    expect(guidesInstance.ruler.scroll).toHaveBeenCalled();
  });

  it('should update rulers on resizee', () => {
    jest.spyOn(guidesInstance.ruler, 'resize').mockImplementation();
    guidesInstance.resize();
    expect(guidesInstance.ruler.resize).toHaveBeenCalled();
  });

  describe('actions when the guide starts to be dragged', () => {
    it('should call function to create a guide from ruler, when drag is started from ruler', () => {
      const element = document.createElement('canvas');
      guidesInstance.ruler.canvasElement = element;
      jest.spyOn(guidesInstance, 'createFromRuler').mockImplementation();
      jest.spyOn(guidesInstance, 'offsetPosition').mockImplementation();
      jest.spyOn(guidesInstance, 'matrix', 'get').mockImplementation();
      const event = {
        inputEvent: {
          target: element,
        },
        datas: {
          offsetPos: [1, 9],
          matrix: 1,
        },
      };
      guidesInstance.dragStart(event);
      expect(guidesInstance.createFromRuler).toHaveBeenCalled();
    });

    it('shouldn\'t create a guide from the ruler', () => {
      const event = {
        datas: {},
      };
      jest.spyOn(guidesInstance, 'isLockType').mockReturnValue(false);
      expect(guidesInstance.createFromRuler(event)).toBeTruthy();
    });

    it('shouldn\'t create a guide from the ruler because it is locked', () => {
      const event = {
        stop() {},
      };
      jest.spyOn(guidesInstance, 'isLockType').mockReturnValue(true);
      expect(guidesInstance.createFromRuler(event)).toBeUndefined();
    });

    it('should call function to change the existing guide when it guide starts to drag', () => {
      const element = document.createElement('div');
      element.classList.add(GUIDE);
      jest.spyOn(guidesInstance, 'startChangeExistGuide').mockImplementation();
      jest.spyOn(guidesInstance, 'offsetPosition').mockImplementation();
      jest.spyOn(guidesInstance, 'matrix', 'get').mockImplementation();
      const event = {
        inputEvent: {
          target: element,
        },
        datas: {
          offsetPos: [1, 9],
          matrix: 1,
        },
      };
      guidesInstance.dragStart(event);
      expect(guidesInstance.startChangeExistGuide).toHaveBeenCalled();
    });

    it('should change the existing guide', () => {
      const element = document.createElement('div');
      const event = {
        stop() {},
        inputEvent: {
          target: element,
        },
        datas: {},
      };
      jest.spyOn(guidesInstance, 'isLockType').mockReturnValue(false);
      expect(guidesInstance.startChangeExistGuide(event)).toBeFalsy();
    });

    it('shouldn\'t change existing guide', () => {
      const element = document.createElement('div');
      const event = {
        stop() {},
        inputEvent: {
          target: element,
        },
      };
      jest.spyOn(guidesInstance, 'isLockType').mockReturnValue(true);
      expect(guidesInstance.startChangeExistGuide(event)).toBeUndefined();
    });

    it('should call the function for choose actions when a guide only starts to drag', () => {
      jest.spyOn(guidesInstance, 'dragStart').mockImplementation();
      guidesInstance.onDragStart({});
      expect(guidesInstance.dragStart).toHaveBeenCalled();
    });

    it('shouldn\'t call the function for choose actions when a guide only starts to drag', () => {
      guidesInstance.props.lockGuides = true;
      const event = {
        stop() {},
      };
      jest.spyOn(guidesInstance, 'dragStart').mockImplementation();
      expect(guidesInstance.onDragStart(event)).toBeUndefined();
      expect(guidesInstance.dragStart).not.toHaveBeenCalled();
    });
  });

  it('should add dragging class when guide starts to drag', () => {
    const element = document.createElement('div');
    jest.spyOn(guidesInstance, 'drag').mockImplementation();
    const event = {
      isDrag: true,
      datas: {
        target: element,
      },
    };
    guidesInstance.onDrag(event);
    expect(guidesInstance.drag).toHaveBeenCalled();
    expect(event.datas.target.classList.contains(DRAGGING)).toBeTruthy();
    expect(guidesInstance._isFirstMove).toBeFalsy();
  });

  it('shouldn\'t add dragging class when guide starts to drag', () => {
    const element = document.createElement('div');
    guidesInstance._isFirstMove = false;
    jest.spyOn(guidesInstance, 'drag').mockImplementation();
    const event = {
      isDrag: true,
      datas: {
        target: element,
      },
    };
    guidesInstance.onDrag(event);
    expect(guidesInstance.drag).toHaveBeenCalled();
    expect(event.datas.target.classList.contains(DRAGGING)).toBeFalsy();
  });

  describe('actions when the guide finished dragging', () => {
    it('should call none of functions when finished dragging', () => {
      const event = {
        isDrag: false,
      };
      expect(guidesInstance.onDragEnd(event)).toBeUndefined();
    });

    it('should delete dragging class and call the function for choose actions when a guide finished dragging', () => {
      const element = document.createElement('div');
      element.classList.add(DRAGGING);
      jest.spyOn(guidesInstance, 'hideDragPosition').mockImplementation();
      jest.spyOn(guidesInstance, 'dragEnd').mockImplementation();
      const event = {
        isDrag: true,
        datas: {
          target: element,
        },
      };
      guidesInstance.onDragEnd(event);
      expect(event.datas.target.classList.contains(DRAGGING)).toBeFalsy();
      expect(guidesInstance.dragEnd).toHaveBeenCalled();
    });

    it('should call the function for creating a guide when dragging is finished', () => {
      jest.spyOn(guidesInstance, 'createGuide').mockImplementation();
      jest.spyOn(guidesInstance, 'getGuidesPosition').mockImplementation();
      const element = document.createElement('div');
      const event = {
        datas: {
          target: element,
          fromRuler: true,
        },
      };
      guidesInstance.dragEnd(event);
      expect(guidesInstance.createGuide).toHaveBeenCalled();
    });

    it('should create a new guide when dragging is finished', () => {
      guidesInstance.props.scrollPos = 0;
      jest.spyOn(guidesInstance, 'getGuidesPosition').mockReturnValue(2);

      expect(guidesInstance.createGuide({})).toEqual(2);
      expect(guidesInstance.getGuides()).toEqual([2]);
    });

    it('shouldn\'t create a new guide when dragging is finished', () => {
      guidesInstance.loadGuides(guidesTest);
      guidesInstance.props.scrollPos = guidesTest[2] + 3;
      jest.spyOn(guidesInstance, 'getGuidesPosition').mockReturnValue(guidesTest[2]);

      expect(guidesInstance.createGuide({})).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it('should call the function for remove a guide when dragging is finished', () => {
      jest.spyOn(guidesInstance, 'removeGuide').mockImplementation();
      jest.spyOn(guidesInstance, 'getGuidesPosition').mockImplementation(() => guidesInstance.scrollPos - 1);
      const event = {
        datas: {
          fromRuler: false,
        },
      };
      guidesInstance.dragEnd(event);
      expect(guidesInstance.removeGuide).toHaveBeenCalled();
    });

    it('should call the function for change an existing guide when dragging is finished', () => {
      guidesInstance.loadGuides(guidesTest);
      jest.spyOn(guidesInstance, 'changeGuide').mockImplementation();
      jest.spyOn(guidesInstance, 'getGuidesPosition').mockImplementation(() => selectedGuide);
      guidesInstance.scrollPos = selectedGuide - 5;
      const event = {
        datas: {
          fromRuler: false,
        },
      };
      guidesInstance.dragEnd(event);
      expect(guidesInstance.changeGuide).toHaveBeenCalled();
    });

    it('should change an existing guide when dragging is finished', () => {
      guidesInstance.loadGuides(guidesTest);
      const event = {
        datas: {
          target: document.createElement('div'),
        },
      };
      jest.spyOn(guidesInstance, 'getGuidesPosition').mockImplementation(() => guidesTest[2]);
      expect(guidesInstance.changeGuide(event)).toEqual(guidesTest[2]);
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it('shouldn\'t change an existing guide when dragging is finished', () => {
      guidesInstance.props.lockGuides = true;
      guidesInstance.loadGuides(guidesTest);
      expect(guidesInstance.changeGuide({})).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it('shouldn\'t change an existing guide when dragging is finished because lockGuides is [change]', () => {
      guidesInstance.loadGuides(guidesTest);
      guidesInstance.props.lockGuides = ['change'];
      expect(guidesInstance.changeGuide({})).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });
  });

  it('should calculate the transform position of a guide', () => {
    expect(guidesInstance.transformPosition(3)).toContain(((defaultProps as Required<GuidesProps>).zoom * 3).toString());
  });

  it('should show a number of drag position', () => {
    guidesInstance.props.displayGuidePos = true;
    expect(guidesInstance.displayGuidePosition(1)).toBeDefined();
  });

  it('shouldn\'t show a number of drag position', () => {
    expect(guidesInstance.displayGuidePosition(1)).toBeUndefined();
  });

  it('shouldn\'t disable pointer events on the scroll', () => {
    guidesInstance.props.showGuides = false;
    expect(guidesInstance.disablePointerEventsOnScroll()).toBeUndefined();
  });

  it('should disable pointer events on the scroll', () => {
    expect(guidesInstance.disablePointerEventsOnScroll()).toEqual('none');
  });

  it('should calculate the value of the current guide pos', () => {
    const nextPos = 5;
    const result = 5;
    expect(guidesInstance.currentGuidePos(nextPos)).toBe(result);
  });

  it('should calculate the value of the current guide position', () => {
    const position = 5;
    const zoom = 2;
    guidesInstance.props.digit = undefined;
    expect(guidesInstance.calcGuidePosition(position, zoom)).toEqual(3);
  });

  it('should return the value of the current guide\'s position', () => {
    jest.spyOn(guidesInstance, 'drag').mockImplementation(() => 3);
    jest.spyOn(guidesInstance, 'calcGuidePosition').mockImplementation();
    guidesInstance.getGuidesPosition({});
    expect(guidesInstance.calcGuidePosition).toBeCalledWith(3, defaultProps.zoom);
  });

  it('should lock the type of action for the guide because current type is existing', () => {
    const lockGuides: LockGuides = ['add'];
    expect(guidesInstance.isLockType(lockGuides, 'add')).toBeTruthy();
  });

  it('shouldn\'t lock the type of action for the guide because current type is not existing', () => {
    const lockGuides: LockGuides = ['add'];
    expect(guidesInstance.isLockType(lockGuides, 'added')).toBeFalsy();
  });

  it('should show the value of current guide when it dragging', () => {
    const result = 'translate(-64px, 0px) rotate(-90deg)';
    jest.spyOn(guidesInstance, 'isHorizontal', 'get').mockImplementation(() => true);
    jest.spyOn(guidesInstance, 'calcHorizontalTransform').mockImplementation(() => result);
    expect(guidesInstance.showDragPosition(1, 1)).toEqual(result);
  });

  it('shouldn\'t show the value of current guide when it dragging because it blocked', () => {
    guidesInstance.props.displayDragPos = false;
    expect(guidesInstance.showDragPosition(1, 1)).toBeUndefined();
  });

  it('should return the next value of position for a guide', () => {
    const target = document.createElement('div');
    jest.spyOn(guidesInstance, 'getCurrentAndNextPosition').mockReturnValue({
      nextPos: 4,
    });
    const event = {
      datas: {
        fromRuler: false,
        target,
      },
    };
    expect(guidesInstance.drag(event)).toEqual(4);
  });

  it('should calculate offset position for a guide', () => {
    guidesInstance.scrollPos = 1;
    guidesInstance.props.zoom = 2;
    jest.spyOn(guidesInstance.originElement, 'getBoundingClientRect');
    jest.spyOn(_, 'calculateMatrixDist').mockReturnValue([-2, 3]);
    jest.spyOn(guidesInstance, 'matrix', 'get').mockImplementation();
    expect(guidesInstance.offsetPosition({})).toEqual([-2, 5]);
  });

  it('should sort snaps treschold when default snaps are not empty', () => {
    const snaps = [
      [3, 8, 1, 7, 5],
      [4, 1, -3],
      [-2, 12, -8],
      [0, -9],
      [6, -5, 8],
    ];
    const guidePos = [4, -1, 2, -7, 3];
    const snapsSort = [
      [3, 5, 1, 7, 8],
      [1, -3, 4],
      [-2, 12, -8],
      [-9, 0],
      [6, 8, -5],
    ];

    snaps.forEach((item, i) => {
      guidesInstance.props.snaps = item;
      expect(guidesInstance.sortSnapsTresholdToClosesGuide(guidePos[i])).toEqual(snapsSort[i]);
    });
  });

  it('should sort snaps treschold when default snaps are empty', () => {
    expect(guidesInstance.sortSnapsTresholdToClosesGuide(4)).toEqual([]);
  });

  it('should calculate current and next positions of a guide', () => {
    const event = {
      datas: {
        matrix: [1, 0],
        offsetPos: [3, 3],
      },
      distY: 4,
      distX: 5,
    };
    jest.spyOn(_, 'calculateMatrixDist').mockReturnValue([2, 1]);
    jest.spyOn(guidesInstance, 'currentGuidePos').mockReturnValue(2);
    jest.spyOn(guidesInstance, 'sortSnapsTresholdToClosesGuide').mockReturnValue([]);
    expect(guidesInstance.getCurrentAndNextPosition(event)).toEqual({
      nextPos: 4,
      guidePos: 2,
    });
  });

  it('should calculate current and next positions with guide snaps', () => {
    const event = {
      datas: {
        matrix: [1, 0],
        offsetPos: [3, 3],
      },
      distY: 4,
      distX: 5,
    };
    guidesInstance.snapThreshold = 10;
    jest.spyOn(_, 'calculateMatrixDist').mockReturnValue([2, 1]);
    jest.spyOn(guidesInstance, 'sortSnapsTresholdToClosesGuide').mockReturnValue([0, 1]);
    expect(guidesInstance.getCurrentAndNextPosition(event)).toEqual({
      nextPos: 0,
      guidePos: 0,
    });
  });
});

function createInstance(): Guides {
  const guides: Guides = new Guides({...defaultProps} as Required<GuidesProps>);
  const elementsGuide: any = [];
  elementsGuide.push('<div></div>', '<div></div>');
  guides.setState = setState;
  guides['displayElement'] = document.createElement('div');
  guides['guidesElement'] = document.createElement('div');
  guides['gesto'] = createGesto();
  guides['originElement'] = document.createElement('div');
  guides.ruler = new Ruler({} as RulerProps);
  guides['guideElements'] = elementsGuide;
  guides['_isFirstMove'] = true;
  
  return guides;
}

function setState(state: GuidesState) {
  this.state = {
    guides: state.guides || this.state.guides,
    selectedGuides: state.selectedGuides || this.state.selectedGuides,
  };
}

function createGesto() {
  class GestoTest extends Gesto {};
  return new GestoTest(document.createElement('div'));
}
