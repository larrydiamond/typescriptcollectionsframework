# Typescript Collections Framework
TypeScript Collections Framework - a port of the Java Collections framework for use with AngularJS

[![NPM](https://nodei.co/npm/typescriptcollectionsframework.png?compact=true)](https://npmjs.org/typescriptcollectionsframework)
[![Build Status](https://travis-ci.org/larrydiamond/typescriptcollectionsframework.svg?branch=master)](https://travis-ci.org/larrydiamond/typescriptcollectionsframework)
[![devDependencies Status](https://david-dm.org/larrydiamond/typescriptcollectionsframework/dev-status.svg)](https://david-dm.org/larrydiamond/typescriptcollectionsframework?type=dev)
[![Code Coverage](https://codecov.io/gh/larrydiamond/typescriptcollectionsframework/branch/master/graphs/badge.svg?branch=master)](
https://codecov.io/gh/larrydiamond/typescriptcollectionsframework)

**TypeScript Collections Framework** is a port of the Java Collections framework to TypeScript.   

[ArrayList](https://github.com/larrydiamond/typescriptcollectionsframework/wiki/ArrayList), [LinkedList](https://github.com/larrydiamond/typescriptcollectionsframework/wiki/LinkedList), [HashMap](https://github.com/larrydiamond/typescriptcollectionsframework/wiki/HashMap), [TreeMap](https://github.com/larrydiamond/typescriptcollectionsframework/wiki/TreeMap), and TreeSet are all live and available today.  PriorityQueue will also be available soon.  HashSet and SkipListMap are next.

[List](https://github.com/larrydiamond/typescriptcollectionsframework/wiki/List) and [NavigableMap](https://github.com/larrydiamond/typescriptcollectionsframework/wiki/NavigableMap) interfaces are also available with many others to come soon (or are already here and aren't yet documented :) )

My goal of this project is to port over as many of the classes and interfaces I've previously used as a Java developer to TypeScript and to eventually incorporate some of the classes from Apache Commons Collections and Google Guava.   

**Please** volunteer to contribute.   All contributors will be listed here and I will of course help you to become recognized as a TypeScript expert so it helps your career  :)

# Demo project with Angular 4
Demo: https://larrydiamond.github.io/typescriptcollectionsframework-Demo-For-Angular4/dist/

Source: https://github.com/larrydiamond/typescriptcollectionsframework-Demo-For-Angular4


# Demo project with Angular 2
Demo: https://larrydiamond.github.io/typescriptcollectionsframework-Demo-For-Angular2/dist/

Source: https://github.com/larrydiamond/typescriptcollectionsframework-Demo-For-Angular2

# Installation instructions

Install `typescriptcollectionsframework` from `npm`
```bash
npm install typescriptcollectionsframework --save
```

# How to build for development
 - clone repository
 - `npm install`
 - `npm test`

# Author
Larry Diamond https://www.linkedin.com/in/larry-diamond-3964042/

# Design methodology
The goal of this library is to provide a "as Java Collections" framework as possible so that developers can migrate their existing Java knowledge to TypeScript and be productive quicker.   It won't be possible to perfectly recreate the framework since the language is not the same, but the goal is to provide as many of the "normal" classes as possible with as many of the "normal" methods as possible.

Semver will be adopted once we are at version 1.0 of this framework.

In TypeScript all objects do not inherit from Object (which we do not control anyway), so we made added a parameter to the constructors of each class to compare objects and calculate hash codes.   As a result, anything can be put into the Collections, even string, number, and classes from other packages.   There is no String class to wrap string, no Number class to wrap number, and no Boolean class to wrap boolean.   No autoboxing and no autounboxing.

# Thank you for all the support.   
The number of NPM downloads has been way higher than I expected.  150 in the first three days, 350 in the first five days, 600 in the first week. That's *way* *way* *way* more interest in what I'm doing than I expected.   Thank you!  The volume has been steadily increasing each month since then.

Please feel free to email me at ldiamond at ldiamond dot com with feature requests.  I love to hear from people putting my effort to good use.   :)

# Queue and Priority Queue are coming shortly
A very talented developer has volunteered to implement Queue and PriorityQueue.   He will be properly acknowledged and promoted as a contributor very soon.    Thank you for agreeing to make this framework better, and I really appreciate volunteers!
