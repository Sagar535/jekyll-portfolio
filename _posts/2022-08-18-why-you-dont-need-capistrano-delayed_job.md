---
layout: post
title: Why you don't need capistrano/delayed_job
author: sagar_shah
date: 2022-08-18 21:27:34
intro_paragraph: >-
  **Introduction**




  Capistrano is a great tool for deploying ruby on rails application to the remote server, that be digital ocean droplets or amazon ec2 instance, it is equally effective. With the powerful plugins like capistrano:puma and capistrano:puma:systemd, it also allows us to deploy application by running a single command in our terminal.




  Although capistrano delayed job is also made to make our life easier, If you are having trouble setting it up then you might not need to.
categories: RoR ruby rails rubyonrails
tags: RoR rub rails rubyonrails
---
Well it all comes down to one line of command to make our life easier and run dealyed job daemon. 

```shell
bin/delayed_job start
```

As long as your delayed job configurations are fine, you should be able to run the command and start the delayed job in background process. Since this is one time command we shouldn't bother with the capistrano delayed job. 

### Caveat

But it is not without its drawback. Say you made an change to some job or asynchronous function, the changes won't reflect immediately. The delayed job process is still running with the old codes and configuration. Say you made changes to the smtp server settings, you might be wondering for hours "Why mails are still being sent with old configurations?".\
\
So everytime you make some changes to some configuration or application job or asynchronous function. Be sure to run 

```shell
bin/delayed_job stop 
bin/delayed_job start
```