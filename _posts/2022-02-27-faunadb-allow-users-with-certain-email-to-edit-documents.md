---
layout: post
title: FaunaDB, Allow users with certain email to edit documents
author: sagar_shah
date: 2022-02-27 13:36:55
intro_paragraph: >-
  ## **Intro**




  In this post we are going to see how we can allow certain users to edit, create documents based on there email. Basically we will have a list of emails and only those in that list can perform basic admin operations... Like editing, deleting and read all the documents.
---
## Requirements

Before you continue with this tutorial I want you to visit <https://www.kjmczk.dev/blog/crud-app-with-next-js-faunadb-and-graphql> and develop a basic crud app. You can find the a github link <https://github.com/kjmczk/next-fauna-graphql-crud> in the tutorial as well. 



If you complete the tutorial then you will have:



1. A faunadb account
2. A database in faunadb say TODO
3. A basic CRUD application where you can create, read, update and delete the todo items



If you go further ahead and visit the tutorial <https://www.kjmczk.dev/blog/implement-faunadb-authentication-in-next-js-and-graphql-app> then you will have a authentication feature as well. Here we are not going to cover those... \
\
Here we will see how we can implement basic admin functionality where certain users will have access to all the users todo item. S/he will be able to update, delete and read those data while normal users will only be able to manipulate and read their own data only.