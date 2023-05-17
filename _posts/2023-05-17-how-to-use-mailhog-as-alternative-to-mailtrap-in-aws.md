---
layout: post
title: How to use MailHog as alternative to mailtrap in aws
author: sagar_shah
date: 2023-05-17 08:39:44
intro_paragraph: >-
  **Context**


  Have you ever found yourself in a situation where your application undergoes extensive testing, and your email testing and trapping activities unexpectedly exceed the generous free tier limit of 500 emails per month offered by Mailtrap? This predicament can pose a significant challenge for many of us. While some may consider halting the testing process (which is clearly not a viable option), or resorting to paid services, there exists a compelling alternative: MailHog comes to the rescue.
---
**Introduction**



[MailHog](https://github.com/mailhog/MailHog) is an essential tool for developers and testers worldwide, providing a comprehensive solution for efficient email testing and trapping. With its unique approach of capturing outgoing emails and redirecting them to a local testing server, MailHog allows developers to thoroughly analyze and debug email functionalities without the need for real recipients or cluttered inboxes. Its flexibility, support for various protocols, and user-friendly web interface make it effortless to integrate into existing workflows and ensure the reliability and robustness of application email communication.



**Our use case (mailhog in aws staging server)**

MailHog can be easily adapted for staging environments with minor tweaks. By configuring MailHog to mimic staging conditions, developers can accurately test and address any email-related issues before deploying to production. This ensures the integrity and reliability of applications throughout the development process.



We are going to setup mailhog in existing rails application in staging environment.



**Installation**

Since most of the servers are ubuntu lets follow along for that one. You can visit the [mailhog](https://github.com/mailhog/MailHog) github documentation for installation in your OS.

```shell
sudo apt-get -y install golang-go
go get github.com/mailhog/MailHog
```



Now you can run the mailhog with command:

```shell
~/go/bin/MailHog
```



If you get the error



```
go: go.mod file not found in current directory or any parent directory; see 'go help modules'


```



Then fix it with: 



```shell
go env -w GO111MODULE=off
```