/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import { ICacheLike } from 'axios-extensions';
declare module 'axios' {
    interface AxiosRequestConfig {
        // if your cacheFlag was setting to 'useCache'
        useCache?: boolean | ICacheLike<any>;
    }
}