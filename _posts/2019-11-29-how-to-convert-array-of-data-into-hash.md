---
layout: post
title: How to Convert array of data into hash
author: sagar_shah
date: 2019-11-29 10:34:18
intro_paragraph: >-
  It's a scenario where you have a 1d array of titles in one array say
  `header_array` and another 2d array of data say `data_array` and now you want
  to get the hash out of them.


  Hash have some advantages over array like instead of retrieving data using index we are using key. So it is more descriptive and we also don't need to worry about the arrangement/position of data.
categories: ruby
tags: one_line_solution
---
It is not that difficult at all. We are going to use a method that does it in one line.

```ruby

def hash_from_array(header_array, data_array)

  data_array.map{ |data| header_array.zip(data).to_hash }

end

```
