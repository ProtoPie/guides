import Gesto from 'gesto';
import { defaultProps, GUIDE } from '../src/react-guides/consts';
import Guides from '../src/react-guides/Guides';
import { GuidesProps, GuidesState, LockGuides } from '../src/react-guides/types';
import Ruler, { RulerProps } from '../src/react-ruler';

const indexOfDeletedGuide = 2;
const guidesTest: number[] = [5, -6, 3, -4.2];
const deletedGuide = guidesTest[indexOfDeletedGuide];
const selectedGuide: number = guidesTest[1];
const eventMouse: MouseEvent = new MouseEvent('click');

jest.useFakeTimers();
let isDragging = false;

// Guides
describe('Guides', () => {
  let guidesInstance: Guides = createInstance();
  beforeEach(() => {
    isDragging = false;
    guidesInstance = createInstance();
  });

  it('should be defined', () => {
    expect(guidesInstance).toBeDefined();
  });

  it('should get correctly ruler props', () => {
    expect((guidesInstance as any).rulerProps).not.toHaveProperty('style');
    expect((guidesInstance as any).rulerProps).toMatchObject({ zoom: 1 });
  });

  it('should guides be received', () => {
    guidesInstance.getGuides();
    expect(guidesInstance.state.guides).toEqual([]);
  });

  it('should guides be loaded', () => {
    guidesInstance.loadGuides(guidesTest);
    expect(guidesInstance.getGuides()).toEqual(guidesTest);
  });

  it('should clear all guides', () => {
    guidesInstance.loadGuides(guidesTest);
    guidesInstance.clearAllGuides();
    expect(guidesInstance.getGuides()).toEqual([]);
  });

  describe('selected guides', () => {
    it('should select a guide', () => {
      (guidesInstance as any).selectGuide(selectedGuide, eventMouse as any);
      expect(guidesInstance.state.selectedGuides).toEqual([selectedGuide]);
    });

    it("shouldn't select a guide", () => {
      isDragging = true;
      (guidesInstance as any).selectGuide(selectedGuide, eventMouse as any);
      expect(guidesInstance.state.selectedGuides).toEqual([]);
    });

    it('should reset a selected guide', () => {
      (guidesInstance as any).selectGuide(selectedGuide, eventMouse as any);
      guidesInstance.resetSelected();
      expect(guidesInstance.state.selectedGuides).toEqual([]);
    });

    it('should return an index of selected guide', () => {
      (guidesInstance as any).selectGuide(selectedGuide, eventMouse as any);
      expect((guidesInstance as any).getSelectedGuideIndex(guidesTest)).toEqual(1);
    });

    it('should delete a selected guide', () => {
      guidesInstance.loadGuides(guidesTest);
      const newGuides = guidesInstance.getGuides().slice();
      newGuides.splice(indexOfDeletedGuide, 1);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Backspace',
      });
      (guidesInstance as any).selectGuide(deletedGuide, eventMouse as any);
      guidesInstance.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance.state.selectedGuides).toEqual([]);
      expect(guidesInstance.getGuides()).toEqual(newGuides);
    });

    it("shouldn't delete a selected guide because of incorrect button's click", () => {
      guidesInstance.loadGuides(guidesTest);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
      });
      (guidesInstance as any).selectGuide(deletedGuide, eventMouse as any);
      guidesInstance.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance.state.selectedGuides).toEqual([deletedGuide]);
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it("shouldn't delete a selected guide because any guide isn't selected", () => {
      guidesInstance.loadGuides(guidesTest);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Backspace',
      });
      guidesInstance.deleteSelectedGuide(keyboardEvent);

      expect(guidesInstance.state.selectedGuides).toEqual([]);
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });
  });

  it("should return a name of class, given that there's not a selected guide", () => {
    expect((guidesInstance as any).currentGuideClassName(selectedGuide)).toContain(defaultProps.type);
    expect((guidesInstance as any).currentGuideClassName(selectedGuide)).not.toContain('selected');
  });

  it("should return a name of class, given that there's a selected guide", () => {
    (guidesInstance as any).selectGuide(selectedGuide, eventMouse as any);
    expect((guidesInstance as any).currentGuideClassName(selectedGuide)).toContain(defaultProps.type);
    expect((guidesInstance as any).currentGuideClassName(selectedGuide)).toContain('selected');
  });

  it('should calculate the transform property of style for a horizontal guide', () => {
    expect((guidesInstance as any).calcHorizontalTransform(4)).toMatch(/-21/);
  });

  it('should calculate the transform property of style for a vertical guide', () => {
    expect((guidesInstance as any).calcVerticalTransform(4)).toMatch(/-56/);
  });

  it('should hide a position of drag number', () => {
    (guidesInstance as any).hideDragPosition();
    expect((guidesInstance as any).displayElement.style.display).toEqual('none');
  });

  describe('delete a guide', () => {
    it('should delete a guide after drags it to the top', () => {
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
      (guidesInstance as any).removeGuide(event as any);
      expect(guidesInstance.getGuides()).toEqual(newGuides);
    });

    it("shouldn't delete guide after drags it to the top", () => {
      guidesInstance.loadGuides(guidesTest);
      defaultProps.lockGuides = true;
      const element = document.createElement('div');
      element.setAttribute('data-index', indexOfDeletedGuide.toString());
      const event = {
        datas: {
          target: element,
        },
      };
      expect((guidesInstance as any).removeGuide(event as any)).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });

    it("shouldn't delete guide after drags it to the top because lockGuides is [remove]", () => {
      guidesInstance.loadGuides(guidesTest);
      defaultProps.lockGuides = ['remove'];
      const element = document.createElement('div');
      element.setAttribute('data-index', indexOfDeletedGuide.toString());
      const event = {
        datas: {
          target: element,
        },
      };
      expect((guidesInstance as any).removeGuide(event as any)).toBeUndefined();
      expect(guidesInstance.getGuides()).toEqual(guidesTest);
    });
  });

  it('should call scroll function for ruler', () => {
    jest.spyOn(guidesInstance.ruler, 'scroll').mockImplementation();
    guidesInstance.scroll(selectedGuide);
    expect(guidesInstance.ruler.scroll).toHaveBeenCalled();
  });

  it('should call resize function for ruler', () => {
    jest.spyOn(guidesInstance!.ruler, 'resize').mockImplementation();
    guidesInstance.resize();
    expect(guidesInstance.ruler.resize).toHaveBeenCalled();
  });

  describe('dragStart', () => {
    it('should create a guide from ruler, when drag is started from ruler', () => {
      const element = document.createElement('canvas');
      guidesInstance.ruler.canvasElement = element;
      jest.spyOn(guidesInstance as any, 'createFromRuler').mockImplementation();
      jest.spyOn(guidesInstance as any, 'offsetPosition').mockImplementation();
      jest.spyOn(guidesInstance as any, 'matrix', 'get').mockImplementation();
      const event = {
        inputEvent: {
          target: element,
        },
        datas: {
          offsetPos: [1, 9],
          matrix: 1,
        },
      };
      (guidesInstance as any).dragStart(event as any);
      expect((guidesInstance as any).createFromRuler).toHaveBeenCalled();
    });

    it('should change existing guide if this guide starts to drag', () => {
      const element = document.createElement('div');
      element.classList.add(GUIDE);
      jest.spyOn(guidesInstance as any, 'startChangeExistGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'offsetPosition').mockImplementation();
      jest.spyOn(guidesInstance as any, 'matrix', 'get').mockImplementation();
      const event = {
        inputEvent: {
          target: element,
        },
        datas: {
          offsetPos: [1, 9],
          matrix: 1,
        },
      };
      (guidesInstance as any).dragStart(event as any);
      expect((guidesInstance as any).startChangeExistGuide).toHaveBeenCalled();
    });

    it('should call dragStar function when drag triggers event onDragStart', () => {
      defaultProps.lockGuides = false;
      jest.spyOn(guidesInstance as any, 'dragStart').mockImplementation();
      (guidesInstance as any).onDragStart({} as any);
      expect((guidesInstance as any).dragStart).toHaveBeenCalled();
    });

    it("shouldn't call dragStar function when drag triggers event onDragStart", () => {
      defaultProps.lockGuides = true;
      const event = {
        stop() {},
      };
      jest.spyOn(guidesInstance as any, 'dragStart').mockImplementation();
      expect((guidesInstance as any).onDragStart(event as any)).toBeUndefined();
      expect((guidesInstance as any).dragStart).not.toHaveBeenCalled();
    });
  });

  describe('dargEnd', () => {
    it('should create a guide when drag is finished', () => {
      jest.spyOn(guidesInstance as any, 'createGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'getGuidesPosition').mockImplementation();
      const element = document.createElement('div');
      const event = {
        datas: {
          target: element,
          fromRuler: true,
        },
      };
      (guidesInstance as any).dragEnd(event as any);
      expect((guidesInstance as any).createGuide).toHaveBeenCalled();
    });

    it('should remove a guide when drag is finished', () => {
      jest.spyOn(guidesInstance as any, 'removeGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'getGuidesPosition').mockImplementation(() => guidesInstance.scrollPos - 1);
      const event = {
        datas: {
          fromRuler: false,
        },
      };
      (guidesInstance as any).dragEnd(event as any);
      expect((guidesInstance as any).removeGuide).toHaveBeenCalled();
    });

    it('should change an existing guide when drag is finished', () => {
      guidesInstance.loadGuides(guidesTest);
      jest.spyOn(guidesInstance as any, 'changeGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'getGuidesPosition').mockImplementation(() => selectedGuide);
      guidesInstance!.scrollPos = selectedGuide - 5;
      const event = {
        datas: {
          fromRuler: false,
        },
      };
      (guidesInstance as any).dragEnd(event as any);
      expect((guidesInstance as any).changeGuide).toHaveBeenCalled();
    });
  });

  it('should return styles for transform position', () => {
    expect((guidesInstance as any).transformPosition(3)).toContain(((defaultProps as Required<GuidesProps>).zoom * 3).toString());
  });

  it("should display a guide's position", () => {
    defaultProps.displayGuidePos = true;
    expect((guidesInstance as any).displayGuidePosition(1)).toBeDefined();
  });

  it("shouldn't display a guide's position", () => {
    defaultProps.displayGuidePos = false;
    expect((guidesInstance as any).displayGuidePosition(1)).toBeUndefined();
  });

  it("shouldn't disable pointer events on scroll", () => {
    defaultProps.showGuides = false;
    expect((guidesInstance as any).disablePointerEventsOnScroll()).toBeUndefined();
  });

  it('should disable pointer events on scroll', () => {
    defaultProps.showGuides = true;
    expect((guidesInstance as any).disablePointerEventsOnScroll()).toEqual('none');
  });

  it('should calculate the number of current guide pos', () => {
    defaultProps.zoom = 1;
    defaultProps.digit = 0;
    const nextPos = 5;
    const result = 5;
    expect((guidesInstance as any).currentGuidePos(nextPos)).toBe(result);
  });

  it('should calculate the number of current guide position', () => {
    const position = 5;
    const zoom = 2;
    defaultProps.digit = undefined;
    expect((guidesInstance as any).calcGuidePosition(position, zoom)).toEqual(3);
  });

  it("should return guide's position", () => {
    jest.spyOn(guidesInstance as any, 'drag').mockImplementation(() => 3);
    jest.spyOn(guidesInstance as any, 'calcGuidePosition').mockImplementation();
    (guidesInstance as any).getGuidesPosition({} as any);
    expect((guidesInstance as any).calcGuidePosition).toBeCalledWith(3, defaultProps.zoom);
  });

  it('should return true value for lock guides if type considers in lockGuides', () => {
    const lockGuides: LockGuides = ['add'];
    expect((guidesInstance as any).isLockType(lockGuides, 'add')).toBeTruthy();
  });

  it("should return false value for lock guides if type doesn't consider in lockGuides", () => {
    const lockGuides: LockGuides = ['add'];
    expect((guidesInstance as any).isLockType(lockGuides, 'added')).toBeFalsy();
  });

  it('should return translate style if displayDragPos is true', () => {
    defaultProps.displayDragPos = true;
    const result = 'translate(-64px, 0px) rotate(-90deg)';
    jest.spyOn(guidesInstance as any, 'isHorizontal', 'get').mockImplementation(() => true);
    jest.spyOn(guidesInstance as any, 'calcHorizontalTransform').mockImplementation(() => result);
    expect((guidesInstance as any).showDragPosition(1, 1)).toEqual(result);
  });

  it("shouldn't return translate style if displayDragPos is false", () => {
    defaultProps.displayDragPos = false;
    expect((guidesInstance as any).showDragPosition(1, 1)).toBeUndefined();
  });
});

function createInstance(): Guides {
  const guides: Guides = new Guides(defaultProps as Required<GuidesProps>);
  guides.setState = setState;
  guides['displayElement'] = document.createElement('div');
  guides['guidesElement'] = document.createElement('div');
  guides['gesto'] = createGesto();
  guides.ruler = new Ruler({} as RulerProps);

  return guides;
}

function setState(state: GuidesState) {
  this.state = {
    guides: state.guides || this.state.guides,
    selectedGuides: state.selectedGuides || this.state.selectedGuides,
  };
}

function createGesto() {
  class GestoTest extends Gesto {
    isDragging() {
      return isDragging;
    }
  }

  return new GestoTest(document.createElement('div'));
}
