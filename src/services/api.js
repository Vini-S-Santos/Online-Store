export async function getCategories() {
  try {
    const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const response = await categories.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const product = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const response = await product.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById() {
  try {
    const response = await fetch(` https://api.mercadolibre.com/items/${PRODUCT_ID}`);
    const product = response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
}
