import Ruler from '@scena/react-ruler';
import * as React from 'react';

import { GuidesInterface, GuidesProps, GuidesState } from './types';

export default class Guides extends React.PureComponent<GuidesProps, GuidesState> implements GuidesInterface {
    static defaultProps: GuidesProps;
    state: GuidesState;
    adderElement: HTMLElement;
    scrollPos: number;
    ruler: Ruler;
    private manager;
    private guidesElement;
    private displayElement;
    private originElement;
    private gesto;
    private guideElements;
    private _isFirstMove;
    private _pointerEventsTimer;
    constructor(props: Required<GuidesProps>);
    disablePointerEventsOnScroll(): void;
    render(): JSX.Element;
    private selectGuide;
    renderGuides(): JSX.Element[];
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): void;
    loadGuides(guides: number[]): void;
    deleteSelectedGuide(event: KeyboardEvent): void;
    clearAllGuides(): void;
    getGuides(): number[];
    scrollGuides(pos: number, zoom?: number): void;
    resize(): void;
    scroll(pos: number): void;
    private onDragStart;
    private onDrag;
    private onDragEnd;
    private movePos;
    private getTranslateName;
    resetSelected(): void;
    private calcHorizontalTransform;
    private calcVerticalTransform;
}
