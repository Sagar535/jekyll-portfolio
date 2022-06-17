---
layout: post
title: FaunaDB, Allow users with certain email to edit documents, PART 1
author: sagar_shah
date: 2022-02-27 13:36:55
intro_paragraph: >-
  ## **Intro**




  In this post we are going to see how we can allow certain users to edit, create documents based on there email. Basically we will have a list of emails and only those in that list can perform basic admin operations... Like editing, deleting and read all the documents.
categories: faunadb javascript js nextjs
tags: faunadb javascript js nextjs
---
## Requirements

Before continuing with this tutorial I recommend you to visit <https://www.kjmczk.dev/blog/crud-app-with-next-js-faunadb-and-graphql> and create a basic CRUD app. The github link for that tutorial is <https://github.com/kjmczk/next-fauna-graphql-crud>. 

After the completion of this tutorial you will have:

1. A faunadb account
2. A database in faunadb say TODO
3. A basic CRUD application where you can create, read, update and delete the todo items

If you go further ahead and visit the tutorial <https://www.kjmczk.dev/blog/implement-faunadb-authentication-in-next-js-and-graphql-app> then you will have a authentication feature as well. Here we are not going to cover those... \
\
Here we will see how we can implement basic admin functionality where certain users will have access to all the users todo item. S/he will be able to update, delete and read those data while normal users will only be able to manipulate and read their own data only.

Even if you don't want to go through all those codes and just have a todo app with authentication powered by faunadb you can follow along.  If you don't have an account already please sign up with this link. <https://dashboard.fauna.com/accounts/register>. Then clone the app from here: <https://github.com/Sagar535/next-fauna-auth>. Run yarn from the terminal to install all the necessary packages.

Go to <https://dashboard.fauna.com/>. Click on create database and name it TODO, you can choose any region to your liking I'm choosing classic. Go to GraphQL from the side menu and you will see something like this:

![Graphql play ground](/assets/uploads/graphql_import_schema.png "Import Schema")

Now click on the import schema and upload the `schema.gql` we have obtained from cloning the github repository. Now you will have access to the graphql playground. You can playaround if you like. Just click on the DOC on the right side and you will be presented with all the queries and mutations. 

But in the mean time lets not use the console to create and manipulate data. Lets use the UI instead.  Click on the security on the left tab. Click on the Security---> Create New Role and name the role Guest. Then make changes as shown in the image below:

![Guest Role Settings](/assets/uploads/guest_role_setting.png "Guest Role Settings")

What are we doing here:

* We are allowing guest to read User because we need to check against the existing user emails
* We are allowing guest to create user because we need to be able to create new user record on the database
* We are reading from unique_user_email index, we will use this to check if the email already exists on the system

Since we are not adding collection todo guest user won't be able to read, create or update any ToDos. Hit save and return to security page. Create a key for the guest users.

![Guest User Key](/assets/uploads/guest_user_key.png "Guest User Key")

Hit save and you will be presented with the secret key with the message `This secret won't be displayed again, so please copy and save it somewhere safe.`So we need to save it now. Open `.env.local` file and paste the key 

```javascript
NEXT_PUBLIC_FAUNA_GUEST_SECRET=<YOUR_SECRET_KEY>
FAUNA_GUEST_SECRET=<YOUR_SECRET_KEY>
```

Now if you fire up your next js server with `yarn dev` then you will see NavBar with `login and signup` but we won't see any todo list. Instead we will see failed to load. That is all as expected...

![Invalid Ref](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/auth_role_mcctuk.png "Invalid Ref")

This is an unexpected error that I have encountered as well. Upon further investigating I found we are making request to different index with little bit of typo. Go to fauna database and click on indexes. If you click on setting icon you will be able to rename the index rename it as shown in image below:

![Rename Index](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/rename_user_by_email_index_vftcbr.png "Rename User by Email Index")

After you hit save you will be able to signup and you will be automatically logged in as well... But still there won't be any todo items... Neither will we be able to view any mechanism to write new todo items. It is because we haven't set our auth role yet. But you can playaround and create as many user as you like. Also you can try logging in and out and it will work just fine. 

![Failed to load](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/failed_to_load_todo_j9wrrr.png "Failed to Load")

### Now lets setup auth role in faunadb

Click on security ---> create new role. Make changes as shown in the image:

![Auth Role Setting](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/auth_role_vdt4t9.png "Auth Role Setting")

Now since we want users to be restricted to there own records only we will implement several other changes:

![ToDo Read Change](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/todo_read_change_nmuggg.png "TODO read change")

![Todo write change](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/todo_write_change_tpc1df.png "Todo Write Change")

![Todo Create Change](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/todo_create_change_fy6fzz.png "Todo Create Change")

![Todo delete changes](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/todo_delete_change_oxm8zl.png "Todo delete changes")

Finally add user as memebership.

![Add member user](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/add_membership_user_ag8nxw.png "Add member user")

Now if you fire the next js server and login you will be able to create, update, view and delete the Todo items. And we have achieved all this without writing single line of code.\
\
That would be all ... We learned how to setup the todo... We don't know much going under the hood but we have a running app in the mean time... If you want to know how exactly things are working check the tutorials mentioned at the very beginning of this blog. \
\
Enjoy playing around. Try to create different user and see that the todo items from one user is not available to another user... \
\
In my next blog I'll explain how we can be admin and view and manipulate all the blogs...