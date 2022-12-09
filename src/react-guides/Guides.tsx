import autobind from 'autobind-decorator';
import { calculateMatrixDist, getDistElementMatrix } from 'css-to-mat';
import Gesto, { OnDrag, OnDragEnd } from 'gesto';
import * as React from 'react';
import styled, { StyledElement } from 'react-css-styled';

import Ruler, { PROPERTIES as RULER_PROPERTIES, RulerProps } from '../react-ruler';
import { ADDER, defaultProps, DISPLAY_DRAG, DRAGGING, GUIDE, GUIDES, GUIDES_CSS } from './consts';
import { GuidesInterface, GuidesProps, GuidesState, LockGuides, OnDragStart } from './types';
import { prefix, ref, refs } from './utils';

const GuidesElement = styled('div', GUIDES_CSS);

export default class Guides extends React.PureComponent<GuidesProps, GuidesState> implements GuidesInterface {
  public static defaultProps: GuidesProps = { ...defaultProps };
  public state: GuidesState = {
    guides: [],
    selectedGuides: [],
  };
  public adderElement!: HTMLElement;
  public scrollPos = 0;
  public ruler!: Ruler;
  private manager!: StyledElement<HTMLElement>;
  private guidesElement!: HTMLElement;
  private displayElement!: HTMLElement;
  private originElement!: HTMLElement;
  private gesto!: Gesto;
  private guideElements: HTMLElement[] = [];
  private _isFirstMove = false;
  private _pointerEventsTimer: NodeJS.Timeout;

  constructor(props: Required<GuidesProps>) {
    super(props);

    window.addEventListener('keydown', this.deleteSelectedGuide);
    window.addEventListener('click', this.resetSelected);
  }

  public loadGuides(guides: number[]) {
    this.setState({
      guides,
    });
  }

  public getGuides(): number[] {
    return this.state.guides;
  }

  public clearAllGuides() {
    this.setState({
      guides: [],
    });
  }

  @autobind
  public deleteSelectedGuide(event: KeyboardEvent) {
    if (event.code === 'Backspace' && this.state.selectedGuides.length) {
      const guides = this.getGuides();
      const guidesClone = this.getGuides().slice();
      const index = this.getSelectedGuideIndex(guides);

      guides.splice(index, 1);

      this.setState({
        guides,
        selectedGuides: [],
      });

      this.props.onDeleteGuide!({
        deletedPosGuide: guidesClone[index],
        deletedIndexGuide: index,
      });
    }
  }

  @autobind
  public resetSelected(e?: MouseEvent) {
    this.setState({
      selectedGuides: [],
    });
    e && e.stopPropagation();
  }

  public componentDidMount() {
    this.gesto = new Gesto(this.manager.getElement(), {
      container: document.body,
    })
      .on('dragStart', this.onDragStart)
      .on('drag', this.onDrag)
      .on('dragEnd', this.onDragEnd);
  }

  public componentWillUnmount() {
    this.gesto.unset();
    window.removeEventListener('keydown', this.deleteSelectedGuide);
    window.removeEventListener('click', this.resetSelected);
  }

  public scrollGuides(pos: number, zoom = 1) {
    const guidesElement = this.guidesElement;

    this.disablePointerEventsOnScroll();

    this.scrollPos = pos;
    guidesElement.style.transform = `${this.getTranslateName()}(${-pos * zoom}px)`;

    const guides = this.state.guides;
    this.guideElements.forEach(shouldShowGuide);

    function shouldShowGuide(element: HTMLElement, i: number) {
      if (!element) {
        return;
      }
      element.style.display = -pos + guides[i] < 0 ? 'none' : 'block';
    }
  }

  public resize() {
    this.ruler.resize();
  }

  public scroll(pos: number) {
    this.ruler.scroll(pos);
  }

  public render() {
    const { className, type, style, rulerStyle, cspNonce, portalContainer } = this.props as Required<GuidesProps>;

    return (
      <GuidesElement
        ref={ref(this, 'manager')}
        cspNonce={cspNonce}
        className={`${prefix('manager', type)}`}
        portalContainer={portalContainer}
        style={style}
      >
        <div className={prefix('guide-origin')} ref={ref(this, 'originElement')} />
        <Ruler ref={ref(this, 'ruler')} style={rulerStyle} {...this.rulerProps} />
        {this.renderGuidesElements()};
      </GuidesElement>
    );
  }

  private renderGuides() {
    const { guideStyle = {} } = this.props as Required<GuidesProps>;

    this.guideElements = [];
    if (this.props.showGuides) {
      return this.state.guides.map((pos, i) => {
        return (
          <div
            className={this.currentGuideClassName(pos)}
            ref={refs(this, 'guideElements', i)}
            key={i}
            data-index={i}
            data-pos={pos}
            onClick={e => this.selectGuide(pos, e)}
            style={{
              ...guideStyle,
              transform: this.transformPosition(pos),
            }}
          >
            {this.displayGuidePosition(pos)}
          </div>
        );
      });
    }
  }

  private get rulerProps(): RulerProps {
    const result = {};
    RULER_PROPERTIES.forEach(name => {
      if (name === 'style') {
        return;
      }
      result[name] = this.props[name];
    });

    return result;
  }

  private renderGuidesElements() {
    const transform = `${this.getTranslateName()}(${-this.scrollPos * this.props.zoom}px)`;
    return (
      <div
        className={GUIDES}
        ref={ref(this, 'guidesElement')}
        style={{
          transform,
        }}
      >
        {this.dragPositionElement()}
        <div className={ADDER} ref={ref(this, 'adderElement')} />
        {this.renderGuides()}
      </div>
    );
  }

  private dragPositionElement() {
    const { className } = this.props as Required<GuidesProps>;
    return (
      this.props.displayDragPos && (
        <div
          className={`${prefix('wrapper-pos', className)}`}
          ref={ref(this, 'displayElement')}
          style={this.props.dragGuideStyle}
        />
      )
    );
  }

  private currentGuideClassName(position: number) {
    return `${prefix('guide', this.props.type)} ${this.state.selectedGuides.includes(position) ? prefix('selected') : ''}`;
  }

  private selectGuide(pos: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // we should detect if the last event was dragging event
    // in such case we don't wan't to make guide selected
    if (!this.gesto.isDragging()) {
      this.setState({
        selectedGuides: [pos],
      });
    }
    e.stopPropagation();
    e.preventDefault();
  }

  private transformPosition(pos: number) {
    return `${this.getTranslateName()}(${pos * this.props.zoom}px) translateZ(0px)`;
  }

  private displayGuidePosition(position) {
    if (this.props.displayGuidePos) {
      return (
        <div className={prefix('guide-pos')} style={this.props.guidePosStyle || {}}>
          {this.props.dragPosFormat(position)}
        </div>
      );
    }
  }

  @autobind
  private onDragStart(event: OnDragStart) {
    this.resetSelected();
    this._isFirstMove = true;

    if (this.props.lockGuides === true) {
      event.stop();
      return;
    }

    this.dragStart(event);
  }

  private onDrag = (e: OnDrag) => {
    if (this._isFirstMove) {
      this._isFirstMove = false;
      e.datas.target.classList.add(DRAGGING);
    }

    this.props.onDrag!({
      ...e,
      dragElement: e.datas.target,
    });

    return this.drag(e);
  };

  private onDragEnd = (event: OnDragEnd) => {
    if (!event.isDrag) {
      return;
    }

    const target = event.datas.target;

    target.classList.remove(DRAGGING);
    // inside those next function calls "event" object can be modified
    this.dragEnd(event);
    this.hideDragPosition();

    this.props.onDragEnd!({
      ...event,
      dragElement: target,
    });
  };

  private dragStart(event: OnDragStart) {
    const target: HTMLElement = event.inputEvent.target;

    event.datas.offsetPos = this.offsetPosition(event);
    event.datas.matrix = this.matrix;

    if (target === this.ruler.canvasElement) {
      this.createFromRuler(event);
    } else if (target.classList.contains(GUIDE)) {
      this.startChangeExistGuide(event);
    }

    this.props.onDragStart!(event);
  }

  private drag(event: OnDrag | OnDragEnd) {
    const { datas } = event;
    const { nextPos, guidePos } = this.getCurrentAndNextPosition(event);

    if (!datas.fromRuler || !this._isFirstMove) {
      this.showDragPosition(nextPos, guidePos);

      const target = datas.target;
      target.setAttribute('data-pos', guidePos);
      target.style.transform = `${this.getTranslateName()}(${nextPos}px)`;
    }

    return nextPos;
  }

  private dragEnd(event: OnDragEnd) {
    const guidePos = this.getGuidesPosition(event);

    if (event.datas.fromRuler) {
      this.createGuide(event);
    } else if (guidePos < this.scrollPos) {
      this.removeGuide(event);
    } else if (this.state.guides.includes(guidePos)) {
      this.changeGuide(event);
    }
  }

  private offsetPosition(e: OnDragStart) {
    const originRect = this.originElement.getBoundingClientRect();
    const isHorizontal = this.props.type === 'horizontal';

    const offsetPos = calculateMatrixDist(this.matrix, [e.clientX - originRect.left, e.clientY - originRect.top]);
    offsetPos[0] -= this.guidesElement.offsetLeft;
    offsetPos[1] -= this.guidesElement.offsetTop;
    offsetPos[isHorizontal ? 1 : 0] += this.scrollPos * this.props.zoom;

    return offsetPos;
  }

  private createFromRuler(event: OnDragStart) {
    const isLockAdd = this.isLockType(this.props.lockGuides, 'add');
    const datas = event.datas;

    if (isLockAdd) {
      event.stop();
      return;
    }

    datas.fromRuler = true;
    datas.target = this.adderElement;
  }

  private startChangeExistGuide(event: OnDragStart) {
    const isLockRemove = this.isLockType(this.props.lockGuides, 'remove');
    const isLockChange = this.isLockType(this.props.lockGuides, 'change');
    const target = event.inputEvent.target;
    const datas = event.datas;

    if (isLockRemove && isLockChange) {
      event.stop();
      return;
    }

    datas.fromRuler = false;
    datas.target = target;
  }

  // Calculates position of next move
  // If snap enabled, next position will be snap treshhold
  private getCurrentAndNextPosition(event: OnDrag | OnDragEnd): { nextPos: number; guidePos: number } {
    const { datas, distX, distY } = event;
    const matrixPos = calculateMatrixDist(datas.matrix, [distX, distY]);
    const offsetX = matrixPos[0] + datas.offsetPos[0];
    const offsetY = matrixPos[1] + datas.offsetPos[1];
    const nextPos = Math.round(this.isHorizontal ? offsetY : offsetX);
    const guidePos = this.currentGuidePos(nextPos);
    const guideSnaps = this.sortSnapsTresholdToClosesGuide(guidePos);
    const result = { nextPos, guidePos };

    if (guideSnaps.length && Math.abs(guideSnaps[0] * this.props.zoom! - nextPos) < this.props.snapThreshold!) {
      result.guidePos = guideSnaps[0];
      result.nextPos = result.guidePos * this.props.zoom!;
    }

    return result;
  }

  private sortSnapsTresholdToClosesGuide(guidePos: number) {
    return this.props.snaps!.slice().sort((a, b) => {
      return Math.abs(guidePos - a) - Math.abs(guidePos - b);
    });
  }

  private createGuide(event: OnDragEnd) {
    this.props.onClickRuler!({
      ...event,
      pos: 0,
    });

    const guidePos = this.getGuidesPosition(event);

    if (guidePos >= this.scrollPos && this.state.guides.indexOf(guidePos) < 0) {
      const guides = [...this.state.guides, guidePos];

      this.updateGuidePosition(event, guides, {
        isAdd: true,
      });

      this.props.onAddGuide!({
        posNewGuide: guidePos,
      });
    }
  }

  private removeGuide(event: OnDragEnd) {
    const { lockGuides } = this.props;

    if (lockGuides && (lockGuides === true || lockGuides.indexOf('remove') > -1)) {
      return;
    }

    const index = event.datas.target.getAttribute('data-index');
    const guides = this.state.guides;
    const deletedPosGuide = guides[index];

    guides.splice(index, 1);

    this.props.onDeleteGuide!({
      deletedIndexGuide: index,
      deletedPosGuide,
    });

    this.updateGuidePosition(event, guides, {
      isRemove: true,
    });
  }

  private changeGuide(event: OnDragEnd) {
    const { lockGuides } = this.props;
    if (lockGuides && (lockGuides === true || lockGuides.indexOf('change') > -1)) {
      return;
    }
    const index = event.datas.target.getAttribute('data-index');
    const guidePos = this.getGuidesPosition(event);
    const guides = this.state.guides;

    guides[index] = guidePos;

    this.updateGuidePosition(event, guides, {
      isChange: true,
    });
  }

  private updateGuidePosition(event: OnDragEnd, guides: number[], { isAdd = false, isChange = false, isRemove = false }) {
    const { distX, distY } = event;

    this.setState({ guides }, () => {
      this.props.onChangeGuides!({
        distX,
        distY,
        guides: this.state.guides,
        isAdd,
        isChange,
        isRemove,
      });
    });
  }

  private getGuidesPosition(event: OnDragEnd) {
    const position = this.drag(event);
    return this.calcGuidePosition(position, this.props.zoom);
  }

  private calcGuidePosition(position: number, zoom: number) {
    return parseFloat((position / zoom).toFixed(this.props.digit || 0));
  }

  private getSelectedGuideIndex(guides) {
    return guides.findIndex(guide => {
      if (this.state.selectedGuides.includes(guide)) {
        return guide;
      }
    });
  }

  private currentGuidePos(nextPos: number) {
    return parseFloat((nextPos / this.props.zoom!).toFixed(this.props.digit || 0));
  }

  private showDragPosition(nextPos: number, guidePos: number) {
    if (this.props.displayDragPos) {
      const translate = this.isHorizontal ? this.calcHorizontalTransform(nextPos) : this.calcVerticalTransform(nextPos);
      this.displayElement.style.cssText += `display: flex; transform: ${translate}`;
      this.displayElement.innerHTML = `<div class=${DISPLAY_DRAG}>${this.props.dragPosFormat(guidePos)}</div>`;
    }
  }

  private hideDragPosition() {
    this.displayElement.style.cssText += 'display: none;';
  }

  private disablePointerEventsOnScroll() {
    if (!this.props?.showGuides) {
      return;
    }
    this._pointerEventsTimer && clearTimeout(this._pointerEventsTimer);
    this.guidesElement.style.pointerEvents = 'none';
    this._pointerEventsTimer = setTimeout(() => {
      this.guidesElement.style.pointerEvents = 'auto';
    }, 300);
  }

  private isLockType(lockGuides: LockGuides, type: string): boolean {
    return lockGuides && (lockGuides as string[]).indexOf(type) > -1;
  }

  private get matrix() {
    return getDistElementMatrix(this.manager.getElement());
  }

  private get isHorizontal() {
    return this.props.type === 'horizontal';
  }

  private getTranslateName() {
    return this.isHorizontal ? 'translateY' : 'translateX';
  }

  private calcHorizontalTransform(nextPos: number): string {
    const translateY = `${nextPos - 25}px`;
    return `translate(-64px, ${translateY}) rotate(-90deg)`;
  }

  private calcVerticalTransform(nextPos: number): string {
    const translateX = `${nextPos - 60}px`;
    return `translate(${translateX}, 2px)`;
  }
}
