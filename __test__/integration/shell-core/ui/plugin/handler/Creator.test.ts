/** @format */

import { TianyuUI } from "shell-core/src/core/declares/ui/TianyuUI";
import { createHTMLbyTianyuUI } from "shell-core/src/ui/plugin/handler/Creator";

describe("aitianyu-cn.node-module.tianyu-shell.integration.shell-core.ui.plugin.handler.Creator", () => {
    describe("createHTMLbyTianyuUI", () => {
        it("-", () => {
            const content: TianyuUI = {
                id: "content",
                type: "div",
                style: {},
                styles: {
                    base: ["text-style", "content"],
                },
                children: [
                    {
                        id: "yes-button",
                        type: "button",
                        style: {
                            width: "100px",
                            height: "50px",
                        },
                        event: {
                            click: () => undefined,
                        },
                        others: { name: "yes", type: "submit" },
                        styles: ["button-1"],
                    },
                ],
            };
            const root: TianyuUI = {
                id: "test-root",
                type: "div",
                style: {},
                classes: ["user-not-input"],
                others: { lang: "false", popover: "test-popover" },
                children: [
                    {
                        id: "title",
                        type: "div",
                        style: {},
                        innerText: "Title",
                        styles: "text-style",
                    },
                    {
                        id: "sub-title",
                        type: "div",
                        style: {},
                        innerHTML: "<h1>Sub Title</h1>",
                    },
                    {
                        id: "sub-title-2",
                        type: "div",
                        style: {},
                        outerText: "<h1>Sub Title - 2</h1>",
                    },
                    content,
                ],
            };

            const htmlElement = createHTMLbyTianyuUI(root);

            expect(htmlElement.id).toEqual("test-root");
            expect(htmlElement.children.length).toEqual(4);
            expect(htmlElement.classList.value).toEqual("user-not-input");
            expect(htmlElement.lang).toEqual("false");

            const titleElement = htmlElement.children.namedItem("title");
            expect(titleElement).toBeDefined();
            expect((titleElement as HTMLElement)?.innerText).toEqual("Title");

            const subTitleElement = htmlElement.children.namedItem("sub-title");
            expect(subTitleElement).toBeDefined();
            expect((subTitleElement as HTMLElement)?.innerHTML).toEqual("<h1>Sub Title</h1>");

            const subTitleElement2 = htmlElement.children.namedItem("sub-title-2");
            expect(subTitleElement2).toBeDefined();
            expect((subTitleElement2 as HTMLElement)?.outerText).toEqual("<h1>Sub Title - 2</h1>");

            const contentElement = htmlElement.children.namedItem("content");
            expect(contentElement).toBeDefined();

            const yesButtonElement = contentElement?.children.namedItem("yes-button");
            expect(yesButtonElement).toBeDefined();
            expect((yesButtonElement as HTMLButtonElement)?.style.width).toEqual("100px");
            expect((yesButtonElement as HTMLButtonElement)?.style.height).toEqual("50px");
            expect((yesButtonElement as HTMLButtonElement)?.name).toEqual("yes");
            expect((yesButtonElement as HTMLButtonElement)?.type).toEqual("submit");
        });
    });
});
