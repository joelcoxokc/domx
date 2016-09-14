const eventKeys = [
    'click',
    'mousedown',
    'mouseup',
    'mouseenter',
    'mouseleave',
    'mouseover',
    'mousemove',
    'touchstart',
    'touchend',
    'touchcancel',
    'touchmove',
    'change',
    'scroll',
    'animationstart',
    'animationend',
    'animationiteration',
    'transitionend',
    'drag',
    'dragstart',
    'dragend',
    'drop',
    'dragenter',
    'dragover',
    'dragleave',
]


export function onEvents() {
    return function(Target:DecoratedClass) {
        let eventName = null;
        let index = 0;
        while(eventName = eventKeys[index++]) {
            Target.prototype['on'+eventName] = function(callback:Function, bubbles:Boolean) {
                return this.events.subscribe(eventName, callback, bubbles);
            }
        }
        return Target;
    }
}