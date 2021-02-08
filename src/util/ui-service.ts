import { Placeholder } from "../components/placeholder";
import { Drone } from "../models/drone";
import { Plan, Stock } from "../models/model";
import { Order } from "../models/order";

/**
 * ui service
 * renders table rows to the DOM
 * @param tableName
 * @param tableBody
 * @param data
 */
function renderTable(
  tableName: string,
  tableBody: Element,
  data: unknown[]
) {
  if (tableName === "stocks") {
    for (const stock of <Stock[]>data) {
      const row = document.createElement("tr");

      const productName = document.createElement("td");
      productName.textContent = stock.productId;
      row.appendChild(productName);

      const villeneuve = document.createElement("td");
      const roncq = document.createElement("td");
      const lesquin = document.createElement("td");

      stock.availability.forEach((sq) => {
        if (sq.storeId === "Villeneuve") {
          villeneuve.textContent = sq.quantity.toString();
        }
        if (sq.storeId === "Roncq") {
          roncq.textContent = sq.quantity.toString();
        }
        if (sq.storeId === "Lesquin") {
          lesquin.textContent = sq.quantity.toString();
        }
      });

      row.appendChild(villeneuve);
      row.appendChild(roncq);
      row.appendChild(lesquin);

      tableBody.appendChild(row);
    }
  }

  if (tableName === "drones") {
    for (const drone of <Drone[]>data) {
      const row = document.createElement("tr");

      const droneId = document.createElement("td");
      droneId.textContent = drone.id;
      row.appendChild(droneId);

      const autonomy = document.createElement("td");
      autonomy.textContent = drone.autonomy.toString();
      row.appendChild(autonomy);

      const x = document.createElement("td");
      x.textContent = drone.x.toString();
      row.appendChild(x);

      const y = document.createElement("td");
      y.textContent = drone.y.toString();
      row.appendChild(y);

      tableBody.appendChild(row);
    }
  }

  if (tableName === "orders") {
    for (const order of <Order[]>data) {
      const row = document.createElement("tr");

      if (order.status === "DELIVERED") {
        row.classList.add("disable-row");
      }

      const orderId = document.createElement("td");
      orderId.textContent = order.id;
      row.appendChild(orderId);

      const customer = document.createElement("td");
      customer.textContent = order.customerId;
      row.appendChild(customer);

      const products = document.createElement("td");
      let basketContent: string = "";
      for (const item of order.basket) {
        basketContent += `${item.quantity}x ${item.productId}, `;
      }
      basketContent = basketContent.trim();

      products.textContent = basketContent.substring(
        0,
        basketContent.length - 1
      );
      row.appendChild(products);

      tableBody.appendChild(row);
    }
  }

  if (tableName === "plans") {
    if ((<Plan[]>data).length > 0) {
      for (const plan of <Plan[]>data) {
        const row = document.createElement("tr");

        const droneId = document.createElement("td");
        droneId.textContent = plan.droneId;
        row.appendChild(droneId);

        const storeId = document.createElement("td");
        storeId.textContent = plan.storeId;
        row.appendChild(storeId);

        const product = document.createElement("td");
        product.textContent = plan.product;
        row.appendChild(product);

        const customerId = document.createElement("td");
        customerId.textContent = plan.customerId.toString();
        row.appendChild(customerId);

        tableBody.appendChild(row);
      }
    } else {
      new Placeholder();
    }
  }
}

export function createColumns(theadElement: HTMLElement, cn: string[], d: string) {
  const tr = document.createElement("tr");
  cn.forEach((columnName) => {
    const th = document.createElement("th");
    th.id = `${d}-${columnName}`;
    th.textContent =
      columnName.charAt(0).toUpperCase() + columnName.substr(1);
    tr.appendChild(th);
  });
  theadElement.appendChild(tr);
}

export function populateTable<T>(tableName: string, el: HTMLDivElement, data: T[]) {
  const tableBody = el.querySelector("#table-body")!;
  tableBody.innerHTML = "";

  renderTable(tableName, tableBody, data);
}