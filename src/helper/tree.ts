import { isArray } from 'lodash';

export function traverseTree<T>(
  tree: T[],
  callback: (node: T) => void,
  childrenKey = 'children' as keyof T,
) {
  const stack = [...tree];
  while (stack.length) {
    const node = stack.shift();
    callback(node);
    if (isArray(node[childrenKey])) {
      stack.push(...node[childrenKey]);
    }
  }
  return tree;
}
