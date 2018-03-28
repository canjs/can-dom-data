@function can-dom-data.get domData.get
@parent can-dom-data

Get data that was stored in a DOM Node using the specified `key`.

@signature `domData.get.call(element, key)`
@param  {String} key The property to retrieve from the element’s data.
@return {*} value The value stored for the key.

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
```
