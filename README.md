# Frontend Library Website Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![Material UI](https://img.shields.io/badge/MUI-v.1-hotpink)

This project was built in purpose of creating a Fullstack web application at Integrify's Fullstack program. The duty was to create an library website and connect with our backend (group work) using our own API endpoints from [this endpoint](https://library-management-system-api-172j.onrender.com/api/v1/api-docs/).

## Deployment

[In GitHub Page](https://tungnguyen12.github.io/Library-Frontend/)

[In AWS EC2](http://ec2-52-205-228-243.compute-1.amazonaws.com/)

## Table of content

- [Technologies](#technologies)
- [Features](#features)
- [Project overview](#project-overview)
- [Project structure](#project-structure)
- [Run the project](#running-the-project)
- [Deployment](#deployment)

## Technologies

1. Typescript
2. Material UI
3. React
4. Redux Toolkit
5. Jest

## Features

### Visitor (not sign in)

- Able to view all books, find book with filter options, view books' detail page
- Able to sign up/sign in

### Borrower (sign in as Borrower)

- Able to access User page / Cart page
- Able to sign out
- Able to add book to their cart
- Able to manage their books in cart by empty/remove actions the book

### Admin (sign in as admin)

- Able to update/delete book in book detail page
- Able to access AdminDashboard page with all users' information and all books information and create new book

## Project overview

This project DOESN'T require student to use any specific Frontend technologies but the author use those mentioned [Technologies](#technologies)

## Project structure

```
.
.
├── .prettierrc
├── package.json
├── README.md
├── tsconfig.json
└── src
    ├── common
    ├── components
    │   ├── admin
    │   │   └── components
    │   └── icons
    ├── hooks
    ├── pages
    ├── redux
    │   ├── reducers
    │   ├── selector
    │   │   └── cart
    │   └── services
    ├── test
    │   ├── common
    │   ├── data
    │   └── reducers
    └── types
        ├── author
        ├── book
        ├── cart
        ├── category
        └── user

```

## Run the project

**Runtime environment: NodeJS**

1. Clone the project to your machine
2. Run 'npm install'
3. Run 'npm start' / 'npm run start' to deploy temporary web in your local host
4. Run 'npm test' to see the test

## Deployment

Visit my work [in GitHub Page](https://tungnguyen12.github.io/Library-Frontend/) or [in AWS EC2](http://ec2-52-71-57-136.compute-1.amazonaws.com/)
