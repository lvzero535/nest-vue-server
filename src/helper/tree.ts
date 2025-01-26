import { isArray, isNil } from 'lodash';

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

export function listToTree<T extends { id: string }>(
  list: T[],
  options: {
    childrenKey?: string;
    parentKey?: string;
    rootValue?: number;
    isEmptyChildren?: boolean;
  } = {},
) {
  const {
    childrenKey = 'children',
    parentKey = 'parentId',
    rootValue = '-1',
    isEmptyChildren = false, // 是否保留空children的节点
  } = options;

  // 创建一个空对象，用于存储每个节点的引用
  const nodeDict: Record<string, T> = {};

  // 创建一个空数组，用于存储根节点
  const tree: T[] = [];
  // 第一次遍历，将每个节点添加到 nodeDict 中
  list.forEach((node) => {
    nodeDict[node.id] = {
      ...node,
      [childrenKey]: isEmptyChildren ? [] : undefined,
    };
  });

  // 第二次遍历，将每个节点添加到其父节点的 children 数组中
  list.forEach((item) => {
    const node = nodeDict[item.id];
    const parentId = node[parentKey];

    // 如果父节点不存在，则将其添加到根节点下
    if (isNil(parentId) || parentId === rootValue) {
      tree.push(node);
    } else {
      const parent = nodeDict[parentId];
      if (parent) {
        // 添加到父节点的 children 数组中
        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }
        parent[childrenKey].push(node);
      }
    }
  });
  return tree;
}
