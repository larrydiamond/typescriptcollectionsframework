# Typescript Collections Framework
TypeScript port of the Java Collections framework for use in AngularJS

[![NPM](https://nodei.co/npm/typescriptcollectionsframework.png?compact=true)](https://npmjs.org/typescriptcollectionsframework)
[![Build Status](https://travis-ci.org/larrydiamond/typescriptcollectionsframework.svg?branch=master)](https://travis-ci.org/larrydiamond/typescriptcollectionsframework)
[![Dependency Status](https://david-dm.org/larrydiamond/typescriptcollectionsframework.svg)](https://david-dm.org/larrydiamond/typescriptcollectionsframework)

**TypeScript Collections Framework** is a port of the Java Collections framework to TypeScript.   

My hope is to port Set, List, Map, and many of the implementations to TypeScript so that Java developers (like myself) 
also working in TypeScript have access to the Collections we all know and use on a daily basis.

My hope is to get these classes available via NPM and include such classes as HashMap, SkipListMap, ArrayList, and other commonly used classes.

ArrayList is live and available today.  TreeMap and TreeSet will be available soon.   PriorityQueue will also be available soon.   HashMap, SkipListMap, and LinkedList are next.

My stretch goal if I can encourage you to help me (please!) is to add MultiMap and other collections classes that I've used from other places such as Apache Commons and Guava.

**Please** volunteer to contribute.   All contributors will be listed here and I will of course help you to become recognized as a TypeScript expert so it helps your career  :)

# Author
Larry Diamond

# Design methodology
The goal of this library is to provide a "as Java Collections" framework as possible so that developers can migrate their existing Java knowledge to TypeScript and be productive quicker.   It won't be possible to perfectly recreate the framework since the language is not the same, but the goal is to provide as many of the "normal" classes as possible with as many of the "normal" methods as possible.

Semver will be adopted once we are at version 1.0 of this framework.

In TypeScript all objects do not inherit from Object (which we do not control anyway) so a new base Interface called Collectable has been created for ArrayList to support equals().

# Thank you for all the support.   
The number of NPM downloads has been way higher than I expected.  150 in the first three days, 350 in the first five days. That's *way* *way* *way* more interest in what I'm doing than I expected.   Thank you!  

Please feel free to email me at ldiamond at ldiamond dot com with feature requests.  I love to hear from people putting my effort to good use.   :)

# Queue and Priority Queue are coming shortly
A very talented developer has volunteered to implement Queue and PriorityQueue.   He will be properly acknowledged and promoted as a contributor very soon.    Thank you for agreeing to make this framework better, and I really appreciate volunteers!
