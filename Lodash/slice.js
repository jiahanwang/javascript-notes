https://github.com/lodash/lodash/blob/master/slice.js


/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  
  if (!length) {
    return []
  }

  //MY NOTES: why == null?????
  start = start == null ? 0 : start
  // end can actually be null here 
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end

  if (end < 0) {
    end += length
  }
  // MY NOTES: >>> 0
  /* The end result is that any value will be converted to a number. If it isn't able to be converted, the number will be 0. Also, any decimal places will be stripped away. It is similar to doing ~~this.length*/  
  length = start > end ? 0 : ((end - start) >>> 0)

  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice