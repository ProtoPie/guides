export declare function prefixNames(prefix: string, ...classNames: string[]): string;
export declare function prefix(...classNames: string[]): string;
export declare function prefixCSS(prefix: string, css: string): string;
export declare function Properties(properties: any[], action: (prototype: any, property: string) => any): (component: any) => void;
export declare function ref(target: any, name: string): (e: any) => void;
export declare function refs(target: any, name: string, i: number): (e: any) => void;
