export function loadOrders() {
  const ordersJson = localStorage.getItem("orders");
  if (ordersJson) {
    return JSON.parse(ordersJson);
  }
  return [];
}

export const saveOrder = (order) => {
  const orders = loadOrders();

  let id = 1;
  if (orders.length > 0) {
    id = orders[orders.length - 1].id + 1;
  }

  order.id = id;

  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
};
