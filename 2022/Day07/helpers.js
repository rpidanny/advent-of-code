const path = require('path');

const addItemToDirTree = (dirTree, cwd, item, name) => {
  if (cwd === '/') {
    if (!dirTree[cwd]) {
      dirTree[cwd] = {
        type: 'directory',
        size: 0,
        content: {},
      };
    }

    dirTree[cwd].content[name] = item;
    return;
  }

  const dirs = cwd.split('/');

  let currentPointer = dirTree['/'].content;

  for (const dir of dirs) {
    if (dir === '') continue;

    currentPointer = currentPointer[dir].content;
  }

  currentPointer[name] = item;
};

const populateDirSizes = (dirTree) => {
  let dirSize = 0;

  for (const [name, child] of Object.entries(dirTree.content)) {
    if (child.type === 'file') {
      dirSize += child.size;
    } else {
      dirSize += populateDirSizes(dirTree.content[name]);
    }
  }
  dirTree.size = dirSize;

  return dirSize;
};

const getCwd = (cwd, arg) => {
  // This assumes that the first command will be a cd
  if (!cwd) {
    cwd = arg;
  } else {
    cwd = path.resolve(cwd, arg);
  }
  return cwd;
};

const generateDirTree = (inputs) => {
  const dirTree = {};

  let cwd;
  for (const input of inputs) {
    const isCmd = input[0] === '$';
    if (isCmd) {
      const [, cmd, arg] = input.split(' ');
      if (cmd === 'cd') {
        cwd = getCwd(cwd, arg);
      }
    } else {
      const isDir = input[0] === 'd'; // beginning char of 'dir'

      if (isDir) {
        const [, folderName] = input.split(' ');
        const item = {
          type: 'directory',
          size: 0,
          content: {},
        };
        addItemToDirTree(dirTree, cwd, item, folderName);
      } else {
        const [size, fileName] = input.split(' ');
        const item = {
          type: 'file',
          size: parseInt(size),
        };
        addItemToDirTree(dirTree, cwd, item, fileName);
      }
    }
  }

  // Run DFS to update folder size recursively
  populateDirSizes(dirTree['/']);

  return dirTree;
};

const getSumOfDirsSmallerThan = (dirTree, maxFolderSize) => {
  let dirSize = 0;

  for (const [name, child] of Object.entries(dirTree.content)) {
    if (child.type === 'directory') {
      if (child.size <= maxFolderSize) {
        dirSize += child.size;
      }

      dirSize += getSumOfDirsSmallerThan(dirTree.content[name], maxFolderSize);
    }
  }

  return dirSize;
};

const findSmallestDirLargerThan = (dirTree, minThreshold) => {
  let minSize = Infinity;

  for (const [name, child] of Object.entries(dirTree.content)) {
    if (child.type === 'directory' && child.size >= minThreshold) {
      minSize = Math.min(
          minSize,
          child.size,
          findSmallestDirLargerThan(dirTree.content[name], minThreshold),
      );
    }
  }

  return minSize;
};

module.exports = {
  generateDirTree,
  addItemToDirTree,
  populateDirSizes,
  getSumOfDirsSmallerThan,
  findSmallestDirLargerThan,
};
