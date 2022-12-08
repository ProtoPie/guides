import { PROPERTIES as RULER_PROPERTIES } from '../react-ruler';
import { GuidesOptions, GuidesProps } from './types';
import { prefix, prefixCSS } from '../utils';

export const RULER = prefix('ruler');
export const ADDER = prefix('guide', 'adder');
export const GUIDES = prefix('guides');
export const GUIDE = prefix('guide');
export const DRAGGING = prefix('dragging');
export const DISPLAY_DRAG = prefix('display-drag');
export const GUIDES_CSS = prefixCSS(
  'scena-',
  `
{
    position: relative;
    width: 100%;
    height: 100%;
}
canvas {
    position: relative;
}
.guide-origin {
    position: absolute;
    width: 1px;
    height: 1px;
    top: 0;
    left: 0;
    opacity: 0;
}
.guides {
    position: absolute;
    bottom: 0;
    right: 0;
    will-change: transform;
    z-index: 2000;
}
.guide-pos {
    position: absolute;
    font-weight: bold;
    font-size: 10px;
    color: #E04169;
}
.horizontal .guide-pos {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%);
}
.vertical .guide-pos {
    left: calc(100% + 2px);
    top: 50%;
    transform: translateY(-50%);
}
.display-drag {
    position: absolute;
    will-change: transform;
    z-index: 2000;
    font-weight: 400;
    font-size: 10px;
    width: 100%;
    color: #E04169;
}
:host.horizontal .guides {
    width: 100%;
    height: 0;
}
:host.vertical .guides {
    height: 100%;
    width: 0;
}
.guide {
    position: absolute;
    background: #E04169;
    opacity: 0.5;
    z-index: 2;
}
.selected {
    background: #8169FF;
}

.wrapper-pos {
    position: absolute;
    min-width: 35px;
    width: max-content;
    min-height: 14px;
    text-align: center;
    justify-content: center;
    display: none;
    z-index: 2;
}

.light {
    background: #fff;
    box-shadow: 0px -9px 9px 8px #fff;
}

.dark {
    background: #444;
    box-shadow: 0px -9px 9px 8px #444;
}

.guide.dragging:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
:host.horizontal .guide {
    width: 100%;
    height: 1px;
    cursor: row-resize;
}
:host.vertical .guide {
    width: 1px;
    height: 100%;
    cursor: col-resize;
}
:host.horizontal .dragging,
:host.horizontal .selected {
    height: 1px;
    opacity: 1;
}
:host.vertical .dragging,
:host.vertical .selected {
    width: 1px;
    opacity: 1;
}
.mobile :host.horizontal .guide {
    transform: scale(1, 2);
}
.mobile :host.vertical .guide {
    transform: scale(2, 1);
}
:host.horizontal .guide:before {
    height: 10px;
    margin-top: -5px;
    display: block;
    content: '';
}
:host.vertical .guide:before {
    width: 10px;
    height: 100%;
    margin-left: -5px;
    display: block;
    content: '';
}
.adder {
    display: none;
}
.adder.dragging {
    display: block;
}
`,
);

export const PROPERTIES: Array<keyof GuidesOptions> = [
  'className',
  'rulerStyle',
  'snapThreshold',
  'snaps',
  'displayDragPos',
  'cspNonce',
  'dragPosFormat',
  'defaultGuides',
  'showGuides',
  ...RULER_PROPERTIES,
];

export const METHODS = [
  'getGuides',
  'loadGuides',
  'scroll',
  'scrollGuides',
  'resize',
  'deleteSelectedGuide',
  'resetSelected',
  'clearAllGuides',
] as const;

export const EVENTS = ['changeGuides', 'dragStart', 'drag', 'dragEnd', 'clickRuler', 'deleteGuide', 'addGuide', 'resetGuides'] as const;

export const defaultProps: GuidesProps = {
  className: '',
  type: 'horizontal',
  zoom: 1,
  style: {},
  snapThreshold: 5,
  snaps: [],
  digit: 0,
  onClickRuler: () => {},
  onAddGuide: () => {},
  onDeleteGuide: () => {},
  onChangeGuides: () => {},
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
  displayDragPos: false,
  dragPosFormat: v => v,
  defaultGuides: [],
  lockGuides: false,
  showGuides: true,
  guideStyle: {},
  dragGuideStyle: {},
  guidePosStyle: {},
  portalContainer: null,
};
