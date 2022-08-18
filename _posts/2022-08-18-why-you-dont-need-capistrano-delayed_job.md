---
layout: post
title: Why you don't need capistrano/delayed_job
author: sagar_shah
date: 2022-08-18 21:27:34
intro_paragraph: >-
  **Introduction**




  Capistrano is a great tool for deploying ruby on rails application to the remote server, that be digital ocean droplets or amazon ec2 instance, it is equally effective. With the powerful plugins like capistrano:puma and capistrano:puma:systemd, it also allows us to deploy application by running a single command in our terminal.




  Although capistrano delayed job is also made to make our life easier, If you are having trouble setting it up then you might not need to.
categories: RoR rub rails rubyonrails
tags: RoR rub rails rubyonrails
---
Well it all comes down to one line of command to make our life easier and run dealyed job daemon.