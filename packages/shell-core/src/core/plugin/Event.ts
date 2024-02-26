/**@format */

import { CallbackActionT, MapOfType } from "@aitianyu.cn/types";
import {
    EventRemoveResult,
    IEventInvokeData,
    IEventEntity,
    IEventTriggerEntity,
    IEventTriggerResult,
    ITianyuShellCoreEventController,
    ITianyuShellCoreLoadedEvent,
    ITianyuShellCoreHashChangedEvent,
    TianyuShellHashChangedCallback,
    TianyuShellGenericEventCallback,
    ITianyuShellCorePageResizeEvent,
} from "../declares/Event";
import { ITianyuShellPluginSetting } from "../declares/Core";
import { TianyuShellProcessor } from "../utils/Processor";
import { ITianyuShell } from "../declares/Declare";
import { getText } from "./i18n/Message";

/** Invalid event entity to avoid null object checking */
const _InvalidEventEntity: IEventTriggerEntity = {
    listen: function (_listener: string, _callback: CallbackActionT<IEventInvokeData>): void {
        // there is nothing to do.
    },
    unlisten: function (_listener: string): void {
        // there is nothing to do.
    },
    containListener: function (_listener: string): boolean {
        // there will always return false since this is an invalid entity.
        return false;
    },
    isValid: function (): boolean {
        // there will always return false since this is an invalid entity.
        return false;
    },

    invoke: async function (ev: IEventInvokeData): Promise<void> {
        return Promise.reject();
    },
    invokeSync: function (ev: IEventInvokeData): IEventTriggerResult {
        // there is nothing to do.
        return {
            success: false,
            errors: [
                {
                    message: "this is not a valid event entity!",
                },
            ],
        };
    },
};

/** Event Entity Implementation */
class EventEntity implements IEventTriggerEntity {
    /** event listener list */
    private triggerList: MapOfType<CallbackActionT<IEventInvokeData>>;

    public constructor() {
        this.triggerList = {};
    }

    invoke(ev: IEventInvokeData): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const listeners = Object.keys(this.triggerList);
            if (listeners.length === 0) {
                resolve();
                return;
            }

            const invokeList: Promise<void>[] = [];
            for (const listener of listeners) {
                const trigger = this.triggerList[listener];

                // async exection all listener
                invokeList.push(
                    new Promise<void>((resolve, reject) => {
                        try {
                            trigger(ev);
                            resolve();
                        } catch (e: any) {
                            reject(e);
                        }
                    }),
                );
            }

            Promise.all(invokeList).then(() => {
                resolve();
            }, reject);
        });
    }
    invokeSync(ev: IEventInvokeData): IEventTriggerResult {
        const listeners = Object.keys(this.triggerList);
        if (listeners.length === 0) {
            return {
                success: true,
                errors: [],
                message: [getText("EVENT_SYNC_INVOKE_EMPTY")],
            };
        }

        const aErrors: any[] = [];
        let successCount: number = 0;
        let totalCount: number = 0;
        for (const listener of listeners) {
            const trigger = this.triggerList[listener];
            ++totalCount;

            try {
                trigger(ev);
                ++successCount;
            } catch (e: any) {
                aErrors.push(e);
            }
        }

        return {
            success: aErrors.length === 0,
            errors: aErrors,
            message: [
                getText("EVENT_SYNC_INVOKE_RESULT_TOTAL", [totalCount]),
                getText("EVENT_SYNC_INVOKE_RESULT_SUCCESS", [successCount]),
            ],
        };
    }

    public clean(): void {
        this.triggerList = {};
    }

    listen(listener: string, callback: CallbackActionT<IEventInvokeData>): void {
        this.triggerList[listener] = callback;
    }
    unlisten(listener: string): void {
        if (!!this.triggerList[listener]) {
            delete this.triggerList[listener];
        }
    }
    containListener(listener: string): boolean {
        return !!this.triggerList[listener];
    }
    isValid(): boolean {
        return true;
    }
}

interface IEventMap {
    triggerId: string;
    entity: EventEntity;
}

const _eventMap: MapOfType<IEventMap> = {};

/** Event controller instance */
const _eventController: ITianyuShellCoreEventController = {
    create: function (name: string, triggerId: string): IEventTriggerEntity {
        const event = _eventMap[name];
        if (!!event) {
            if (event.triggerId === triggerId) {
                // if found a event and the event owner is current trigger
                // return exist event entity
                return event.entity;
            } else {
                // if the event owner is different
                // to return a empty event entity to avoid incorrect event trigger
                return _InvalidEventEntity;
            }
        }

        const newEntity = new EventEntity();
        _eventMap[name] = {
            triggerId: triggerId,
            entity: newEntity,
        };
        return newEntity;
    },
    delete: function (name: string, triggerId: string): EventRemoveResult {
        const event = _eventMap[name];
        if (!!!event) {
            return EventRemoveResult.NoExist;
        }

        if (event.triggerId !== triggerId) {
            return EventRemoveResult.UnAccessible;
        }

        event.entity.clean();
        delete _eventMap[name];
        return EventRemoveResult.Success;
    },
    containEvent: function (name: string): boolean {
        return !!_eventMap[name];
    },
    event: function (name: string): IEventEntity {
        const eventEntity = _eventMap[name]?.entity || _InvalidEventEntity;
        return eventEntity;
    },
};

const _loadedMap: MapOfType<TianyuShellGenericEventCallback> = {};

const _coreOnLoadedEvent: ITianyuShellCoreLoadedEvent = {
    listen: function (listener: string, callback: TianyuShellGenericEventCallback): void {
        _loadedMap[listener] = callback;
    },
    removeListen: function (listener: string): void {
        if (_loadedMap[listener]) {
            delete _loadedMap[listener];
        }
    },
    contains: function (listener: string): boolean {
        return !!_loadedMap[listener];
    },
};

const _hashEventMap: MapOfType<TianyuShellHashChangedCallback> = {};

const _coreHashEvent: ITianyuShellCoreHashChangedEvent = {
    listen: function (listener: string, callback: TianyuShellHashChangedCallback): void {
        _hashEventMap[listener] = callback;
    },
    removeListen: function (listener: string): void {
        if (_hashEventMap[listener]) {
            delete _hashEventMap[listener];
        }
    },
    contains: function (listener: string): boolean {
        return !!_hashEventMap[listener];
    },
};

const _PageResizeEventMap: MapOfType<TianyuShellGenericEventCallback> = {};

const _corePageResizeEvent: ITianyuShellCorePageResizeEvent = {
    listen: function (listener: string, callback: TianyuShellGenericEventCallback): void {
        _PageResizeEventMap[listener] = callback;
    },
    removeListen: function (listener: string): void {
        if (_PageResizeEventMap[listener]) {
            delete _PageResizeEventMap[listener];
        }
    },
    contains: function (listener: string): boolean {
        return !!_PageResizeEventMap[listener];
    },
};

function _onLoaded(): void {
    for (const listener of Object.keys(_loadedMap)) {
        _loadedMap[listener]();
    }
}

function _onHashChanged(ev?: HashChangeEvent): void {
    const hash = (window.location.hash as string).substring(1);
    for (const listener of Object.keys(_hashEventMap)) {
        _hashEventMap[listener](hash, ev);
    }
}

// set a invoke shake to record timer
let _eventInvokeShake: number = -1;
function _onPageResized(ev?: UIEvent): void {
    if (_eventInvokeShake !== -1) {
        return;
    }

    // use set timeout to avoid page resizing shake
    _eventInvokeShake = window.setTimeout(() => {
        for (const listener of Object.keys(_PageResizeEventMap)) {
            const callback = _PageResizeEventMap[listener];
            callback();
        }

        _eventInvokeShake = -1;
    }, 50);
}

function _initTianyuShellEvent(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.event) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                event: {
                    onLoaded: _coreOnLoadedEvent,
                    onhashChanged: _coreHashEvent,
                    onPageResize: _corePageResizeEvent,
                    controller: _eventController,
                },
            },
        };

        // register page events
        document.body.onload = _onLoaded;
        window.onhashchange = _onHashChanged;
        document.body.onresize = _onPageResized;
    }
}

const _pluginSetting: ITianyuShellPluginSetting = TianyuShellProcessor.getPluginSetting();

_pluginSetting.globalize && _initTianyuShellEvent();

/** Tianyu Shell Event */
export class Event {
    /**
     * Setup a listener when page loaded
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenLoaded(listener: string, callback: TianyuShellGenericEventCallback): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onLoaded.listen(listener, callback)
            : _coreOnLoadedEvent.listen(listener, callback);
    }
    /**
     * Remove a page loaded listener
     *
     * @param listener the listener name
     */
    public static removelistenLoaded(listener: string): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onLoaded.removeListen(listener)
            : _coreOnLoadedEvent.removeListen(listener);
    }
    /**
     * Get a boolean value that indicates the event controller contains specific
     * listener or not
     *
     * @param listener the listener name
     *
     * @returns return true the listener is added in event controller, otherwise false.
     */
    public static containsLoaded(listener: string): boolean {
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onLoaded.contains(listener)
            : _coreOnLoadedEvent.contains(listener);
    }

    /**
     * Setup a listener when hash changed
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenHashChanged(listener: string, callback: TianyuShellHashChangedCallback): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onhashChanged.listen(listener, callback)
            : _coreHashEvent.listen(listener, callback);
    }
    /**
     * Remove a hash changed listener
     *
     * @param listener the listener name
     */
    public static removelistenHashChanged(listener: string): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onhashChanged.removeListen(listener)
            : _coreHashEvent.removeListen(listener);
    }
    /**
     * Get a boolean value that indicates the event controller contains specific
     * listener or not
     *
     * @param listener the listener name
     *
     * @returns return true the listener is added in event controller, otherwise false.
     */
    public static containsHashChanged(listener: string): boolean {
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onhashChanged.contains(listener)
            : _coreHashEvent.contains(listener);
    }

    /**
     * Setup a listener when page resized
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    public static listenPageResize(listen: string, callback: TianyuShellGenericEventCallback): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onPageResize.listen(listen, callback)
            : _corePageResizeEvent.listen(listen, callback);
    }
    /**
     * Remove a page resized listener
     *
     * @param listener the listener name
     */
    public static removelistenPageResize(listen: string): void {
        _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onPageResize.removeListen(listen)
            : _corePageResizeEvent.removeListen(listen);
    }
    /**
     * Get a boolean value that indicates the event controller contains specific
     * listener or not
     *
     * @param listener the listener name
     *
     * @returns return true the listener is added in event controller, otherwise false.
     */
    public static containsPageResize(listen: string): boolean {
        return _pluginSetting.globalize
            ? ((window as any).tianyuShell as ITianyuShell).core.event.onPageResize.contains(listen)
            : _corePageResizeEvent.contains(listen);
    }
}

/** Tianyu Shell Event Controller */
export const EventController: ITianyuShellCoreEventController = _pluginSetting.globalize
    ? ((window as any).tianyuShell as ITianyuShell).core.event.controller
    : _eventController;
