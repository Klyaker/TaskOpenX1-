class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}

const root = new TreeNode(5);
const node1 = new TreeNode(7);
const node2 = new TreeNode(9);
const node3 = new TreeNode(0);
const node4 = new TreeNode(8);
const node5 = new TreeNode(5);
const node6 = new TreeNode(1);
const node7 = new TreeNode(6);

root.addChild(node1);
root.addChild(node2);
node1.addChild(node3);
node1.addChild(node4);
node4.addChild(node5);
node5.addChild(node6);
node5.addChild(node7);

function countSticks(node) {
    if (node.children.length === 0) {
      return 1;
    }
  
    let count = 0;
    for (let child of node.children) {
      count += countSticks(child);
    }
    return count;
  }
  


  function maxDepth(node) {
    if (node.children.length === 0) {
      return 1;
    }
  
    let max = 0;
    for (let child of node.children) {
      max = Math.max(max, maxDepth(child));
    }
    return max + 1;
  }


  function isEquivalent(node1, node2) {
    if (node1.value !== node2.value) {
      return false;
    }
  
    if (node1.children.length !== node2.children.length) {
      return false;
    }
  
    for (let i = 0; i < node1.children.length; i++) {
      if (!isEquivalent(node1.children[i], node2.children[i])) {
        return false;
      }
    }
  
    return true;
  }


const tree1 = new TreeNode(5);
tree1.addChild(new TreeNode(3));
tree1.children[0].addChild(new TreeNode(1));
tree1.children[0].addChild(new TreeNode(2));
tree1.addChild(new TreeNode(7));
tree1.children[1].addChild(new TreeNode(6));
tree1.children[1].addChild(new TreeNode(8));

const tree2 = new TreeNode(5);
tree2.addChild(new TreeNode(3));
tree2.children[0].addChild(new TreeNode(1));
tree2.children[0].addChild(new TreeNode(2));
tree2.addChild(new TreeNode(7));
tree2.children[1].addChild(new TreeNode(6));
tree2.children[1].addChild(new TreeNode(8));
  

Task 2

const fetch = require('node-fetch');

const getUsers = async () => {
  const response = await fetch('https://fakestoreapi.com/users');
  const users = await response.json();
  return users;
};

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  return products;
};

const getCarts = async () => {
  const response = await fetch('https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07');
  const carts = await response.json();
  return carts;
};

const getTotalValueOfCategory = (products, category) => {
  const productsInCategory = products.filter((product) => product.category === category);
  const totalValue = productsInCategory.reduce((acc, product) => acc + product.price, 0);
  return totalValue;
};

const getProductCategoriesTotalValues = async () => {
  const products = await getProducts();
  const categories = [...new Set(products.map((product) => product.category))];
  const productCategoriesTotalValues = categories.map((category) => ({
    category,
    totalValue: getTotalValueOfCategory(products, category),
  }));
  return productCategoriesTotalValues;
};


const getCartWithHighestValue = async () => {
  const carts = await getCarts();
  const cartWithHighestValue = carts.reduce((prev, current) => (prev.total > current.total ? prev : current));
  const users = await getUsers();
  const owner = users.find((user) => user.id === cartWithHighestValue.userId);
  return {
    value: cartWithHighestValue.total,
    owner: `${owner.firstName} ${owner.lastName}`,
  };
};


const getUsersLivingFarthestApart = async () => {
  const users = await getUsers();
  let maxDistance = -Infinity;
  let farthestUsers = [];
  for (let i = 0; i < users.length - 1; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const distance = calculateDistance(users[i].address.geo, users[j].address.geo);
      if (distance > maxDistance) {
        maxDistance = distance;
        farthestUsers = [users[i], users[j]];
      }
    }
  }
  return farthestUsers;
};


const calculateDistance = (coord1, coord2) => {
  const lat1 = parseFloat(coord1.lat);
  const lon1 = parseFloat(coord1.lng);
  const lat2 = parseFloat(coord2.lat);
  const lon2 = parseFloat(coord2.lng);
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1); 
  const dLon = deg2rad(lon2 - lon1);
