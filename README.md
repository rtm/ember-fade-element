# ember-fade-element

# Ember-fade-element

`ember-fade-element` introduces fading and other transition effects when the content of an element changes.

## Installation

* ember addon ember-fade-element

## Usage

    {{#ember-fade-element}}
      {{name}}
    {{/ember-fade-element}}

To select specific effects in addition to the default fading, supply addition classnames:

    {{#ember-fade-element class="FadeElement--flipVertical"}}

Available classes are `flipVertical', 'flipHorizontal', 'rotateRight', `slideUp`, `slideDown`, `slideLeft`, `slideRight`, and `zoom`.

## Notes


Requres MutationObserver (not available in IE <= 10).
In its absence, does nothing.
