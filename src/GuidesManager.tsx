import { camelize } from '@daybrush/utils';
import EventEmitter from '@scena/event-emitter';
import { Properties, ref } from 'framework-utils';
import * as React from 'react';
import { render } from 'react-dom';

import InnerGuides from './InnerGuides';
import { EVENTS, METHODS, PROPERTIES } from './react-guides/consts';
import { GuidesEvents, GuidesInterface, GuidesOptions } from './react-guides/types';

@Properties(METHODS as any, (prototype, property) => {
  if (prototype[property]) {
    return;
  }
  prototype[property] = function (...args) {
    const self = this.getInnerGuides();

    if (!self || !self[property]) {
      return;
    }
    return self[property](...args);
  };
})
@Properties(PROPERTIES, (prototype, property) => {
  Object.defineProperty(prototype, property, {
    get() {
      return this.getInnerGuides().props[property];
    },
    set(value) {
      this.innerGuides.setState({
        [property]: value,
      });
    },
    enumerable: true,
    configurable: true,
  });
})
/**
 * @sort 1
 * @extends EventEmitter
 */
class Guides extends EventEmitter<GuidesEvents> {
  private tempElement = document.createElement('div');
  private innerGuides!: InnerGuides;
  /**
   * @sort 1
   * @param - guides' container
   * @param {$ts:Partial<Guides.GuidesOptions>} - guides' options
   */
  constructor(container: HTMLElement, options: Partial<GuidesOptions> = {}) {
    super();
    const events: any = {};

    EVENTS.forEach((name) => {
      events[camelize(`on ${name}`)] = (e: any) => this.trigger(name as any, e);
    });

    render(<InnerGuides {...options} {...events} container={container} ref={ref(this, 'innerGuides')} />, this.tempElement);
  }
  /**
   * @param state
   * @param callback
   */
  public setState(state: Partial<GuidesOptions>, callback?: () => void) {
    this.innerGuides.setState(state, callback);
  }
  /**
   * destroy guides
   */
  public destroy() {
    render(null, this.tempElement);
    this.tempElement = null;
    this.innerGuides = null;
  }
  private getInnerGuides() {
    return this.innerGuides.guides;
  }
}
interface Guides extends GuidesInterface {}

export default Guides;
