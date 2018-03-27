@function can-dom-data.clean domData.clean
@parent can-dom-data

Remove data from an element previously added by [can-dom-data.set set].

@signature `domData.clean.call(element, key)`
@param  {String} key The property to remove from the element’s data.

@body

## Use

```js
import domData from "can-dom-data";

const element = document.createElement("p");
document.body.appendChild(element);

domData.set.call(element, "metadata", {
  hello: "world"
});

let metadata = domData.get.call(element, "metadata");
// metadata is {hello: "world"}

domData.clean.call(element, "metadata");

metadata = domData.get.call(element, "metadata");
// metadata === undefined after clean() was called
```
