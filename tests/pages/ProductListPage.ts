import { Page } from '@playwright/test';

export class ProductListPage {
  readonly page: Page;
  readonly sortByDropdown: string;
  readonly sortOptions: string;
  readonly sortArrow: string;
  readonly productList: string;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = 'select#sort-by';
    this.sortOptions = 'select#sort-by option';
    this.sortArrow = 'button#sort-arrow';
    this.productList = '#layer-product-list';
  }

  async navigate() {
    await this.page.goto('https://highlifeshop.com/speedbird-cafe');
  }

  async selectSortOption(option: string) {
    await this.page.selectOption(this.sortByDropdown, { label: option });
  }

  async toggleSortOrder() {
    await this.page.click(this.sortArrow);
  }

  async getSortOrder() {
    return this.page.evaluate(() => {
      const arrow = document.querySelector('button#sort-arrow');
      return arrow?.classList.contains('descending') ? 'descending' : 'ascending';
    });
  }

  async getProducts() {
    return this.page.$$eval(`${this.productList}`, products => 
      products.map(p => p.textContent?.trim() || '')
    );
  }
}
