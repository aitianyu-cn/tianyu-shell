/**@format */

import React from "react";
import { IReactProperty, IReactState, ITianyuUIProperty } from "./model/React";
import {
    IInstanceListener,
    InstanceId,
    IStore,
    ITianyuStoreInterfaceImplementation,
    ListenerFactor,
    StoreHelper,
    TianyuStoreEntityInterfaceExpose,
} from "@aitianyu.cn/tianyu-store";
import { generateInterface, registerInterfaceForElement } from "./store/InterfaceInitor";
import { TIANYU_SHELL_REACT_STORE } from "./store/BaseInterface";

/**
 * Tianyu Shell React Element
 *
 * Abstract type with TianyuStore supporting. Element states will be managed by tianyu store automatically
 *
 * @template P element property type
 * @template S element store state type
 */
export abstract class ReactElement<
    P extends IReactProperty = ITianyuUIProperty,
    S extends IReactState = {},
> extends React.Component<P & { state: S }, S> {
    private selfLoaded: boolean;
    private selfId: InstanceId;
    private selfListener: IInstanceListener<S>;

    public constructor(props: P & { state: S }) {
        super(props);

        // to create a default interface for internally using
        const defaultInterface = generateInterface(this.storeType, this.store);

        // generate object independent data
        this.selfLoaded = false;
        this.selfId = StoreHelper.generateInstanceId(
            props.parentInstance,
            TIANYU_SHELL_REACT_STORE,
            `${this.storeType}_${props.id}`,
        );
        this.selfListener = ListenerFactor.createListener(
            defaultInterface.getState(this.selfId),
            this.onStateChanged.bind(this),
        );
    }

    public componentDidMount(): void {
        this.store
            .dispatch(
                TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].action.createInstanceIfNotExist(
                    this.instanceId,
                    this.props.state,
                ),
            )
            .then(() => {
                this.store.startListen(this.selfListener);
                this.selfLoaded = true;
                this.onAfterLoaded();
                this.forceUpdate();
            });
    }
    public componentWillUnmount(): void {
        this.selfLoaded = false;
        this.onBeforeUnloaded();
        this.store.stopListen(this.selfListener);
        this.store.dispatch(
            TianyuStoreEntityInterfaceExpose["tianyu-store-entity-core"].action.destroyInstanceIfExist(this.instanceId),
        );
    }
    public render(): React.ReactNode {
        if (!this.loaded) {
            return this.renderBeforeLoaded() || <div></div>;
        }

        return this.renderUI();
    }
    public forceUpdate(callback?: (() => void) | undefined): void {
        if (!this.loaded) {
            return;
        }
        super.forceUpdate(callback);
    }

    /**
     * Get current element store entity typ
     *
     * @returns return the type
     */
    public get storeType(): string {
        return this.getStoreType();
    }
    /**
     * Get current element object store instance id
     *
     * @returns return the instance id
     */
    public get instanceId(): InstanceId {
        return this.selfId;
    }
    /**
     * Get current element used tianyu store
     *
     * @returns return a interface of used store
     */
    public get store(): IStore {
        return this.props.store;
    }
    /**
     * Get current element is loaded on the DOM and prepared all data
     *
     * @returns return true if the element is rendered on the DOM and all data is ready, otherwise false
     */
    public get loaded(): boolean {
        return this.selfLoaded;
    }

    /** Function to register the store interface into tianyu store */
    protected registInterface(interfaceImpl: ITianyuStoreInterfaceImplementation): void {
        registerInterfaceForElement(this.store, this.storeType, interfaceImpl);
    }

    /**
     * To render the ui view
     *
     * @returns return the react node
     */
    protected abstract renderUI(): React.ReactNode;
    /**
     * Get current element store entity typ
     *
     * @returns return the type
     */
    protected abstract getStoreType(): string;
    /**
     * Function to called for rendering a template UI when the actual content is not ready.
     *
     * @returns return a React object or nothing to return
     */
    protected renderBeforeLoaded(): React.ReactNode | void {}
    /** Function to be called when the element is initialized on the DOM */
    protected onAfterLoaded(): void {}
    /** Function to be called when the element will be unloaded from DOM */
    protected onBeforeUnloaded(): void {}
    /**
     * Function to be called when the element state is changed, and this function should to check whether the state change should re-render the DOM
     *
     * @returns return true means DOM element will be updated, false will not.
     */
    protected onWillUpdated(_oldState: S | undefined, _newState: S | undefined): boolean {
        return true;
    }

    private onStateChanged(oldState: S | undefined, newState: S | undefined): void {
        if (this.onWillUpdated(oldState, newState)) {
            this.forceUpdate();
        }
    }
}
