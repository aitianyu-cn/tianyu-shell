/** @format */

export function shellEnvHandler(): void {
    // to save tianyu-shell env
    (window as any).tianyuShell = {
        ...(window as any).tianyuShell,
        env: {
            ...((window as any).tianyuShell?.env || {}),
            initial: true,
        },
    };
}
