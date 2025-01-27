export function prefixNames(prefix: string, ...classNames: string[]) {
  return classNames
    .map(className =>
      className
        .split(' ')
        .map(name => (name ? `${prefix}${name}` : ''))
        .join(' '),
    )
    .join(' ');
}

export function prefix(...classNames: string[]) {
  return prefixNames('scena-', ...classNames);
}

export function prefixCSS(prefix: string, css: string) {
  return css.replace(/([^}{]*){/gm, (_, selector) => {
    return `${selector.replace(/\.([^{,\s\d.]+)/g, `.${prefix}$1`)}{`;
  });
}

/* Class Decorator */
export function Properties(properties: any[], action: (prototype: any, property: string) => any) {
  return (component: any) => {
    const prototype = component.prototype;

    properties.forEach(property => {
      action(prototype, property);
    });
  };
}

/* react */
export function ref(target: any, name: string) {
  return (e: any) => {
    e && (target[name] = e);
  };
}
export function refs(target: any, name: string, i: number) {
  return (e: any) => {
    e && (target[name][i] = e);
  };
}
