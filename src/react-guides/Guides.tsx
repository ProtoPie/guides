import Ruler, { PROPERTIES as RULER_PROPERTIES, RulerProps } from '@scena/react-ruler';
import autobind from 'autobind-decorator';
import { calculateMatrixDist, getDistElementMatrix } from 'css-to-mat';
import Gesto, { OnDragEnd } from 'gesto';
import * as React from 'react';
import styled, { StyledElement } from 'react-css-styled';

import { ADDER, DISPLAY_DRAG, DRAGGING, GUIDE, GUIDES, GUIDES_CSS } from './consts';
import { GuidesInterface, GuidesProps, GuidesState, OnDragStart } from './types';
import { prefix, ref, refs } from './utils';

const GuidesElement = styled('div', GUIDES_CSS);

export default class Guides extends React.PureComponent<GuidesProps, GuidesState> implements GuidesInterface {
  public static defaultProps: GuidesProps = {
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

  public disablePointerEventsOnScroll() {
    if (!this.props?.showGuides) {
      return;
    }
    this._pointerEventsTimer && clearTimeout(this._pointerEventsTimer);
    this.guidesElement.style.pointerEvents = 'none';
    this._pointerEventsTimer = setTimeout(() => {
      this.guidesElement.style.pointerEvents = 'auto';
    }, 300);
  }

  public render() {
    const { className, type, style, rulerStyle, cspNonce, portalContainer } = this.props as Required<GuidesProps>;

    return (
      <GuidesElement
        ref={ref(this, 'manager')}
        cspNonce={cspNonce}
        className={`${prefix('manager', type)} ${className}`}
        portalContainer={portalContainer}
        style={style}
      >
        <div className={prefix('guide-origin')} ref={ref(this, 'originElement')} />
        <Ruler ref={ref(this, 'ruler')} style={rulerStyle} {...this.rulerProps} />
        {this.renderGuidesElements()};
      </GuidesElement>
    );
  }

  private renderGuidesElements() {
    const { zoom, displayDragPos, dragGuideStyle } = this.props;
    const transform = `${this.getTranslateName()}(${-this.scrollPos * zoom}px)`;
    return (
      <div
        className={GUIDES}
        ref={ref(this, 'guidesElement')}
        style={{
          transform,
        }}
      >
        {displayDragPos && <div className={DISPLAY_DRAG} ref={ref(this, 'displayElement')} style={dragGuideStyle} />}
        <div className={ADDER} ref={ref(this, 'adderElement')} />
        {this.renderGuides()}
      </div>
    );
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

  public renderGuides() {
    const { zoom, showGuides, guideStyle = {} } = this.props as Required<GuidesProps>;

    this.guideElements = [];
    if (showGuides) {
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
              transform: `${this.getTranslateName()}(${pos * zoom}px) translateZ(0px)`,
            }}
          >
            {this.displayGuidePosition(pos)}
          </div>
        );
      });
    }
  }

  private displayGuidePosition(position) {
    if (this.props.displayGuidePos) {
      const guidePosFormat = this.guidePositionFormat();

      return (
        <div className={prefix('guide-pos')} style={this.props.guidePosStyle || {}}>
          {guidePosFormat(position)}
        </div>
      );
    }
  }

  private currentGuideClassName(position: number) {
    return `${prefix('guide', this.props.type)} ${this.state.selectedGuides.includes(position) ? prefix('selected') : ''}`;
  }

  private guidePositionFormat() {
    return this.props.guidePosFormat || this.props.dragPosFormat || (v => v);
  }

  public componentDidMount() {
    this.gesto = new Gesto(this.manager.getElement(), {
      container: document.body,
    })
      .on('dragStart', this.onDragStart)
      .on('drag', this.onDrag)
      .on('dragEnd', this.onDragEnd);
  }

  @autobind
  private onDragStart(event: OnDragStart) {
    this.resetSelected();
    this._isFirstMove = true;

    const { lockGuides, onDragStart } = this.props;

    if (lockGuides === true) {
      event.stop();
      return;
    }

    const canvasElement = this.ruler.canvasElement;
    const target: HTMLElement = event.inputEvent.target;

    event.datas.offsetPos = this.offsetPosition(event);
    event.datas.matrix = this.matrix;

    if (target === canvasElement) {
      this.createGuide(event);
    } else if (target.classList.contains(GUIDE)) {
      this.changeGuide(event);
    }

    onDragStart(event);
  }

  private createGuide(event: OnDragStart) {
    const isLockAdd = this.isLockType(this.props.lockGuides, 'add');
    const datas = event.datas;

    if (isLockAdd) {
      event.stop();
      return;
    }

    datas.fromRuler = true;
    datas.target = this.adderElement;
  }

  private changeGuide(event: OnDragStart) {
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

  private offsetPosition(e: OnDragStart) {
    const originRect = this.originElement.getBoundingClientRect();
    const isHorizontal = this.props.type === 'horizontal';

    const offsetPos = calculateMatrixDist(this.matrix, [e.clientX - originRect.left, e.clientY - originRect.top]);
    offsetPos[0] -= this.guidesElement.offsetLeft;
    offsetPos[1] -= this.guidesElement.offsetTop;
    offsetPos[isHorizontal ? 1 : 0] += this.scrollPos * this.props.zoom;

    return offsetPos;
  }

  private get matrix() {
    return getDistElementMatrix(this.manager.getElement());
  }

  private isLockType(lockGuides: LockGuides, type: string): boolean {
    return lockGuides && (lockGuides as string[]).indexOf(type) > -1;
  }

  public componentWillUnmount() {
    this.gesto.unset();
    window.removeEventListener('keydown', this.deleteSelectedGuide);
    window.removeEventListener('click', this.resetSelected);
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.defaultGuides !== this.props.defaultGuides) {
      // to dynamically update guides from code rather than dragging guidelines
      this.setState({ guides: this.props.defaultGuides || [] });
    }
  }
  /**
   * Load the current guidelines.
   * @memberof Guides
   * @instance
   */
  public loadGuides(guides: number[]) {
    this.setState({
      guides,
    });
  }

  @autobind
  public deleteSelectedGuide(event: KeyboardEvent) {
    if (event.code === 'Backspace' && this.state.selectedGuides.length) {
      const guides = this.getGuides();
      const guidesClone = this.getGuides().slice();
      const index = guides.findIndex(guide => {
        if (this.state.selectedGuides.includes(guide)) {
          return guide;
        }
      });

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

  public clearAllGuides() {
    this.setState({
      guides: [],
    });
  }

  /**
   * Get current guidelines.
   * @memberof Guides
   * @instance
   */
  public getGuides(): number[] {
    return this.state.guides;
  }
  /**
   * Scroll the positions of the guidelines opposite the ruler.
   * @memberof Guides
   * @instance
   */
  public scrollGuides(pos: number, zoom = 1) {
    const guidesElement = this.guidesElement;

    this.disablePointerEventsOnScroll();

    this.scrollPos = pos;
    guidesElement.style.transform = `${this.getTranslateName()}(${-pos * zoom}px)`;

    const guides = this.state.guides;
    this.guideElements.forEach((el, i) => {
      if (!el) {
        return;
      }
      el.style.display = -pos + guides[i] < 0 ? 'none' : 'block';
    });
  }
  /**
   * Recalculate the size of the ruler.
   * @memberof Guides
   * @instance
   */
  public resize() {
    this.ruler.resize();
  }
  /**
   * Scroll the position of the ruler.
   * @memberof Guides
   * @instance
   */
  public scroll(pos: number) {
    this.ruler.scroll(pos);
  }

  private onDrag = (e: any) => {
    if (this._isFirstMove) {
      this._isFirstMove = false;
      e.datas.target.classList.add(DRAGGING);
    }
    const nextPos = this.movePos(e);

    /**
     * When dragging, the drag event is called.
     * @memberof Guides
     * @event drag
     * @param {OnDrag} - Parameters for the drag event
     */
    this.props.onDrag!({
      ...e,
      dragElement: e.datas.target,
    });
    return nextPos;
  };
  private onDragEnd = (e: OnDragEnd) => {
    const { datas, isDrag, distX, distY } = e;

    if (!isDrag) {
      return;
    }

    const pos = this.movePos(e);
    let guides = this.state.guides;
    const { onChangeGuides, onAddGuide, zoom, displayDragPos, digit, lockGuides } = this.props;
    const guidePos = parseFloat((pos / zoom!).toFixed(digit || 0));

    if (displayDragPos) {
      this.displayElement.style.cssText += 'display: none;';
    }

    datas.target.classList.remove(DRAGGING)

    if (datas.fromRuler) {
      if (this._isFirstMove) {
        /**
         * When click the ruler, the click ruler is called.
         * @memberof Guides
         * @event clickRuler
         * @param {OnClickRuler} - Parameters for the clickRuler event
         */
        this.props.onClickRuler!({
          ...e,
          pos: 0,
        });
      }
      if (guidePos >= this.scrollPos && guides.indexOf(guidePos) < 0) {
        this.setState(
          {
            guides: [...guides, guidePos],
          },
          () => {
            /**
             * The `changeGuides` event occurs when the guideline is added / removed / changed.
             * @memberof Guides
             * @event changeGuides
             * @param {OnChangeGuides} - Parameters for the changeGuides event
             */
            onChangeGuides!({
              guides: this.state.guides,
              distX,
              distY,
              isAdd: true,
              isRemove: false,
              isChange: false,
            });

            onAddGuide!({
              posNewGuide: guidePos,
            });
          },
        );
      }
    } else {
      const index = datas.target.getAttribute('data-index');
      let isRemove = false;
      let isChange = false;

      guides = [...guides];

      if (guidePos < this.scrollPos) {
        if (lockGuides && (lockGuides === true || lockGuides.indexOf('remove') > -1)) {
          return;
        }
        const deletedPosGuide = guides[index];
        guides.splice(index, 1);
        this.props.onDeleteGuide!({
          deletedIndexGuide: index,
          deletedPosGuide,
        });
        isRemove = true;
      } else if (guides.indexOf(guidePos) > -1) {
        return;
      } else {
        if (lockGuides && (lockGuides === true || lockGuides.indexOf('change') > -1)) {
          return;
        }
        guides[index] = guidePos;
        isChange = true;
      }
      this.setState(
        {
          guides,
        },
        () => {
          const nextGuides = this.state.guides;
          onChangeGuides!({
            distX,
            distY,
            guides: nextGuides,
            isAdd: false,
            isChange,
            isRemove,
          });
        },
      );
    }
    /**
     * When the drag finishes, the dragEnd event is called.
     * @memberof Guides
     * @event dragEnd
     * @param {OnDragEnd} - Parameters for the dragEnd event
     */
    this.props.onDragEnd!({
      ...e,
      dragElement: datas.target,
    });
  };
  private movePos(e: any) {
    const { datas, distX, distY } = e;
    const props = this.props;
    const { type, zoom, snaps, snapThreshold, displayDragPos, digit } = props;
    const dragPosFormat = props.dragPosFormat || (v => v);
    const isHorizontal = type === 'horizontal';
    const matrixPos = calculateMatrixDist(datas.matrix, [distX, distY]);
    const offsetPos = datas.offsetPos;
    const offsetX = matrixPos[0] + offsetPos[0];
    const offsetY = matrixPos[1] + offsetPos[1];
    let nextPos = Math.round(isHorizontal ? offsetY : offsetX);
    let guidePos = parseFloat((nextPos / zoom!).toFixed(digit || 0));
    const guideSnaps = snaps!.slice().sort((a, b) => {
      return Math.abs(guidePos - a) - Math.abs(guidePos - b);
    });

    if (guideSnaps.length && Math.abs(guideSnaps[0] * zoom! - nextPos) < snapThreshold!) {
      guidePos = guideSnaps[0];
      nextPos = guidePos * zoom!;
    }
    if (!datas.fromRuler || !this._isFirstMove) {
      if (displayDragPos) {
        const translate = type === 'horizontal' ? this.calcHorizontalTransform(nextPos) : this.calcVerticalTransform(nextPos);
        this.displayElement.style.cssText += 'display: block; transform: ' + translate;
        this.displayElement.innerHTML = `${dragPosFormat!(guidePos)}`;
      }
      const target = datas.target;

      target.setAttribute('data-pos', guidePos);
      target.style.transform = `${this.getTranslateName()}(${nextPos}px)`;
    }

    return nextPos;
  }
  private getTranslateName() {
    return this.props.type === 'horizontal' ? 'translateY' : 'translateX';
  }

  @autobind
  public resetSelected(e?: MouseEvent) {
    this.setState({
      selectedGuides: [],
    });
    e && e.stopPropagation();
  }

  private calcHorizontalTransform(nextPos: number): string {
    const translateY = `${nextPos - 10}px`;
    return `translate(-18px, ${translateY}) rotate(-90deg)`;
  }

  private calcVerticalTransform(nextPos: number): string {
    const translateX = `${nextPos + 8}px`;
    return `translate(${translateX}, 1px)`;
  }
}
