import EventEmitter from '@scena/event-emitter';
import { GuidesEvents, GuidesInterface, GuidesOptions } from './react-guides/types';
declare class Guides extends EventEmitter<GuidesEvents> {
    private tempElement;
    private innerGuides;
    constructor(container: HTMLElement, options?: Partial<GuidesOptions>);
    setState(state: Partial<GuidesOptions>, callback?: () => void): void;
    destroy(): void;
    private getInnerGuides;
}
interface Guides extends GuidesInterface {
}
export default Guides;
