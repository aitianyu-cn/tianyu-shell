/** @format */

export function expectDebugger(): jest.JestMatchers<() => undefined> {
    return expect(__TIANYU_SHELL_TEST_HOOK__.debugger);
}
