---
layout: post
title: How to use MailHog as alternative to mailtrap in aws
author: sagar_shah
date: 2023-05-17 08:39:44
intro_paragraph: >-
  **Context**


  Have you ever found yourself in a situation where your application undergoes extensive testing, and your email testing and trapping activities unexpectedly exceed the generous free tier limit of 500 emails per month offered by Mailtrap? This predicament can pose a significant challenge for many of us. While some may consider halting the testing process (which is clearly not a viable option), or resorting to paid services, there exists a compelling alternative: MailHog comes to the rescue.
categories: "mailhog "
tags: mailhog rails mailtrap_alternative
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

# And run the command again

~/go/bin/MailHog
```

After this you have mailhog listening at locahost port 1025 for smtp emails. And you can view those mails from localhost port 8025.

If you are just testing your mails in local server for just the alternative to mailcatcher then we are done here.\
But our goal here is to use it as alternative to Mailtrap and not be limited by its 500 emails per month free tier.

**Setup Nginx to show the mails**

```
# nginx reverse proxy to port 8025

server {
        listen 80;
        server_name   mailhog.example.com;

        access_log /var/log/nginx/mailhog-access.log;
        error_log /var/log/nginx/mailhog-error.log;

        location / {
                    proxy_pass http://127.0.0.1:8025;
  }
}
```

This is an Nginx server configuration that sets up a reverse proxy to redirect incoming requests to a specific port.

Here's a breakdown of the code:

1. `server`: This block defines the server configuration for Nginx.
2. `listen 80;`: It specifies that Nginx should listen on port 80 for incoming requests.
3. `server_name mailhog.example.com;`: This line sets the server name or domain for which this configuration is valid. In this case, it is set to "mailhog.example.com".
4. `access_log /var/log/nginx/mailhog-access.log;`: It defines the location and filename for the access log file. This file will store information about incoming requests.
5. `error_log /var/log/nginx/mailhog-error.log;`: This line sets the location and filename for the error log file. It will record any errors or issues encountered by Nginx while processing requests.
6. `location / {`: This block defines a location directive in Nginx. It specifies that requests coming to the root URL ("/") will be affected by the following directives.
7. `proxy_pass http://127.0.0.1:8025;`: This line sets up the reverse proxy by specifying the target URL where the requests should be forwarded. In this case, it is set to "[http://127.0.0.1:8025](http://127.0.0.1:8025/)", which means the requests will be sent to the local IP address (127.0.0.1) on port 8025.

In summary, this Nginx configuration sets up a reverse proxy that listens on port 80 for requests coming to "mailhog.example.com". Any incoming requests to this domain will be proxied to the local IP address (127.0.0.1) on port 8025. This configuration is commonly used to redirect incoming web traffic to another backend server or application running on a different port or machine.



**Point dns namespace to correct ip address**

*NOTE: It could take up to 5 minutes for DNS to work properly.*

You should see the mailhog page already.

**Point staging server's mails to port 1025**

Now you can see the incoming mails.