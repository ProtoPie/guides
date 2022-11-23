import { IObject } from '@daybrush/utils';
import { RulerProps } from '@scena/react-ruler/declaration/types';
import { OnDrag as OnGestoDrag, OnDragEnd as OnGestoDragEnd, OnDragStart as OnGestoDragStart } from 'gesto';
export interface GuidesState {
    guides: number[];
    selectedGuides: number[];
}
export interface GuidesOptions extends RulerProps {
    className?: string;
    rulerStyle?: IObject<any>;
    snapThreshold?: number;
    snaps?: number[];
    displayDragPos?: boolean;
    cspNonce?: string;
    dragPosFormat?: (value: number) => string | number;
    defaultGuides?: number[];
    showGuides?: boolean;
    lockGuides?: boolean | Array<'add' | 'change' | 'remove'>;
    digit?: number;
    guideStyle?: Record<string, any>;
    dragGuideStyle?: Record<string, any>;
    displayGuidePos?: boolean;
    guidePosFormat?: (value: number) => string | number;
    guidePosStyle?: IObject<any>;
    portalContainer?: HTMLElement | null;
}
export interface GuideOptions extends GuidesOptions {
}
export interface GuidesProps extends GuidesOptions {
    onChangeGuides?: (e: OnChangeGuides) => any;
    onDragStart?: (e: OnDragStart) => any;
    onDrag?: (e: OnDrag) => any;
    onDragEnd?: (e: OnDragEnd) => any;
    onClickRuler?: (e: OnClickRuler) => any;
    onDeleteGuide?: (index: OnDeleteGuide) => any;
    onAddGuide?: (pos: OnAddGuide) => any;
}
export interface OnChangeGuides {
    guides: number[];
    isAdd: boolean;
    isRemove: boolean;
    isChange: boolean;
    distX: number;
    distY: number;
}
export interface OnDragStart extends OnGestoDragStart {
    dragElement: HTMLElement;
}
export interface OnDrag extends OnGestoDrag {
    dragElement: HTMLElement;
}
export interface OnDragEnd extends OnGestoDragEnd {
    dragElement: HTMLElement;
}
export interface OnAddGuide {
    posNewGuide?: number;
}
export interface OnDeleteGuide {
    deletedIndexGuide?: number;
    deletedPosGuide?: number;
}
export interface OnClickRuler extends OnGestoDragEnd {
    pos: number;
}
export interface GuidesInterface {
    getGuides(): number[];
    scroll(pos: number): void;
    scrollGuides(pos: number, zoom?: number): void;
    loadGuides(guides: number[]): void;
    deleteSelectedGuide(event: KeyboardEvent): void;
    clearAllGuides(): void;
    resetSelected(): void;
    resize(): void;
}
export interface GuidesEvents {
    changeGuides: OnChangeGuides;
    dragStart: OnDragStart;
    drag: OnDrag;
    dragEnd: OnDragEnd;
    clickRuler: OnClickRuler;
    deleteGuide: OnDeleteGuide;
    addGuide: OnAddGuide;
}
