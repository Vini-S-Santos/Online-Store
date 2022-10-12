export const addCart = (product) => {
  const prev = JSON.parse(localStorage.getItem('cartItems'));
  if (prev) return localStorage.setItem('cartItems', JSON.stringify([...prev, product]));
  localStorage.setItem('cartItems', JSON.stringify([product]));
};

export const subtract = ({ id }) => {
  const storage = JSON.parse(localStorage.getItem('cartItems'));
  const indexRemove = storage.reduce((acc, { id: id2 }, index) => {
    if (id === id2) return index;
    return acc;
  }, 0);
  storage.splice(indexRemove, 1);
  localStorage.setItem('cartItems', JSON.stringify(storage));
};
