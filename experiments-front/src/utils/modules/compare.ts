// Compare Arrays
export const arrayEquals = function (value: any[], other: any[]) {
    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen =
        type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen =
        type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (objectEquals(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (objectEquals(value[key], other[key]) === false)
                    return false;
            }
        }
    }

    // If nothing failed, return true
    return true;
};

// Compare Objects

export function objectEquals(x: any, y: any): boolean {
    if (x === null || x === undefined || y === null || y === undefined) {
        return x === y;
    }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) {
        return false;
    }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) {
        return x === y;
    }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) {
        return x === y;
    }
    if (x === y || x.valueOf() === y.valueOf()) {
        return true;
    }
    if (Array.isArray(x) && x.length !== y.length) {
        return false;
    }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) {
        return false;
    }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) {
        return false;
    }
    if (!(y instanceof Object)) {
        return false;
    }

    // recursive object equality check
    var p = Object.keys(x);
    return (
        Object.keys(y).every(function (i) {
            return p.indexOf(i) !== -1;
        }) &&
        p.every(function (i) {
            return objectEquals(x[i], y[i]);
        })
    );
}
