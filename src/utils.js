export function pushB(a, b) {
  this.push(b);
}

export function executeAll(array, arg) {
  for(let i = 0, len = array.length; i < len; ++i) {
    array[i](arg);
  }
}

export function copy(array) {
  const len = array.length, out = Array(len);
  for(let i = 0; i < len; ++i) {
    out[i] = array[i];
  }
  return out;
}

export function indexOf(array, item) {
  for(let i = 0, len = array.length; i < len; ++i) {
    if(array[i] === item) {
      return i;
    }
  }
  return -1;
}

export function excludes(array, item) {
  return indexOf(array, item) === -1;
}

export function removeIndex(array, index) {
  const len = array.length - 1;
  while(index < len) {
    array[index] = array[++index];
  }
  array.pop();
}

export function remove(array, item) {
  const index = indexOf(array, item);
  if(index !== -1) {
    removeIndex(array, index);
    return true;
  }
  return false;
}

export function merge() {
  const out = {};
  for(let i = 0, len = arguments.length; i < len; ++i) {
    const obj = arguments[i], keys = Object.keys(obj);
    for(let i = 0, len = keys.length; i < len; ++i) {
      out[keys[i]] = obj[keys[i]];
    }
  }
  return out;
}

export function all(arrays) {
  return arrays[0].filter(item => {
    for(let i = 1, len = arrays.length; i < len; ++i) {
      if(excludes(arrays[i], item)) {
        return false;
      }
    }
    return true;
  });
}

export function any(arrays) {
  if(arrays.length === 0) {
    return [];
  }
  const out = arrays[0];
  for(let i = 1, len = arrays.length; i < len; ++i) {
    const arr = arrays[i];
    for(let j = 0, len = arr.length; j < len; ++j) {
      const item = arr[j];
      if(excludes(out, item)) {
        out.push(item);
      }
    }
  }
  return out;
}

export function andNot(yes, no) {
  return yes.filter(item => excludes(no, item));
}

export function onFunc(alerts) {
  return function() {
    const len = arguments.length - 1, alert = arguments[len];
    if(len !== 0) {
      for(let i = 0; i < len; ++i) {
        alerts[arguments[i]].push(alert);
      }
    } else { // no types passed
      // add this alert to all types
      const types = Object.keys(alerts);
      for(let i = 0, len = types.length; i < len; ++i) {
        alerts[types[i]].push(alert);
      }
    }
  };
}

export function offFunc(alerts) {
  return function() {
    const len = arguments.length - 1, alert = arguments[len];
    if(len !== 0) {
      for(let i = 0; i < len; ++i) {
        remove(alerts[arguments[i]], alert);
      }
    } else { // no types passed
      // remove this alert from all types
      const types = Object.keys(alerts);
      for(let i = 0, len = types.length; i < len; ++i) {
        remove(alerts[types[i]], alert);
      }
    }
  };
}
