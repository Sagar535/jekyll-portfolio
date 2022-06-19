---
layout: post
title: FaunaDB, Allow users with certain email to edit documents, PART 2
author: sagar_shah
date: 2022-06-17 20:55:10
intro_paragraph: >-
  ## Intro


  Before you continue with this tutorial it is essential that you visit <https://cdrsagar.netlify.app/faunadb/javascript/js/nextjs/2022/02/27/faunadb-allow-users-with-certain-email-to-edit-documents.html>




  If you do as it is shown in the PART 1 of this tutorial then you will have a working TODO app with authentication already setup. Now we will look into how we can implement an admin feature. Basically we will set certain users with certain email as admin and they will have access to all the data.
categories: faunadb user_defined_functions nextjs
tags: faunadb udf nextjs
---
First lets create 2 users who will be admin. Logout if you are logged in and go to sign up page. Sign up with email  `admin@example.com` and password of your liking. For this tutorial I will be choosing password `foobar` .  

![Admin Sign Up](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/admin_signup_jhi45b.png "Admin Sign Up")



Similarly, lets create another admin user with email `admin1@example.com` .



Now we should setup the admin role who will have access to read and manipulate all the todos. Lets create new role and call it VIP (`we are not going to use admin as admin and server are default roles of faunadb`). Lets setup role access as shown in image below:

![VIP role](https://res.cloudinary.com/dgz1zaji9/faunadb_email_admin_blog/vip_role_fxzedg.png "VIP Role")



Now we need to specify users with specific emails as member of the VIP role. Go to membership tab and make changes as follows: 

![VIP membership](https://res.cloudinary.com/dgz1zaji9/image/upload/v1655636115/faunadb_email_admin_blog/vip_membership_ytxrvp.png "VIP membership")

 

In code:

```sql
Lambda(
  "ref",
  ContainsValue(Select(["data", "email"], Get(Var("ref"))), [
    "admin@example.com",
    "admin1@gmail.com"
  ])
)
```



If you save now and visit your site... Fire up the server and logout if you are already logged in as admin while signing up.  Now login with either of the email `admin@example.com` or `admin1@gmail.com`  you will be able to view todos created by other users as well.



I'm just trying to demonstrate how you can quickly setup a VIP roles based on admins. You don't need to write single line of JavaScript code or update any of the schema to obtain the admin feature. That's all for this tutorial... Cheers!!!