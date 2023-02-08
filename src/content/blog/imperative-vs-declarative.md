---
title: Imperative VS Declarative Programming
description: Comparing the pros and cons of imperative and declarative programming
date: 05/02/23
draft: true
tags:
    - paradigm
---

What is imperative programming and declarative programming? First, functional programming is just a subparadigm of declarative programming. So we can say in most programming langauges you can write both imperative code and declarative code. There are also many languages (or maybe only markup langauges?) that are only declarative. For example, HTML and CSS are just all declarative languages. When writing declarative code, you won't see statements like `for` or `while` loops. In web development, fullstack developers need to not only write imperative code, but also a bunch of declarative code. For example, frontend developers write TSX, which contains both TypeScript's syntax (mostly imperative) and HTML's syntax (which is declarative). Why do we need to write two completely different types of code? Why don't we just use one paradigm for all our apps and softwares? There must be some reasons behind that.

# Imperative programming

The computer is imperative and procedural. This means that the computer gets some inputs, and then do some **procedures in a sequence** and finally it has some outputs. This is a little bit like what functional programming is like, but functional programming is a declarative way. I don't really think imperative programming is bad way to code, but I do think there are many disadvantages when writing imperative code. One of them is just the state of the code is not predictable. This means that it's gonna be really hard to debug the internal state of the program. Let's not talk too much about imperative programming, which is not the part that I want to focus on today.

# Declarative programming

**Declarative programming is the right way to code.** We have been seeing people changing from imperative to declarative. TSX is just a nice example of declarative programming. Writing jQuery is just much more painful than the declarative way. SwiftUI is another example of using declarative programming. With the rise of functional programming, declarative programming has become more and more popular unknowingly. Now it's already proved that declarative programming IS the best way to develop UI (e.g. React and all the JSX-based fontend frameworks, SwiftUI). We should migrate our all of our imperative code to declarative code (even if it seems that it's impossible).
