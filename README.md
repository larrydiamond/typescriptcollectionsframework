# Typescript Collections Framework
TypeScript port of the Java Collections framework for use in AngularJS

**TypeScript Collections Framework** is a port of the Java Collections framework to TypeScript.   

My hope is to port Set, List, Map, and many of the implementations to TypeScript so that Java developers (like myself) 
also working in TypeScript have access to the Collections we all know and use on a daily basis.

My hope is to get these classes available via NPM and include such classes as HashMap, SkipListMap, ArrayList, and other commonly used classes.

My stretch goal if I can encourage you to help me (please!) is to add MultiMap and other collections classes that I've used from other places such as Apache Commons and Guava.

**Please** volunteer to contribute.   All contributors will be listed here and I will of course help you to become recognized as a TypeScript expert so it helps your career  :)

# Author
Larry Diamond

# Design methodology
The goal of this library is to provide a "as Java Collections" framework as possible so that developers can migrate their existing Java knowledge to TypeScript and be productive quicker.   It won't be possible to perfectly recreate the framework since the language is not the same, but the goal is to provide as many of the "normal" classes as possible with as many of the "normal" methods as possible.

Semver will be adopted once we are at version 1.0 of this framework.

In TypeScript all objects do not inherit from Object (which we do not control anyway) so a new base Interface called Collectable has been created for the equals method and the hashCode method.   Similarly, we will provide "boxed" implementations of boolean, number, and string that are compatible with this library.
