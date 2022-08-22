import { Client, Environment, ApiError } from "square";

let client: Client;

export function initClient() {
    client = new Client({
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        environment: Environment.Sandbox,
      });
}

export async function createPayment(orders: any) {
    const lineItems = orders.map((e: any) => ({
        name: e.name,
        quantity: '1',
        basePriceMoney: {
          amount: Math.round(e.price),
          currency: 'USD'
        }
      }))
    
    try {
        const response = await client.checkoutApi.createPaymentLink({
          order: {
            locationId: 'L1EHCDHF94JGB',
            lineItems: lineItems
          }
        });
      
        console.log(response.result.paymentLink);
        return response.result.paymentLink;
      } catch(error) {
        console.log(error);
      }
}