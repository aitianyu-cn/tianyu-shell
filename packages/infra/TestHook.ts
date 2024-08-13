/** @format */

export class TestHook {
    public static debugger(_info?: string): void {
        __TIANYU_SHELL_TEST_HOOK__?.debugger?.(_info);
    }
}
