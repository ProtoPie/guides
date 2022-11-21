import * as React from 'react';
import ReactGuides from './react-guides';
import { GuidesOptions } from './react-guides/types';
export interface InnerGuidesProps extends GuidesOptions {
    container?: HTMLElement;
}
export default class InnerGuides extends React.Component<InnerGuidesProps, InnerGuidesProps> {
    state: InnerGuidesProps;
    guides: ReactGuides;
    constructor(props: InnerGuidesProps);
    render(): React.ReactPortal;
}
