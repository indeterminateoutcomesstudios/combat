import { stop, animate, Promise } from 'liquid-fire';

export default function offsetFade(options) {
  stop(this.oldElement);
  return Promise.all([
    animate(this.oldElement, { translateX: '-1.5rem', opacity: 0 }, options),
    animate(this.newElement, { translateX: [ 0, '1.5rem' ], opacity: [ 1, 0 ] }, options)
  ]);
}
 
