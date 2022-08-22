import axios from "axios";

const debug = false;
const SERVER_URL = debug ? "http://localhost:5000" : "https://outlook-checkout.herokuapp.com";

export async function getCheckoutObject(data: any) {
  const response = await axios.post(`${SERVER_URL}/checkout`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data.url;
}

export function getInvokedSelection(items, selection) {
  if (!items) return [];
  if (!selection || !selection.id) return items;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id == selection.id) {
      items[i].selected = true;
    }
  }
  return items;
}
