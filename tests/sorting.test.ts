import { test, expect } from '@playwright/test';
import { ProductListPage } from './pages/ProductListPage';

test.describe('Product Sorting', () => {
  let productListPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.navigate();
  });

  test('default sorting by position', async () => {
    const products = await productListPage.getProducts();
    const sortedProducts = [...products].sort(); 
    expect(products).toEqual(sortedProducts);
  });

  test('sort by product name', async () => {
    await productListPage.selectSortOption('Product Name');
    let products = await productListPage.getProducts();
    let sortedProducts = [...products].sort(); 
    expect(products).toEqual(sortedProducts);

    await productListPage.toggleSortOrder();
    products = await productListPage.getProducts();
    sortedProducts = [...products].sort().reverse(); 
    expect(products).toEqual(sortedProducts);
  });
});
