// components/fade-element.js
//
// Fade in a new version of an element.
// Usage:
// ```
// {{#fade-element}}
//   {{name}}
// {{/fade-element}}
// ```
//
// Requres MutationObserver (not available in IE <= 10).
// In its absence, does nothing.
//
// To select specific effects in addition to the default fading, supply addition classnames:
// ```
// {{#fade-element class="FadeElement--flipVertical"}}
// ```
//
// Available classes are `flipVertical', 'flipHorizontal', 'rotateRight', `slideUp`, `slideDown`, `slideLeft`, `slideRight`, and `zoom`.

import Ember from 'ember';

const NO_MUTATION_OBSERVER = typeof MutationObserver === 'undefined';


export default Ember.Component.extend({

  // CONFIGURATION

  // Almost none of the effects work well without fading.
  // Also, it's useful to have this as a default.
  classNames: ['FadeElement', 'FadeElement--fade'],

  // Are we in the of a transition caused by change in content?
  classNameBindings: ['isTransition', 'isDisabled'],


  // INSTANCE VARIABLES

  // Mutation observer.
  observer: null,

  // Original DOM.
  original: null,

  // Are we in the middle of a transition?
  isTransition: false,


  // COMPUTED PROPERTIES

  // Disable due to absence of MutationObserver?
  isDisabled: function() { return NO_MUTATION_OBSERVER; }.property(),


  // METHODS

  // Start (in) and stop (out) transition.
  in()  {
    this .
      set('isTransition', true)  .
      get('original') .
      addEventListener   ('transitionend', this.out);
  },

  out() {
    this .
      cloneNode() .
      set('isTransition', false) .
      get('original') .
      removeEventListener('transitionend', this.out);
  },

  // Clone the item and insert.
  cloneNode() {
    var {element, original } = this.getProperties('element', 'original');

    element.replaceChild(original.cloneNode(true), original.nextSibling);
    return this;
  },


  // LIFE-CYCLE HOOKS

  // Set up observer.
  observe: function() {
    if (NO_MUTATION_OBSERVER) return;

    var original = this.get('original');
    var observer = new MutationObserver(this.in);
    var config = { childList: true, characterData: true, subtree: true, attributes: true };

    observer.observe(original, config);
    this.setProperties({ observer });
  }.on('didInsertElement'),

  bind: function() {
    ['in', 'out'] . forEach(method => this[method] = this[method].bind(this));
  }.on('init'),

  initClone: function() {
    if (NO_MUTATION_OBSERVER) return;
    this.set('original', this.get('element').firstChild);
    this.cloneNode();
  }.on('didInsertElement'),

  // Tear down observer.
  disconnect: function() {
    var { observer } = this.getProperties('observer');
    if (observer) observer.disconnect();
  }.on('willDestroy')


});
