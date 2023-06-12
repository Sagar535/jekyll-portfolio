---
layout: post
title: Is it possible to run 2 different sidekiqs with single redis server
  withtout interrupting each other
author: sagar_shah
date: 2023-06-12 21:59:05
intro_paragraph: >-
  **Introduction**


  We might eventually come across the situation where we run 2 different applications or same application in different environments in same device. If we don't get the configuration right we might encounter problems. Our sidekiq process doesn't really know from where the thread or task has spawned from and grabs whatever is available when free to perform. So a task that needs to be executed in sidekiq A could be done by B and vice versa giving us headaches. 




  No need to spend hours scratching heads regarding the problem. With simple setting we can fix the problem.
categories: ruby rails email_issue sidekiq sidekiq_job_issue
tags: ruby rails email_issue sidekiq sidekiq_job_issue
---
**Installation**

We just need to add redis-namespace to our Gemfile. After we \`bundle\` to install the gem we are all set.



**Scenario: Same application different environments**



Lets say we have 2 environments, staging and development. For now lets assume we are running both in our local machine. So lets first start by creating file \`initializers/sidekiq.rb\` if you haven't already. 



Now we need to specify which redis database we want our sidekiq to snatch jobs from. For that we need to configure both sidekiq server and client. It will look something simillar like below:

```ruby
Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://localhost:6379/0', namespace: "my_app_name_#{Rails.env}" }
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://localhost:6379/0', namespace: "my_app_name_#{Rails.env}" }
end

```



Just like that having this one initializer code in both of our branches staging and development we won't confuse our sidekiq processes. \
\
Having the namespaces in different applications will work as well. 



NOTE: Please don't for get to test.

Run the sidekiqs in both staging and development branch with command \`bundle exec sidekiq\`

Open rails console and send an email say \`UserMailer.send_account_setup_mail(User.last.id)\`. Run these on both staging and rais console. When you run the command in staging only one sidekiq terminal should be filled with logs and so goes for the development branch.