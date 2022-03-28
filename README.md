# ROCK NYL SERVER #1

Back-end project for e-commerce Rock Nyl (**web**)!

# About the project

This project has been created in the third module at Ironhack São Paulo - Web Development Bootcamp Fulltime.

Simple REST API to allow for complete CRUD at the endpoint:
https://rocknyl.netlify.app/

# Usage

Complete CRUD functionality

## Account Routes

**Create Account**

    POST /account/signup

**Login Account**

    POST /account/login

**Get Current Account**

    GET /account/profile

**Update Account**

    PATCH /account/profile/update

**Hard Delete Account**

    DELETE /account/delete-account

## Product Routes

**Create Product**

    POST /product/create-product

**Show All Artist (Products)**

    GET /product/all-artists

**Get Current Album (Product) by Id**

    GET /product/album/:id

**Get Current Artist (Product) by name**

    GET /product/artist/:artist

**Update Product by Id**

    PATCH /product/edit-product/:id

**Hard Delete Product by Id**

    DELETE /product/delete-product/:id

## Order Routes

**Create Order**

    POST /create-order

**Get Current Order by Id**

    GET /orders/order-details/:orderId

**Soft Delete Order by Id**

    DELETE /orders/delete-order/:orderId

## Password Routes

**Forgot Password**

    POST /password/forgot-password

**New Password**

    PUT /password/reset-password/:token

## Upload Route

**Send Image**

    POST /upload/

# Developers GitHub

- [Bruno Filippini](https://github.com/BrunoFilippini)
- [Bernardo Paes](https://github.com/bersantos22)
- [Lenine Xavier](https://github.com/LenineXavier)

# Rock Nyl CLIENT

Front-end for e-commerce (**web**)!

[Click here](https://github.com/BrunoFilippini/Rock-Nyl-Client)

## Install

To run the application on your localhost, clone the repo and then execute the commands below:

**Note: Don't forget to create .env and update like exemple.env**

- <code>$ git clone https://github.com/BrunoFilippini/Rock-Nyl-Server</code>
- <code>$ npm install</code>
- <code>$ npm run start</code>
