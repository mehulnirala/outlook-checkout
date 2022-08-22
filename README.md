# Email checkout
An idea 💡to help e-commerce integrate checkout experience inside email recommendations/promotions campaigns.

## Inspiration 🥇

Email marketing can help businesses reach a wider audience, drive sales, recover abandoned carts, and further develop their relationship with customers. The user gets redirected to a website guiding them to checkout.

With Square checkout API and using Email add-ins(add-ons) would help bring the checkout experience to where the user is currently, without requiring a context switch.


## Run
- Getting the recommendations email
    - Use [message playground](https://messagecardplayground.azurewebsites.net/) to send yourself an example email of product recommendation.
    - Paste the JSON from [https://outlook-checkout.herokuapp.com/checkout-actionable-message.json](https://outlook-checkout.herokuapp.com/checkout-actionable-message.json) into the editor and send yourself the card (requires login).
- Add your add-in to Outlook desktop following the steps below
    - Click on GetAddins -> My Addins
    - Select Addin from URL and paste the URL [https://outlook-checkout.herokuapp.com/manifest.xml](https://outlook-checkout.herokuapp.com/manifest.xml)
    - Click on install
- Click any item in the actionable message that you sent yourself in the first step.
- Enjoy the checkout experience 🎉

![image](https://user-images.githubusercontent.com/88541725/169943140-0ecf6219-5b35-4a35-a162-d63fee35fd44.png)
![image](https://user-images.githubusercontent.com/88541725/169943234-d2807e09-7bbd-4899-a071-7aa76259b204.png)
![image](https://user-images.githubusercontent.com/88541725/169943283-609d8a1a-d937-41b1-87f2-ff5d9e579c6b.png)
![image](https://user-images.githubusercontent.com/88541725/185916195-0e196ff0-0e68-4cd6-b7a2-e202da748acc.png)

## Build and Run
Set the debug variable in `email-checkout\src\taskpane\utilities.ts` to true

Building the project
```
 $ git clone
 $ cd email-checkout
 $ npm install
 $ cd ../server 
 $ npm install
```

Running the project
Open a new terminal and go to the project root.
```
 $ cd email-checkout
 $ npm start
```
In another terminal/cmd prompt
```
 $ cd server
 $ npm run dev
```

After the installation is done, try the checkout experience by following the [Run](#run) section

## How can it help? ⛑️ 
**Email checkout** is an add-in that helps customers check the recommended (advertised) items directly from the email app (e.g. Outlook).
- It all starts with e-commerce sending customers recommended /abandoned cart products as a card in promotional emails.
- The user can select the items from recommendations (promotions) and are presented with a checkout page without leaving the email client 💻.

## How we built it 🔧 
- The first stage is to design an adaptive card containing product cards that are used to trigger the email add-in checkout.[Card Designer](https://amdesigner.azurewebsites.net/)
- The email add-in is built using React.js and Office.js, which renders the Checkout experience.
- The server uses node.js needed to run the add-in and serves as CDN for HTML and images.

Below is an example card for shoe e-commerce recommendations card.
![image](https://user-images.githubusercontent.com/88541725/185916929-af77ebae-12b5-40c0-990e-469d2a6fd14a.png)


## Challenges we ran into 
The spark began with the idea of embedding checkout experience in email recommendations/promotions, however using iframe inside the email body is not supported by many email providers due to security concerns. This problem was difficult to solve given the closed nature (private source code) of various apps. The idea of using add-ins (add-ons) is a breakthrough to finally achieve email checkout.


## Accomplishments that we're proud of
I am really happy that I was able to create a solution that helps e-commerces enable their customers to use the checkout experience from the email client itself.


## What's next for Email checkout ⏭️
Other important features that I would enjoy adding are:
- Adding various payment methods besides IN Visa.
- Creating an onboarding set up to help customers understand the value of email checkout.
- We would also like to extend the email checkout experience to the GMail addon


## Snaps
![image](https://user-images.githubusercontent.com/88541725/185917159-21007cd9-642e-4041-8f13-934ec014d8b5.png)
![image](https://user-images.githubusercontent.com/88541725/185919864-480dfb79-eab6-42b9-adf6-5ed7f11d17f1.png)
![image](https://user-images.githubusercontent.com/88541725/185920032-67696924-df16-49c4-a59a-3275c07cbe5c.png)
![image](https://user-images.githubusercontent.com/88541725/185920220-0a460c06-3e0e-4034-a8ba-b5858f5ab799.png)
![image](https://user-images.githubusercontent.com/88541725/185920442-04e35b92-88eb-43b2-9e08-6962d53c1ba5.png)
![image](https://user-images.githubusercontent.com/88541725/185920513-44b42914-4816-4004-88b5-eead7f299983.png)
![image](https://user-images.githubusercontent.com/88541725/185920684-1c4f9ba1-fd39-403d-b84c-7c1c5a4c3fe2.png)
![image](https://user-images.githubusercontent.com/88541725/185919935-02433d0b-136c-4a71-9fb5-9b611a57b3ff.png)
![image](https://user-images.githubusercontent.com/88541725/185920290-dbba4c4e-8b11-43e0-9199-e6034a6e0925.png)
![image](https://user-images.githubusercontent.com/88541725/185920575-8ecc87dc-9ba3-4842-81f1-bd4664bceabb.png)
![image](https://user-images.githubusercontent.com/88541725/185920715-032b155c-db53-40f1-8ac6-a596053cde7c.png)


Hope you enjoyed the project 😃.

A sincere thanks to Square and Devpost for creating an opportunity to learn through the Hackathon.

Have a beautiful day 😊.
