# Welcome to Travo 👋 AI Powered Plan Helper

We are having this idea to help all travellers to get a quick travel plan and schedule with the help of AI. Usually the user will just need to add the destinations and the date/time with a click of the the button "Get a plan" to generate a helpful schedule. All he needs to do next is to follow the schedule. This repository is created for frontend application.

Now we are using the OpenAI queries at frontend for testing purposes. We will start working on the backend soon. And we will move the data query and handling to the backend.

<img width="200" alt="Image" src="https://github.com/user-attachments/assets/aad65a62-09a4-439e-91bb-68d875c8fa4c" />

<img width="200" alt="Image" src="https://github.com/user-attachments/assets/707da8fd-a14c-42c6-80c9-78492cebc647" />

<img width="200" alt="Image" src="https://github.com/user-attachments/assets/44cdc6c9-5139-49bf-8da3-0c52ede34a2c" />

<img width="200" alt="Image" src="https://github.com/user-attachments/assets/715d4959-97fd-4cd5-b833-53988a22e076" />

## Phase 1

Our phase one will be pretty light weight.

- We will support mult-destination plan and schedules. Further with schedule displays.
- The app will be able to generate a printable file of this schedule.
- The schedule can be shared by email, social media and chatting softwares.
- We will publish this app in AppStore and GooglePlay.

## Phase 2

We will need to enhance the experience at this phase

- Adding account management, providing login and cloud storing the historical data.
- In-app payment will be available. Request over limit will be charged.
- The app will be able to generate map image and map data for navigation.

## Phase 3

- User will be able to use the app to generate travel stories in a format. It can be stored locally/cloud and sharable in social media
- The app will lead to book the ticket and hotel/Airbnb. We are thinking this will also use AI as a source to help find the best answer, either cost effective or more comfortable.
- More ideas to come ...

## Sources

- [Brain Storm Ideas](https://docs.google.com/document/d/1OV6w7Dhq61LKx0biiWaHDUOld5UnrSauH9Nr7A07dI4/edit?usp=sharing)

- [Figma (WIP)](https://www.figma.com/design/l7BE3dacM1LMse60pLiNUo/Untitled?node-id=1-2158&t=acgKrS3YLB34nR0G-0)

Technology used

- React Expo
- Redux
- AWS - API Gateway, Lambda etc (TODO)
- Open AI Platform

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Config .env
   Add API key in the local file `.env`. Contact repo admin for the key.

3. Start the app

   ```bash
   npx expo start
   ```

4. An example of common used bash,

   ```bash
   npx expo start --ios --reset-cache
   ```

## Tips

- Use cmd + d to get debugger for ios simulator
