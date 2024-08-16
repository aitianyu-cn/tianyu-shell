/** @format */

export async function internationalLoader(): Promise<void> {
    const { loadI18n } = await import(
        /*webpackChunkName: "aitianyu.cn/tianyu-shell/loader" */ "../../../../../infra/resource/MessageLoader"
    );
    await loadI18n();
}
