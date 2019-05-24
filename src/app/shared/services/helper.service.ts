import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class HelperService {

      constructor() {
      }

      deepCopy(obj: any): any {
            // return JSON.parse(JSON.stringify(obj));
            return obj.map((x: any) => Object.assign({}, x));
      }

      equals(x: any, y: any): boolean {
            if (x === y) {
                  return true;
            }
            // if both x and y are null or undefined and exactly the same
            if (!(x instanceof Object) || !(y instanceof Object)) {
                  return false;
            }
            // if they are not strictly equal, they both need to be Objects
            if (x.constructor !== y.constructor) {
                  return false;
            }
            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.

            let p;
            for (p in x) {
                  if (!x.hasOwnProperty(p)) {
                        continue;
                  }
                  // other properties were tested using x.constructor === y.constructor
                  if (!y.hasOwnProperty(p)) {
                        return false;
                  }
                  // allows to compare x[ p ] and y[ p ] when set to undefined
                  if (x[p] === y[p]) {
                        continue;
                  }
                  // if they have the same strict value or identity then they are equal
                  if (typeof (x[p]) !== 'object') {
                        return false;
                  }
                  // Numbers, Strings, Functions, Booleans must be strictly equal
                  if (!this.equals(x[p], y[p])) {
                        return false;
                  }
            }
            for (p in y) {
                  if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                        return false;
                  }
            }
            return true;
      }

      isEmpty(obj: any): boolean {
            for (const prop in obj) {
                  if (obj.hasOwnProperty(prop)) {
                        return false;
                  }
            }

            return true;
      }

      groupBy(array: any, key: any): any[] {
            return array.reduce(function(element: any, x: any) {
                  (element[x[key]] = element[x[key]] || []).push(x);
                  return element;
            }, []);
      }

      generateRandom(min: number = 0, max: number = 1000000): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}