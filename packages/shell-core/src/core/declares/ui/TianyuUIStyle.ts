/**@format */

/** Tianyu Shell Default UI Element Styling definiation */
export type TianyuUIStyleDeclaration = {
    [key in keyof CSSStyleDeclaration]?: string;
};

/** The Map of Tianyu Shell Default UI Element Styling */
export type TianyuUIStyle = Map<string, TianyuUIStyleDeclaration>;
