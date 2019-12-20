import {Injectable} from '@angular/core';
import {Settings} from "../config/settings.service";

declare let Symbol: any;

@Injectable()
export class utils {

    private loadedScripts = {};

    constructor(private settings: Settings) {}

    static isIterable(item) {
        return typeof item[Symbol.iterator] === 'function' || this.isFileList(item);
    }

    static isFileList(item) {
        return item instanceof FileList;
    }

    static strContains(haystack: string|string[], needle: string): boolean {
        if ( ! haystack || ! needle) return false;

        needle = needle.toLowerCase();

        if ( ! Array.isArray(haystack)) {
            haystack = [haystack];
        }

        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i].toLowerCase().indexOf(needle) > -1) return true;
        }

        return false;
    }

    /**
     * Convert "2018-02-05 13:51:1" into {date, time} object.
     */
    static splitDateTime(dateTime: string): {date: string, time: string} {
        if ( ! dateTime) return {date: null, time: null};
        const split = dateTime.split(' ');
        return {date: split[0], time: split[1]};
    }

    /**
     * Get object property via dot notation string.
     */
    static getObjectProp(obj: Object, prop: string): any {
        if ( ! obj) return null;
        const arr = prop.split('.');
        while(arr.length && (obj = obj[arr.shift()]));
        return obj;
    }

    /**
     * Uppercase first letter of specified string.
     */
    static ucFirst(string: string) {
        return (string.charAt(0).toUpperCase() + string.slice(1)) as any;
    }

    /**
     * Flatten specified array of arrays.
     */
    static flattenArray(arrays: any[][]): any[] {
        return [].concat.apply([], arrays);
    }

    static moveArrayElement(array: any[], from: number, to: number) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }

    /**
     * Slugify given string for use in urls.
     */
    static slugifyString(text): string {
        if ( ! text) return text;

        return text.trim()
            .replace(/["']/g, '')
            .replace(/[^a-z0-9-]/gi, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .toLowerCase();
    }

    static randomString(length: number = 36) {
        var random = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            random += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return random;
    }

    /**
     * Load js script and return promise resolved on script load event.
     */
    public loadScript(url, params: {id?: string, force?: boolean} = {}): Promise<any> {
        //script is already loaded, return resolved promise
        if (this.loadedScripts[url] === 'loaded' && ! params.force) {
            return new Promise((resolve) => resolve());

            //script has never been loaded before, load it, return promise and resolve on script load event
        } else if ( ! this.loadedScripts[url]) {
            this.loadedScripts[url] = new Promise((resolve, reject) => {
                let s: HTMLScriptElement = document.createElement('script');
                s.async = true;
                s.id = params.id || url.split('/').pop();
                s.src = url.indexOf('//') > -1 ? url : this.settings.getAssetUrl()+url;

                s.onload = () => {
                    this.loadedScripts[url] = 'loaded';
                    resolve();
                };

                document.body.appendChild(s);
            });

            return this.loadedScripts[url];

            //script is still loading, return existing promise
        } else {
            return this.loadedScripts[url];
        }
    }

    static poll(fn: Function, timeout: number = 2000, interval: number = 100): Promise<any> {
        const endTime = Number(new Date()) + timeout;

        const checkCondition = (resolve, reject) => {
            //If the condition is met, we're done!
            const result = fn();
            if (result) resolve(result);

            //If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(checkCondition, interval, resolve, reject);
            }

            //Didn't match and too much time, reject!
            else {
                reject(new Error('timed out for ' + fn));
            }
        };

        return new Promise(checkCondition);
    }
}