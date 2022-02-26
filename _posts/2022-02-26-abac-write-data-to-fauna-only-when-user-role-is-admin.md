---
layout: post
title: ABAC, write data to fauna only when User role is ADMIN
author: sagar_shah
date: 2022-02-27 00:11:55
intro_paragraph: >-
  In this tutorial we are going to see how we can configure our Attribute Based
  Access Control for our database in fauna db. We will be creating a User Table,
  with fields such as user_name, user_roles... Only those with role ADMIN can
  edit, create documents. Let's say the document is the Questions. 




  Normal user without ADMIN role can only read those documents.
---
#### CCreate Schema



Let's begin by creating a schema.

```javascript
type User {
  username: String! @unique
  role: UserRole!
}

enum UserRole {
  ADMIN
  STUDENT
}

type Question {
  content: String!
}
```



#### Import Schema in FAUNA DB

1. Go to <https://dashboard.fauna.com/>
2. Create new database, name it Questions
3. Click on GraphQL on left side bar
4. Click on `Import Schema`
5. Select file `schema.gql` that contains our schema