import {HTML} from './html';
import {XElement} from '../XElement';

export class Button extends XElement {
  constructor(element, options) {
    element = element || HTML.createElement('BUTTON', options.props, options.css);
    super(element, options);
  }

  bind() {
    if (this.element.hasAttribute('href')) {
      
    }
  }
}
