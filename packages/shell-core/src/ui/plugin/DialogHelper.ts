/**@format */

import { DialogBase } from "./Core";

export class DialogHelper {
    /**
     * Get count of opened dialog
     *
     * @returns return the count of opened dialogs
     */
    public static count(): number {
        return DialogBase().layer.count();
    }

    /**
     * Create a dialog layer over the latest existing layer
     *
     * @returns return the new dialog layer id
     */
    public static async create(): Promise<string | null> {
        return DialogBase().layer.create();
    }

    /**
     * Get all created layers id
     *
     * @returns return all layers id
     */
    public static layers(): string[] {
        return DialogBase().layer.layers();
    }

    /**
     * Switch using layer to specified layer
     *
     * @param layerId specified layer id
     */
    public static switch(layerId: string): void {
        DialogBase().layer.switch(layerId);
    }

    /**
     * Remove specified layer by id
     *
     * @param layerId removed layer id
     */
    public static remove(layerId: string): void {
        DialogBase().layer.remove(layerId);
    }

    /**
     * Get current using layer id
     *
     * @returns return layer id which is using
     */
    public static current(): string {
        return DialogBase().layer.current();
    }

    /**
     * Get current using layer index of all layers
     *
     * @returns return layer index
     */
    public static index(): number {
        return DialogBase().layer.index();
    }
}
