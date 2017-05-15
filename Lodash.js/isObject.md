## isObject

Checks if `value` is the [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types) of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)

### **MY NOTES:**
`typeof null` returns `'object'`

```javascript
 /*
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
function isObject(value) {
  const type = typeof value
  return value != null && (type == 'object' || type == 'function')
}

export default isObject
```

[source code](https://github.com/lodash/lodash/blob/master/isObject.js)

## isObjectLike

Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".

```javascript
function isObjectLike(value) {
  return typeof value == 'object' && value !== null
}
```

[source code](https://github.com/lodash/lodash/blob/master/isObjectLike.js)
