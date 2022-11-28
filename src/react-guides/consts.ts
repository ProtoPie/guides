import { PROPERTIES as RULER_PROPERTIES } from '@scena/react-ruler';
import { prefixCSS } from 'framework-utils';

import { GuidesOptions } from './types';
import { prefix } from './utils';

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
    color: #E04169;
    width: 50px;
    text-align: center;
    backdrop-filter: blur(20px);
}

.horizontal .guide-pos {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%);
}
.vertical .guide-pos {
    left: calc(100% + 2px);
    top: 10px;
    transform: translateY(-50%);
}
.display-drag {
    position: absolute;
    z-index: 2000;
    font-weight: bold;
    font-size: 12px;
    display: block;
    color: #E04169;
    font-size: 10px;
    line-height: 12px;
    padding: 0 1px;
    width: max-content;
    backdrop-filter: blur(20px);
}

:host.horizontal .display-drag {
    bottom: 100%;
    left: 19px;
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
