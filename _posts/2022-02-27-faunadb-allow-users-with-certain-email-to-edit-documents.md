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

Even if you don't want to go through all those codes and just have a todo app with authentication powered by faunadb you can follow along.  If you don't have an account already please sign up with this link. <https://dashboard.fauna.com/accounts/register>. Then clone the app from here: <https://github.com/Sagar535/next-fauna-auth>

Go to <https://dashboard.fauna.com/>. Click on create database and name it TODO, you can choose any region to your liking I'm choosing classic. Go to GraphQL from the side menu and you will see something like this:

![Graphql play ground](/assets/uploads/graphql_import_schema.png "Import Schema")



Now click on the import schema and upload the `schema.gql` we have obtained from cloning the github repository. Now you will have access to the graphql playground. You can playaround if you like. Just click on the DOC on the right side and you will be presented with all the queries and mutations.