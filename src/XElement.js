import {HTML} from 'html';
import {XEvents} from './XEvents';
import {onEvents} from 'mixin/onevents'; 

@onEvents()
export class XElement {
  eventListeners = [];

  constructor(element, options, instance) {
    this.element  = element;
    this.options  = options;
    this.instance = instance;

    this.classList = element.classList;
    this.style = element.style; 
  }  

  bind() {

  }

  unbind() {
    this.events.disposeAll();
  }

  offset() {
    return HTML.offset(this.element);
  }

  css(props = {}) {
    Object.assign(this.style, props);
  }

  addClass(...classNames) {
    this.classList.add(classNames);
  }

  hasClass(...classNames) {
    this.classList.contains(...classNames);
  }

  removeClass(...classNames) {
    this.classList.remove(classNames);
  }
}
