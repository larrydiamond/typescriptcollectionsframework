"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("./ArrayList");
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var Collections_1 = require("./Collections");
/**
 * Decorates a collection of other collection to provide a single unified view.
 *
 * This class corresponds to org.apache.commons.collections4.collection.CompositeCollection
 */
var CompositeCollection = /** @class */ (function () {
    function CompositeCollection() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.impl = new CompositeCollectionImpl();
        for (var loop = 0; loop < values.length; loop++) {
            var tmp = values[loop];
            if ((tmp !== null) && (tmp !== undefined)) {
                this.impl.add(tmp);
            }
        }
    }
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    CompositeCollection.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    CompositeCollection.prototype.isEmpty = function () {
        return this.impl.isEmpty();
    };
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    CompositeCollection.prototype.contains = function (item) {
        return this.impl.contains(item);
    };
    /**
     * Performs the given action for each element until all elements have been processed or the action throws and exception.
     * Exceptions thrown by the action are relayed to the caller
     */
    CompositeCollection.prototype.forEach = function (consumer) {
        return this.impl.forEach(consumer);
    };
    /**
    * Override JSON.stringify handling
    */
    CompositeCollection.prototype.toJSON = function () {
        return this.impl.toJSON();
    };
    /**
     * Returns a Java style iterator.   The order of the elements returned by the iterator should not be relied upon.
     * Since the underlying Collections could be modified between the call to hasNext() and next(),
     * there is no guarantee that next() will return a value even if hasNext() returns true.
     * In this scenario then next() will return undefined
     * @return {JIterator<K>} the Java style iterator
     */
    CompositeCollection.prototype.iterator = function () {
        return this.impl.iterator();
    };
    /**
    * Returns a TypeScript style iterator.   The order of the elements returned by the iterator should not be relied upon
    * @return {Iterator<K>} the TypeScript style iterator
    */
    CompositeCollection.prototype[Symbol.iterator] = function () {
        return this.impl.tsIterator();
    };
    return CompositeCollection;
}());
exports.CompositeCollection = CompositeCollection;
/* Java style iterator */
var CompositeCollectionJavaIterator = /** @class */ (function () {
    function CompositeCollectionJavaIterator(iic) {
        this.ic = iic;
    }
    CompositeCollectionJavaIterator.prototype.hasNext = function () {
        if ((this.collit === null) || (this.collit === undefined)) {
            this.collit = this.ic.components.iterator();
            while (true) {
                if (this.collit.hasNext()) {
                    this.cloc = this.collit.next();
                    this.locit = this.cloc.iterator();
                    if (this.locit.hasNext())
                        return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            if (this.locit.hasNext()) {
                return true;
            }
            else {
                while (true) {
                    if (this.collit.hasNext()) {
                        this.cloc = this.collit.next();
                        this.locit = this.cloc.iterator();
                        if (this.locit.hasNext())
                            return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    };
    CompositeCollectionJavaIterator.prototype.next = function () {
        if (this.locit.hasNext()) {
            return this.locit.next();
        }
        else {
            while (true) {
                if (this.collit.hasNext()) {
                    this.cloc = this.collit.next();
                    this.locit = this.cloc.iterator();
                    if (this.locit.hasNext())
                        return this.locit.next();
                }
                else {
                    return undefined;
                }
            }
        }
    };
    return CompositeCollectionJavaIterator;
}());
/* TypeScript iterator */
var CompositeCollectionIterator = /** @class */ (function () {
    function CompositeCollectionIterator(iic) {
        this.ic = iic;
    }
    // tslint:disable-next-line:no-any
    CompositeCollectionIterator.prototype.next = function (value) {
        if ((this.collit === null) || (this.collit === undefined)) {
            this.collit = this.ic.components.iterator();
            while (true) {
                if (this.collit.hasNext()) {
                    this.cloc = this.collit.next();
                    this.locit = this.cloc.iterator();
                    if (this.locit.hasNext())
                        return new BasicIteratorResult_1.BasicIteratorResult(false, this.locit.next());
                }
                else {
                    return new BasicIteratorResult_1.BasicIteratorResult(true, null);
                }
            }
        }
        else {
            if (this.locit.hasNext()) {
                return new BasicIteratorResult_1.BasicIteratorResult(false, this.locit.next());
            }
            else {
                while (true) {
                    if (this.collit.hasNext()) {
                        this.cloc = this.collit.next();
                        this.locit = this.cloc.iterator();
                        if (this.locit.hasNext())
                            return new BasicIteratorResult_1.BasicIteratorResult(false, this.locit.next());
                    }
                    else {
                        return new BasicIteratorResult_1.BasicIteratorResult(true, null);
                    }
                }
            }
        }
    };
    return CompositeCollectionIterator;
}());
var CompositeCollectionImpl = /** @class */ (function () {
    function CompositeCollectionImpl() {
        this.components = new ArrayList_1.ArrayList();
    }
    CompositeCollectionImpl.prototype.add = function (ic) {
        if ((ic !== null) && (ic !== undefined)) {
            this.components.add(ic);
        }
    };
    CompositeCollectionImpl.prototype.size = function () {
        var tempSize = 0;
        for (var iter = this.components.iterator(); iter.hasNext();) {
            var is = iter.next();
            tempSize = tempSize + is.size();
        }
        return tempSize;
    };
    CompositeCollectionImpl.prototype.isEmpty = function () {
        for (var iter = this.components.iterator(); iter.hasNext();) {
            var is = iter.next();
            if (!is.isEmpty()) {
                return false;
            }
        }
        return true;
    };
    CompositeCollectionImpl.prototype.contains = function (item) {
        for (var iter = this.components.iterator(); iter.hasNext();) {
            var is = iter.next();
            if (is.contains(item)) {
                return true;
            }
        }
        return false;
    };
    CompositeCollectionImpl.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    CompositeCollectionImpl.prototype.toJSON = function () {
        var tmp = Collections_1.Collections.asArray(this);
        return JSON.stringify(tmp);
    };
    CompositeCollectionImpl.prototype.iterator = function () {
        return new CompositeCollectionJavaIterator(this);
    };
    CompositeCollectionImpl.prototype[Symbol.iterator] = function () {
        return new CompositeCollectionIterator(this);
    };
    CompositeCollectionImpl.prototype.tsIterator = function () {
        return new CompositeCollectionIterator(this);
    };
    return CompositeCollectionImpl;
}());
