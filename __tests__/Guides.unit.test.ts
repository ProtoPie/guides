import Gesto from 'gesto';
import { defaultProps, GUIDE } from '../src/react-guides/consts';
import Guides from '../src/react-guides/Guides';
import { GuidesProps, GuidesState } from '../src/react-guides/types';
import Ruler, { RulerProps } from '../src/react-ruler';

const defaultGuides: number[] = [];
const indexOfDeletedGuide = 2;
let guidesTest: number[] = [5, -6, 3, -4.2];
const deletedGuide = guidesTest[indexOfDeletedGuide];
let selectedGuide: number = guidesTest[1];
let eventMouse: MouseEvent = new MouseEvent('click');
let isDragging = false;

// Guides
describe('Guides', () => {
  let guidesInstance: Guides | null = createInstance();
  beforeEach(() => {
    initVariables();
    guidesInstance = createInstance();
  });

  afterEach(() => {
    guidesInstance = null;
  });

  it('should be defined', () => {
    expect(guidesInstance).toBeDefined();
  });

  it('should be get guides', () => {
    guidesInstance?.getGuides();
    expect(guidesInstance?.state.guides).toEqual(defaultGuides);
  });

  it('should be loaded guides', () => {
    guidesInstance?.loadGuides(guidesTest);
    expect(guidesInstance?.getGuides()).toEqual(guidesTest);
  });

  it('should be cleared all guides', () => {
    guidesInstance?.loadGuides(guidesTest);
    guidesInstance?.clearAllGuides();
    expect(guidesInstance?.getGuides()).toEqual(defaultGuides);
  });

  describe('selected guides', () => {
    it('should be selected a guide', () => {
      guidesInstance?.['selectGuide'](selectedGuide, eventMouse as any);
      expect(guidesInstance?.state.selectedGuides).toEqual([selectedGuide]);
    });

    it("shouldn't be selected a guide", () => {
      isDragging = true;
      guidesInstance?.['selectGuide'](selectedGuide, eventMouse as any);
      expect(guidesInstance?.state.selectedGuides).toEqual([]);
    });

    it('should reset a selected guide', () => {
      guidesInstance?.['selectGuide'](selectedGuide, eventMouse as any);
      guidesInstance?.resetSelected();
      expect(guidesInstance?.state.selectedGuides).toEqual([]);
    });

    it('should return an index of selected guide', () => {
      guidesInstance?.['selectGuide'](selectedGuide, eventMouse as any);
      expect(guidesInstance?.['getSelectedGuideIndex'](guidesTest)).toEqual(1);
    });

    it('should delete a selected guide', () => {
      guidesInstance?.loadGuides(guidesTest);
      const newGuides = guidesInstance?.getGuides().slice();
      newGuides!.splice(indexOfDeletedGuide, 1);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Backspace',
      });
      guidesInstance?.['selectGuide'](deletedGuide, eventMouse as any);
      guidesInstance?.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance?.state.selectedGuides).toEqual([]);
      expect(guidesInstance?.getGuides()).toEqual(newGuides);
    });

    it("shouldn't delete a selected guide because of incorrect button", () => {
      guidesInstance?.loadGuides(guidesTest);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
      });
      guidesInstance?.['selectGuide'](deletedGuide, eventMouse as any);
      guidesInstance?.deleteSelectedGuide(keyboardEvent);
      expect(guidesInstance?.state.selectedGuides).toEqual([deletedGuide]);
      expect(guidesInstance?.getGuides()).toEqual(guidesTest);
    });

    it("shouldn't delete a selected guide because the guide is not selected", () => {
      guidesInstance?.loadGuides(guidesTest);
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Backspace',
      });
      guidesInstance?.deleteSelectedGuide(keyboardEvent);

      expect(guidesInstance?.state.selectedGuides).toEqual([]);
      expect(guidesInstance?.getGuides()).toEqual(guidesTest);
    });
  });

  it('should return a name of class without selected guide', () => {
    expect(guidesInstance?.['currentGuideClassName'](selectedGuide)).toContain(defaultProps.type);
    expect(guidesInstance?.['currentGuideClassName'](selectedGuide)).not.toContain('selected');
  });

  it('should return a name of class with a selected guide', () => {
    guidesInstance?.['selectGuide'](selectedGuide, eventMouse as any);
    expect(guidesInstance?.['currentGuideClassName'](selectedGuide)).toContain(defaultProps.type);
    expect(guidesInstance?.['currentGuideClassName'](selectedGuide)).toContain('selected');
  });

  it('should calculate horizontal transform', () => {
    expect(guidesInstance?.['calcHorizontalTransform'](4)).toMatch(/-21/);
  });

  it('should calculate vertical transform', () => {
    expect(guidesInstance?.['calcVerticalTransform'](4)).toMatch(/-56/);
  });

  it('should hide drag position', () => {
    guidesInstance?.['hideDragPosition']();
    expect(guidesInstance?.['displayElement'].style.display).toEqual('none');
  });

  it('should delete guide after drag it to the top', () => {
    guidesInstance?.loadGuides(guidesTest);
    const newGuides = guidesInstance?.getGuides().slice();
    newGuides!.splice(indexOfDeletedGuide, 1);
    const element = document.createElement('div');
    element.setAttribute('data-index', indexOfDeletedGuide.toString());
    const event = {
      datas: {
        target: element,
      },
    };
    guidesInstance?.['removeGuide'](event as any);
    expect(guidesInstance?.getGuides()).toEqual(newGuides);
  });

  it('should called scroll for ruler', () => {
    jest.spyOn(guidesInstance!.ruler, 'scroll').mockImplementation();
    guidesInstance?.scroll(selectedGuide);
    expect(guidesInstance?.ruler.scroll).toHaveBeenCalled();
  });

  it('should called resize for ruler', () => {
    jest.spyOn(guidesInstance!.ruler, 'resize').mockImplementation();
    guidesInstance?.resize();
    expect(guidesInstance?.ruler.resize).toHaveBeenCalled();
  });

  describe('dragStart', () => {
    it('should called createFromRuler in dragStart', () => {
      const element = document.createElement('canvas');
      guidesInstance!.ruler.canvasElement = element;
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
      guidesInstance?.['dragStart'](event as any);
      expect(guidesInstance?.['createFromRuler']).toHaveBeenCalled();
    });

    it('should called startChangeExistGuide in dragStart', () => {
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
      guidesInstance?.['dragStart'](event as any);
      expect(guidesInstance?.['startChangeExistGuide']).toHaveBeenCalled();
    });
  });
  describe('dargEnd', () => {
    it('should called createGuide in dragEnd', () => {
      jest.spyOn(guidesInstance as any, 'createGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'getGuidesPosition').mockImplementation();
      const element = document.createElement('div');
      const event = {
        datas: {
          target: element,
          fromRuler: true,
        },
      };
      guidesInstance?.['dragEnd'](event as any);
      expect(guidesInstance?.['createGuide']).toHaveBeenCalled();
    });

    it('should called removeGuide in dragEnd', () => {
      jest.spyOn(guidesInstance as any, 'removeGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'getGuidesPosition').mockImplementation(() => guidesInstance?.scrollPos! - 1);
      const event = {
        datas: {
          fromRuler: false,
        },
      };
      guidesInstance?.['dragEnd'](event as any);
      expect(guidesInstance?.['removeGuide']).toHaveBeenCalled();
    });

    it('should called changeGuide in dragEnd', () => {
      guidesInstance?.loadGuides(guidesTest);
      jest.spyOn(guidesInstance as any, 'changeGuide').mockImplementation();
      jest.spyOn(guidesInstance as any, 'getGuidesPosition').mockImplementation(() => selectedGuide);
      guidesInstance!.scrollPos = selectedGuide - 5;
      const event = {
        datas: {
          fromRuler: false,
        },
      };
      guidesInstance?.['dragEnd'](event as any);
      expect(guidesInstance?.['changeGuide']).toHaveBeenCalled();
    });
  });
});

function initVariables() {
  guidesTest = [5, -6, 3, -4.2];
  selectedGuide = guidesTest[1];
  eventMouse = new MouseEvent('click');
  isDragging = false;
}

function createInstance(): Guides {
  const guides: Guides = new Guides(defaultProps as Required<GuidesProps>);
  guides.setState = setState;
  guides['displayElement'] = document.createElement('div');
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
