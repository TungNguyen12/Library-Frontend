# Front-end E-Commerce Website Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![Material UI](https://img.shields.io/badge/MUI-v.1-hotpink)

This project was built in purpose of studying at Frontend Module of Integrify's Fullstack program. The duty was to create an e-commerce website using API endpoints from [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/).

## Deployment

You can visit my e-commerce website [HERE](https://main--e-commerce-by-pete.netlify.app/)

## Table of content

-   [Technologies](#technologies)
-   [Features](#features)
-   [Project overview](#project-overview)
-   [Project structure](#project-structure)
-   [Run the project](#running-the-project)
-   [Deployment](#deployment)

## Technologies

1. Typescript
2. Material UI
3. React
4. Redux Toolkit
5. Jest

## Features

### Visitor (not login)

-   Able to view all products, products by categories, find product, view product detail page
-   Able to register/login

### Customer (login as customer)

-   Able to access Profile page / Cart page
-   Able to Logout
-   Able to manage their products in cart with increase/decrease/remove the product or empty their cart

### Admin (login as admin)

-   Able to modify/delete product in Product detail page
-   Able to access AdminDashboard page with all users information and all products information

## Project overview

This project requires student to use mentioned [Technologies](#technologies)

Here is a list of specific requirements divided into Basic requirements and Bonus Requirements

**Basic requirements**

-   [x] Fetch and display all and single products.
-   [x] Create at least 4 pages (products, profile, user, cart)
-   [x] Product reducer
-   [x] User reducer
-   [x] Cart reducer
-   [x] Adding and removing from the cart
-   [x] Login and authorization (admins can delete and update products)
-   [x] Routing and private pages
-   [x] Testing the reducers
-   [x] Rewrite the README, deploy the project, add the deployment link here and to the README.md

**Bonus requirements**

-   [] Context API
-   [x] Pagination when fetching and displaying.
-   [x] Any performance optimization, remember to mention it ie useMemo, debounce, etc (in this project I use useMemo hook)

## Project structure

```
.
├───package.json
├───README.md
├───tsconfig.json
└───src
    ├───admin
    │   └───components
    ├───components
    ├───hooks
    ├───pages
    ├───redux
    │   ├───reducers
    │   ├───selectors
    │   │   └───cart
    │   └───services
    ├───test
    │   ├───common
    │   ├───data
    │   └───reducers
    └───types
        ├───cart
        ├───product
        └───user
```

## Run the project

**Runtime environment: NodeJS**

1. Clone the project to your machine
2. Run 'npm install'
3. Run 'npm start' / 'npm run start' to deploy temporary web in your local host
4. Run 'npm test' to see the test

## Deployment

Visit my work [HERE](https://main--e-commerce-by-pete.netlify.app/)
