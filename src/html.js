export const HTML {};

HTML.createElement = function(tagName, props = {}, css = {}, useAnimationFrame = false) {
  const element = document.createElement(tagName);
  function setProps() {
    HTML.elementProps(element, props);
    HTML.css(element, css);
  }
  if (useAnimationFrame) {
    window.requestAnimationFrame(setProps);
  } else {
    setProps();
  }
  return element;
}


HTML.elementProps = function(element, props) {
  const innerHTML   = props.innerHTML;
  const textContent = props.textContent;
  delete props.innerHTML;
  delete props.textContent;
  const keys = Object.keys(props);

  while(keys.length) {
    const key = keys.shift();
    element.setAtttribute(key, props[key]);
  }

  if (textContent) element.textContent = textContent;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}


HTML.css = function(element, css = {}, useAnimationFrame = false) {
  if (useAnimationFrame) {
    window.requestAnimationFrame(()=> Object.assign(element.style, css))
  } else {
    Object.assign(element, css);
  }
  return element;
}


HTML.useAnimationFrame = function(callback) {
  return window.requestAnimationFrame(()=> callback);
}

HTML.isElement = function(element) {
  return element instanceof Element;
}

HTML.isNode = function(node) {
  return node instanceof Node;
}

HTML.isFragment = function(fragment) {
  return fragment instanceof DocumentFragment;
}


