---
layout: post
title: How to clean nested parameters for multiple data entry
author: sagar_shah
date: '2019-12-16 12:55:07'
intro_paragraph: >-
  ## Scenario


  Let's imagine we have a e-commerce site. We allow admin to manage products.
  Each product can have custom items. So product has many items.


  We are using cocoon gem to allow user to select multiple items. But lets say
  we have 100 items and there is no restriction for what items to be included.
  So an admin can select several items with repetition. But we our product to
  include that item only once.
categories: ruby
tags: ruby
---
## A cleaner in model

We can have a cleaning function in model like

{% highlight ruby %}

def remove_repeated_items 		\
    uniq_ids = product_items.select("Min(id) as id").group(:item_id).collect(&:id)

\    product_items.where.not(id: uniq_ids).destroy_all end

{% endhighlight %}

So we will call the function after the record is saved. 

{% highlight ruby %}

after_save :remove_repeated_items

{% endhighlight %}
