/**@format */

import { CallbackActionT } from "@aitianyu.cn/types";

/**
 * Tianyu Shell HashChanged Callback function
 *
 * @param hash the new hash string
 * @param ev hash changed event from System
 */
export type TianyuShellHashChangedCallback = (hash: string, ev?: HashChangeEvent) => void;

/**
 * Tianyu Shell Event Trigger Callback
 *
 * @param ev System UI Event
 */
export type TianyuShellGenericEventCallback = (ev?: UIEvent) => void;

/** UI Event Controller of Tianyu Shell Core */
export interface ITianyuShellCoreUIEvent<callbackType> {
    /**
     * Setup a listener in the event controller
     *
     * @param listener the listener name
     * @param callback the event trigger callback function
     */
    listen(listener: string, callback: callbackType): void;
    /**
     * Remove a listener from event controller
     *
     * @param listener the listener name
     */
    removeListen(listener: string): void;
    /**
     * Get a boolean value that indicates the event controller contains specific
     * listener or not
     *
     * @param listener the listener name
     *
     * @returns return true the listener is added in event controller, otherwise false.
     */
    contains(listener: string): boolean;
}

/** Page Loaded Event Controller of Tianyu Shell Core */
export type ITianyuShellCoreLoadedEvent = ITianyuShellCoreUIEvent<TianyuShellGenericEventCallback>;

/** Hash Changed Controller of Tianyu Shell Core */
export type ITianyuShellCoreHashChangedEvent = ITianyuShellCoreUIEvent<TianyuShellHashChangedCallback>;

/** Page Resized Controller of Tianyu Shell Core */
export type ITianyuShellCorePageResizeEvent = ITianyuShellCoreUIEvent<TianyuShellGenericEventCallback>;

/** Globalized Event Controller APIs */
export interface ITianyuShellCoreEventController {
    /**
     * Create a new Event Entity
     * The event entity is owned by specific instance
     *
     * @param name the name of the event entity
     * @param triggerId the trigger id of the event entity
     *
     * @returns return a new event entity or get a existing entity if it is created before
     */
    create(name: string, triggerId: string): IEventTriggerEntity;
    /**
     * Delete a Event Entity
     *
     * !!!IMPORTANT
     * ONLY THE CREATER WHO HAS TRIGGER_ID CAN DELETE THE ENTITY
     *
     * @param name the name of event entity
     * @param triggerId the trigger id of event entity
     *
     * @returns return: Success if it is removed from controller
     *                  NoExist if the entity does not exist
     *                  UnAccessible if the entity is owned by other Instance
     */
    delete(name: string, triggerId: string): EventRemoveResult;
    /**
     * Get the event entity does exist in controller or not
     *
     * @param name the event name
     *
     * @returns return true if the event entity is found, otherwise false
     */
    containEvent(name: string): boolean;
    /**
     * Get an event entity
     *
     * @param name the event entity name
     *
     * @returns return a event entity if it does exist, otherwise return a invalid entity
     */
    event(name: string): IEventEntity;
}

/** Event Check List */
export type EventCheckListType = "allow" | "reject";

/** Event invoke check list handler */
export interface IEventCheckListHandler {
    /**
     * To register a checker to control current event is enabled or not temply.
     *
     * IMPORTANT
     * The priority of REJECT list is higher than allow list.
     *
     * @param owner owner of the checker
     * @param checkCallback check callback
     * @param type check list type
     */
    register(owner: string, checkCallback: () => boolean, type?: EventCheckListType): void;
    /**
     * Get the specified checker does exist.
     *
     * @param owner owner of the checker
     * @param type check list type
     *
     * @returns return true if the checker exists, otherwise false.
     */
    contains(owner: string, type?: EventCheckListType): boolean;
    /**
     * Unregister a checker
     *
     * @param owner owner of the checker
     * @param type check list type
     */
    unregister(owner: string, type?: EventCheckListType): void;
}

/** Event Entity for each event */
export interface IEventEntity {
    /**
     * add a listener to event
     *
     * @param {string} listener the listener name (unique id for each different target callback, the same id will be rewrite)
     * @param {CallbackActionT<IEventInvokeData>} callback the trigger of the listener
     */
    listen(listener: string, callback: CallbackActionT<IEventInvokeData>): void;

    /**
     * remove a listener from this event
     *
     * @param listener the listener name
     */
    unlisten(listener: string): void;

    /**
     * get whether the listener is already added
     *
     * @param listener the listener name
     *
     * @returns return true if the listener does exist, otherwise false
     */
    containListener(listener: string): boolean;

    /**
     * get the current event entity is valid.
     *
     * if this return false, that means the event entity will never be triggered.
     *
     * @returns return true if the entity is valid, otherwise false
     */
    isValid(): boolean;
    /** Event check list hander */
    checker(): IEventCheckListHandler;
}

/** Event callback data */
export interface IEventInvokeData {
    /** inner data */
    data: any;
}

/** Event Entity Remove Result */
export enum EventRemoveResult {
    /** Removed success */
    Success,
    /** Event does not exist */
    NoExist,
    /** Event is not created by current instance */
    UnAccessible,
}

/** Event trigger result */
export interface IEventTriggerResult {
    /** flag indicates the event invoke is success or not */
    success: boolean;
    /** errors when invoking */
    errors: any[];
    /** messages during event invoking */
    message?: string[];
}

/** Event Entity Trigger Interface */
export interface IEventTriggerEntity extends IEventEntity {
    /**
     * Asynchronous execution event invoking
     *
     * @param ev the event trigger data
     *
     * @returns return a async Primise
     */
    invoke(ev: IEventInvokeData): Promise<void>;
    /**
     * Synchronous execution event invoking
     *
     * @param ev the event trigger data
     *
     * @returns return Event Trigger Result
     */
    invokeSync(ev: IEventInvokeData): IEventTriggerResult;
}

/** Tianyu Shell Event APIs */
export interface ITianyuShellCoreEvents {
    /** Tianyu Shell Page Loaded Event Controller */
    onLoaded: ITianyuShellCoreLoadedEvent;
    /** Tianyu Shell HashChanged Event Controller */
    onhashChanged: ITianyuShellCoreHashChangedEvent;
    /** Tianyu Shell Page Resized Event Controller */
    onPageResize: ITianyuShellCorePageResizeEvent;
    /** Tianyu Shell General Event Controller */
    controller: ITianyuShellCoreEventController;
}
