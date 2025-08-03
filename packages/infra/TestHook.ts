/** @format */

export class TestHook {
    public static debugger(_info?: string): void {
        try {
            __TIANYU_SHELL_TEST_HOOK__?.debugger?.(_info);
        } catch {
            // this is to avoid error in TEST_HOOK
        }
    }
}
