import { IProductQuantity, IStoreQuantity, Stock } from "../models/model";
import { Store } from "../models/store";

/**
 * data service
 * process data jobs
 */

/**
 * takes all stores
 * return stocks data
 * @param stores
 */
export function getMockedStocks(stores: Store[]): Stock[] {
  const stocks: Stock[] = [];

  const products = [
    ...new Set(
      stores
        .reduce(
          (acc, store) => acc.concat(store.stock),
          [] as IProductQuantity[]
        )
        .map((prodQ) => prodQ.productId)
    ),
  ];

  products.forEach((product) => {
    const availability: IStoreQuantity[] = [];
    stores.forEach((store) => {
      const stockItem = store.stock.find(
        (prodQ) => prodQ.productId === product
      );

      if (stockItem && product === stockItem.productId) {
        availability.push({ storeId: store.id, quantity: stockItem.quantity });
      }
    });
    stocks.push({ productId: product, availability });
  });

  return stocks;
}

/**
 * get stores where a given product is available
 * returns partial store (id and coordinates)
 * @param pid
 * @param stores
 * @param s
 */
export function getStoresWithProductAvailable(
  pid: string,
  stores: Partial<Store>[],
  s: Stock[]
): Partial<Store>[] {
  let arr: Partial<Store>[] = [];

  s.filter((_s) => _s.productId === pid).forEach((_s) =>
    _s.availability
      .filter((sq) => sq.quantity > 0)
      .map((sq) => sq.storeId)
      .forEach((sid) => {
        const _store = stores.find((__s) => __s.id === sid);
        if (_store) {
          arr.push(_store);
        }
      })
  );

  return arr;
}
