# InstaKart-API

# Overview

This is an API for an eCommerce website. I always wanted to create some sort of online store project. I decided on making an online grocery store (even though they already exist). I started this by making an item-api. I created a lot of data for just under 100 real world products. However, this is a better version of that first API that will have far more features and will make it easier to enter and get products.

This is the backend to [InstaKart-front](https://github.com/yZipperer/InstaKart-front)

# Routes
```
Post: http://localhost:8080/cUser                                //creates new user
Post: http://localhost:8080/currentUser                          //gets current user
Post: http://localhsot:8080/currentAdmin                         //gets current admin
Post: http://localhost:8080/brand                                //creates new brand
Get:  http://localhost:8080/brand/:slug                          //gets specified brand
Put:  http://localhost:8080/brand/:slug                          //updates brand
Delete: http://localhost:8080/brand/:slug                        //deletes brand
Post: http://localhost:8080/brands                               //gets brands
Post: http://localhost:8080/subsidiaryBrand                      //creates subsidiary brand
Get:  http://localhost:8080/subsidiaryBrand/:slug                //gets specific subsidiary brand
Put:  http://localhost:8080/subsidiaryBrand/:slug                //updates subsidiary brand
Delete: http://localhost:8080/subsidiaryBrand/:slug              //deletes subsidiary brand
Post: http://localhost:8080/subsidiaryBrands                     //gets subsidiary brands
Post: http://localhost:8080/category                             //creates new category
Get:  http://localhost:8080/category/:slug                       //gets category
Put:  http://localhost:8080/category/:slug                       //updates category
Delete: http://localhost:8080/category/:slug                     //deletes category
Post: http://localhost:8080/categories                           //gets categories
Post: http://localhost:8080/subCategory                          //creates new subcategory
Get:  http://localhost:8080/subCategory/:slug                    //gets subcategory
Put:  http://localhost:8080/subCategory/:slug                    //updates subcategory
Delete: http://localhost:8080subCategory/:slug                   //deletes subcategory
Post: http://localhost:8080/subCategories                        //gets subcategories
Post: http://localhost:8080/product                              //creates new product
Get:  http://localhost:8080/products/:amount/:target/:order"     //lists products based on amount, target, and order (only active products are sent)
Get:  http://localhost:8080/allproducts/:amount                  //lists all products, including inactive ones (for admin)
Get:  http://localhost:8080/products/:season/:amount             //lists products based on season
Delete: http://localhost:8080/product/:slug                      //deletes product
Get: http://localhost:8080/product/:slug                         //gets individual product
Put: http://localhost:8080/product/:slug                         //updates product
```