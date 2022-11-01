import { ref } from 'framework-utils';
import * as React from 'react';
import { createPortal } from 'react-dom';

import ReactGuides from './react-guides';
import { GuidesOptions } from './react-guides/types';

export interface InnerGuidesProps extends GuidesOptions {
    container?: HTMLElement;
}
export default class InnerGuides extends React.Component<InnerGuidesProps, InnerGuidesProps> {
    public state: InnerGuidesProps = {};
    public guides: ReactGuides;
    constructor(props: InnerGuidesProps) {
        super(props);
        this.state = this.props;
    }
    public render() {
        const { container, ...state } = this.state;
        return createPortal(<ReactGuides ref={ref(this, 'guides')} {...state} />, container);
    }
}
