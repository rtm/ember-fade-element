# ember-fade-element

`ember-fade-element` introduces fading and other transition effects when the content of an element changes.

## Installation

    ember addon ember-fade-element

## Usage

    {{#fade-element}}
      {{name}}
    {{/fade-element}}

To select specific effects in addition to the default fading, supply addition classnames:

    {{#fade-element class="FadeElement--flipVertical"}}

Available classes are `flipVertical`, `flipHorizontal`, `rotateRight`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, and `zoom`.

To control the duration of the transition, arrange for the CSS `transition-duration` property to be set on the element, as in

    .slow { transition-duration: 2s; }

    {{#fade-element class="slow"}}

## Notes

Requres MutationObserver (not available in IE <= 10).
In its absence, does nothing.
