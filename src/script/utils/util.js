/**
 * 绑定方法作用域
 * 
 * @param {any} fns 
 * @param {any} context 
 */
export function bindAll(fns, context) {
  fns.forEach((fn) => {
    if (!context[fn]) {
      return;
    }
    context[fn] = context[fn].bind(context);
  });
}

/**
 * 定义类方法
 * 
 * @param {any} prototype 
 * @param {any} funs 
 */
export function defineFunction(prototype, funs) {
  for (var fn in funs) {
    prototype[fn] = funs[fn];
  }
}

/**
 * 创建dom
 * 
 * @export
 * @param {any} tagName 
 * @param {any} className 
 * @param {any} container 
 * @returns 
 */
export function createDom(tagName, className, container) {
  const el = window.document.createElement(tagName);
  if (className) el.className = className;
  if (container) container.appendChild(el);
  return el;
}

/**
 * 获取坐标集合的中间点集合
 * 
 * @export
 * @param {any} coordinates 
 */
export function getCoordinatesCenter(coordinates) {
  let result = [];

  for (let i = 1; i < coordinates.length; i++) {
    let coord1 = coordinates[i - 1];
    let coord2 = coordinates[i];

    let centerCoord = [(coord1[0] + coord2[0]) / 2, (coord1[1] + coord2[1]) / 2];
    result.push(centerCoord);
  }
  return result;
}
export function extend (dest, ...sources) {
  for (const src of sources) {
      for (const k in src) {
          dest[k] = src[k];
      }
  }
  return dest;
}

export function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}