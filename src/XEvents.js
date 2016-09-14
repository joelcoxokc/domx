export class XEvents {
  eventListeners = {};

  constructor(element) {
    this.element = element;
  }

  _createSubscription(eventName, callback, bubbles, oneTime) {
    const listeners = this.eventListeners[eventName] = this.eventListeners[eventName] || [];
    const element   = this.element;
    const handler   = callback._xhandler = {eventName, callback, bubbles, oneTime, element, listener, dispose};

    element.addEventListener(eventName, listener, bubbles);

    return handler;

    function listener(event) {
      event.dispose = ()=> callback._xhandler.dispose();
      if (oneTime) {
        handler.dispose();
      }
      return callback(event);
    }

    function dispose() {
      const index = listeners.indexOf(callback);
      if (~index) {
        listeners.splice(index, 1);
      }
      element.removeEventListener(eventName, listener, bubbles);
    }
  }

  subscribe(eventName, callback, bubbles, oneTime) {
    return this._createSubscription(eventName, callback, bubbles, oneTime);
  }

  subscribeOnce(eventName, callback, bubbles) {
    return this._createSubscription(eventName, callback, bubbles, true);
  }

  dispose(eventNameOrCallback) {
    if (typeof eventNameOrCallback === 'function' && eventNameOrCallback._xhandler) {
      eventNameOrCallback._xhandler.dispose();
    } else if (typeof eventNameOrCallback === 'string') {
      return this.disposeAll(eventNameOrCallback);
    }
  }

  disposeAll(eventName) {

    if (eventName) {
      const listeners = this.eventListeners[eventName];
      return _disposeAll(listeners);
    }

    Object.keys(this.eventListeners).forEach(key => {
      _disposeAll(this.eventListeners[key]);
    })

    function _disposeAll(events = []) {
      while(events.length) {
        events.shift()._xhandler.dispose();
      }
    }
  }
}
