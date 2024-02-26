/**@format */

import { MapOfType, guid } from "@aitianyu.cn/types";
import { IRouterCallbackEvent, ITianyuRouterProvider, RouterCallback } from "../declares/Router";
import { ITianyuShell } from "../declares/Declare";
import { TianyuShellProcessor } from "../utils/Processor";
import { RuntimeNotSupportException } from "../declares/Exception";
import { getText } from "./i18n/Message";

interface IRouteNode {
    end: RouterCallback | null;
    children: MapOfType<IRouteNode>;
}

interface IRouteExpItem {
    regex: RegExp;
    end: RouterCallback;
    priority: number;
}

interface ICurrentRoute {
    hash: string;
    routeType: "Map" | "Exp";
    id: string;
    callback: RouterCallback;
}

const FailRouteDefaultCallback: RouterCallback = (ev: IRouterCallbackEvent) => {
    console.log(getText("ROUTER_FAIL_PATH_INVALID", ev.hash));
};

const RouteDefaultCallback: RouterCallback = (ev: IRouterCallbackEvent) => {
    console.log(getText("ROUTER_DEFAULT", ev.hash));
};

class RouteTrie {
    /** route actrie to save all route pathes */
    private routeMap: IRouteNode;
    /** route regex map */
    private routeExp: MapOfType<IRouteExpItem>;
    private failRoute: RouterCallback;
    private regexBase: boolean;

    private forceUpdate: boolean;
    private currentRoute: ICurrentRoute;

    public constructor() {
        this.routeMap = {
            end: RouteDefaultCallback,
            children: {},
        };
        this.routeExp = {};
        this.failRoute = FailRouteDefaultCallback;
        this.regexBase = false;

        this.forceUpdate = true;
        this.currentRoute = {
            hash: "",
            routeType: "Map",
            id: "",
            callback: FailRouteDefaultCallback,
        };
    }

    public forceRegex(force: boolean): void {
        this.regexBase = force;
    }

    public addPath(path: string, callback: RouterCallback): void {
        const purePath = path.startsWith("/") ? path.substring(1) : path;
        const dirs = purePath.split("/");

        const fnAddDir = function (dir: string, nodesMap: IRouteNode): IRouteNode {
            if (!Object.keys(nodesMap.children).includes(dir)) {
                nodesMap.children[dir] = {
                    end: null,
                    children: {},
                };
            }

            return nodesMap.children[dir];
        };

        let map = this.routeMap;
        for (const dir of dirs) {
            if (!!!dir) {
                continue;
            }

            map = fnAddDir(dir, map);
        }

        map.end = callback;
    }

    public removePath(path: string): void {
        const formattedPath = path.startsWith("/") ? path.substring(1) : path;
        const dirs = formattedPath.split("/");

        let fatherMap = null;
        let map = this.routeMap;
        let dirName = "";
        for (const dir of dirs) {
            if (!!!dir) continue;

            dirName = dir;
            fatherMap = map;
            map = map.children[dir];

            if (!!!map) break;
        }

        if (!!map) {
            if (!!!Object.keys(map.children).length) {
                delete fatherMap?.children[dirName];
            } else {
                map.end = null;
            }
        }
    }

    public removeRegex(id: string): void {
        if (this.routeExp[id]) {
            delete this.routeExp[id];
        }
    }

    public addRegex(id: string, reg: RegExp, callback: RouterCallback, priority: number): void {
        for (const existId of Object.keys(this.routeExp)) {
            const item = this.routeExp[existId];
            if (item.regex === reg && item.priority === priority) {
                return;
            }
        }

        this.routeExp[id] = {
            regex: reg,
            end: callback,
            priority: priority,
        };
    }

    public route(hash: string, ev?: HashChangeEvent): void {
        // when the hash value is not changed and the forceUpdate flag is false
        // return directly
        if (!this.forceUpdate && hash === this.currentRoute.hash) {
            return;
        }

        const dirs = hash.split("/");
        let map: IRouteNode | null = this.routeMap;

        const fnTestMap = function (dir: string, routeMap: IRouteNode): IRouteNode | null {
            let map: IRouteNode | null = null;

            for (const child of Object.keys(routeMap.children)) {
                if (dir === child || dir.startsWith(`${child}?`)) {
                    map = routeMap.children[child];
                    break;
                }
            }

            return map;
        };

        for (const dir of dirs) {
            if (!!!dir) {
                continue;
            }

            map = fnTestMap(dir, map);
            if (!!!map) break;
        }

        let routeType: "Map" | "Exp" = "Map";
        let fnRouter = null;
        if (!!map?.end) {
            fnRouter = map.end;
        }

        let id = null;
        if (this.regexBase || !!!fnRouter) {
            let priority: number | null = null;
            for (const expId of Object.keys(this.routeExp)) {
                const item = this.routeExp[expId];
                if (item.regex.test(hash)) {
                    if (priority === null || item.priority > priority) {
                        id = expId;
                        priority = item.priority;
                        fnRouter = item.end;
                    }
                }
            }
            if (priority !== null) {
                routeType = "Exp";
            }
        }

        // check the update state again
        if (!this.forceUpdate) {
            if (routeType === this.currentRoute.routeType && fnRouter === this.currentRoute.callback) {
                if ((routeType === "Exp" && id === this.currentRoute.id) || routeType === "Map") {
                    return;
                }
            }
        }

        this.currentRoute.callback = fnRouter || this.failRoute;
        this.currentRoute.hash = hash;
        this.currentRoute.id = id || "";
        this.currentRoute.routeType = routeType;

        // Todo: when the UI finished, to support the document update
        const routeEvent: IRouterCallbackEvent = {
            hash: hash,
            oldURL: ev?.oldURL,
        };
        this.currentRoute.callback(routeEvent);
    }

    public setRouteFail(callback: RouterCallback): void {
        this.failRoute = callback;
    }

    public resetRouteFail(): void {
        this.failRoute = FailRouteDefaultCallback;
    }
}

// ############################################
// Router History
// ############################################

interface IRouterHistory {
    current: number;
    histories: string[];
    historyIds: string[];
}

const _routerHistory: IRouterHistory = {
    current: -1,
    histories: [],
    historyIds: [],
};

const _routerTree = new RouteTrie();

function _setHashCode(hash: string): void {
    const formattedHash = hash.replace("//", "/");
    window.location.hash = `#${formattedHash}`;
}

function _getHash(): string {
    const hash = (window.location.hash as string).substring(1);
    return hash;
}

/** Router Provider Implementation */
const _router: ITianyuRouterProvider = {
    forceRegex: function (force: boolean): void {
        _routerTree.forceRegex(force);
    },
    setRouteFail: function (callback: RouterCallback): void {
        _routerTree.setRouteFail(callback);
    },
    resetRouteFail: function (): void {
        _routerTree.resetRouteFail();
    },
    addRoutePath: function (path: string, callback: RouterCallback): void {
        _routerTree.addPath(path, callback);
    },
    addRouteRegex: function (id: string, reg: RegExp, callback: RouterCallback, priority: number): void {
        _routerTree.addRegex(id, reg, callback, priority);
    },
    removeRoutePath: function (path: string): void {
        _routerTree.removePath(path);
    },
    removeRouteRegex: function (id: string): void {
        _routerTree.removeRegex(id);
    },
    jump: function (hash: string, rollback: boolean = true, id?: string): void {
        let formattedHash = hash;
        if (formattedHash.startsWith("#")) formattedHash = formattedHash.substring(1);
        if (formattedHash.startsWith("/")) formattedHash = formattedHash.substring(1);

        const oldHash = _getHash();
        if (oldHash === formattedHash) {
            return;
        }

        // handle history
        if (rollback) {
            // process router id
            // if not assign router id, to use a guid
            let routerId = id;
            if (!!!routerId) {
                routerId = guid();
            } else if (_routerHistory.historyIds.includes(routerId)) {
                // if router id duplicates, to add a time flag
                routerId = `${routerId}_${Date.now()}`;
            }
            if (_routerHistory.current !== _routerHistory.histories.length - 1) {
                // in this case, the current router is not the lastest
                // should remove the the routers after current router before push new router
                const newHistories: string[] = [];
                const newHistoryIds: string[] = [];
                for (let i: number = 0; i <= _routerHistory.current; ++i) {
                    newHistories.push(_routerHistory.histories[i]);
                    newHistoryIds.push(_routerHistory.historyIds[i]);
                }
                _routerHistory.histories = newHistories;
                _routerHistory.historyIds = newHistoryIds;
            }
            _routerHistory.histories.push(formattedHash);
            _routerHistory.historyIds.push(routerId);
            _routerHistory.current = _routerHistory.histories.length - 1;
        }

        _setHashCode(formattedHash);
    },
    back: function (): void {
        if (_routerHistory.current > 0) {
            --_routerHistory.current;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    forward: function (): void {
        if (_routerHistory.current < _routerHistory.histories.length - 1) {
            ++_routerHistory.current;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    start: function (): void {
        if (0 !== _routerHistory.current) {
            _routerHistory.current = 0;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    end: function (): void {
        if (_routerHistory.histories.length - 1 !== _routerHistory.current) {
            _routerHistory.current = _routerHistory.histories.length - 1;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    go: function (target: number | string): void {
        let index = typeof target === "string" ? _routerHistory.historyIds.indexOf(target) : target;
        if (index >= 0 && index < _routerHistory.histories.length && index !== _routerHistory.current) {
            _routerHistory.current = index;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    move: function (delta: number): void {
        const index = _routerHistory.current + delta;
        if (index >= 0 && index < _routerHistory.histories.length && index !== _routerHistory.current) {
            _routerHistory.current = index;
            _setHashCode(_routerHistory.histories[_routerHistory.current]);
        }
    },
    history: function (): string[] {
        const result: string[] = [];
        for (const router of _routerHistory.historyIds) {
            result.push(router);
        }

        return result;
    },
    current: function (): string {
        return _routerHistory.historyIds[_routerHistory.current];
    },
    length: function (): number {
        return _routerHistory.histories.length;
    },
};

function _initTianyuShellRouterProvider(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.router) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                router: _router,
            },
        };
    }
}

const runtimeSupport = TianyuShellProcessor.getRuntimeSupport();

runtimeSupport.router && _initTianyuShellRouterProvider();

/**
 * Tianyu shell Router API package
 */
export class Router {
    /**
     * Set the router to map hash with regex always.
     * True means the router will map hash by regex even if the path mapped already.
     *
     * @param {boolean} force force map hash with regex
     */
    public static forceRegex(force: boolean): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.forceRegex(force);
    }

    /**
     * To set the fail router
     *
     * @param {RouterCallback} callback fail router callback
     */
    public static setFail(callback: RouterCallback): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.setRouteFail(callback);
    }

    /**
     * Reset fail router to default
     */
    public static resetFail(): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.resetRouteFail();
    }

    /**
     * Remote a specified hash router path.
     *
     * @param {string} path specified hash path
     */
    public static removePath(path: string): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.removeRoutePath(path);
    }

    /**
     * Remove a specified hash mapping regex.
     *
     * @param {string} id the id of the hash mapping regex
     */
    public static removeRegex(id: string): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.removeRouteRegex(id);
    }

    /**
     * Add a new path for router.
     *
     * @param {string} path hash router path
     * @param {RouterCallback} callback the router callback function of current path
     */
    public static addPath(path: string, callback: RouterCallback): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.addRoutePath(path, callback);
    }

    /**
     * Add a new hash mapping regex for router. In mapping process, the high priority hash mapping
     * regex will be accepted.
     *
     * @param {string} id the id of current new hash mapping regex
     * @param {RegExp} reg the regex for checking hash value
     * @param {RouterCallback} callback the router callback function if the regex is mapped
     * @param {number} priority the hash priority of current new mapping regex
     */
    public static addRegex(id: string, reg: RegExp, callback: RouterCallback, priority: number): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.addRouteRegex(id, reg, callback, priority);
    }

    /**
     * Get current url hash value
     *
     * @returns {string} return the hash value of current url
     */
    public static getHash(): string {
        return _getHash();
    }

    /**
     * Set url to new hash value.
     *
     * @param {string} hash the new hash value
     * @param {boolean} rollback whether should record the history (true to record the history and the rollback is supported, false will not)
     */
    public static jump(hash: string, rollback?: boolean): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.jump(hash, rollback);
    }

    /**
     * Back to the preious hash value if current hash value is not the first.
     */
    public static back(): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.back();
    }

    /**
     * Go to the next hash value if current hash value is not the lastest.
     */
    public static forward(): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.forward();
    }

    /**
     * Route to the first one.
     */
    public static start(): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.start();
    }

    /**
     * Route to the lastest one.
     */
    public static end(): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.end();
    }

    /**
     * Route to the specified hash item or id
     *
     * @param {number | string} target the target hash index or the id
     */
    public static go(target: number | string): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.go(target);
    }

    /**
     * Move to specified route hash item.
     *
     * @param {number} delta the delta value of current hash item (negative number will goback and the positive number will go forward)
     */
    public static move(delta: number): void {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        ((window as any).tianyuShell as ITianyuShell).core.router.go(delta);
    }

    public static getHistory(): string[] {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        return ((window as any).tianyuShell as ITianyuShell).core.router.history();
    }

    public current(): string {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        return ((window as any).tianyuShell as ITianyuShell).core.router.current();
    }
    public length(): number {
        if (runtimeSupport.router) {
            throw new RuntimeNotSupportException(getText("ROUTER_EXCEPTION_NAME"));
        }
        return ((window as any).tianyuShell as ITianyuShell).core.router.length();
    }
}
