---
layout: post
title: FaunaDB UDF to get number of completed and remaining TODOs
author: sagar_shah
date: 2022-06-22 22:13:48
intro_paragraph: >-
  # Requirements


  Before you continue with this tutorial please complete these ones. You will only be doing minor setups and should be done within 30 minutes.
categories: faunadb udf
tags: faunadb udf
---
1. First demonstrate a traditional way of counting

\- fetch all the todos

\- use js filter and count or length or size, filter by completed field

\-  Explain the limitations and network bandwidth consumptions and db read ops sky rocketing

* Further if we go with this approach there is pagination limit set by fauna itself so if we have too much then we will encounter problems
* Best if we do this all in admin view and not in user view as it is unlikely a single user will have so many todos that counting completed will have several caveats



2. Then demonstrate the UDF way

* write function in the fauna database
* make sure admin has access to call that function
* first call that method with FQL
* then make a graphql endpoint and use that to get the count of completed and uncompleted data



In the end compare the read ops expenditure most probably will have to wait till tomorrow to get the data....