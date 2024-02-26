# 天宇外壳 环境配置参数

## Tianyu Shell Environment Configure

### Core

1. TIANYU_SHELL_CORE_VERSION

   - 用于指定给予 Tianyu Shell 所开发的应用程序的版本信息。
   - 类型：String

2. TIANYU_SHELL_CORE_ENVIRONMENT

   - 用于指定当前 Tianyu Shell 所开发的应用程序的运行环境。
   - 类型：production ｜ development

3. TIANYU_SHELL_CORE_PLUGIN_GLOBALIZE

   - 用于指定当前 Tianyu Shell 应用程序中，是否需要将核心数据作为 global 对象处存在浏览器 window 对象中。
   - 类型：boolean

4. TIANYU_SHELL_CORE_RUNTIME_CONSOLE

   - 用于指定当前 Shell 应用程序是否需要打印控制台信息。
   - 类型：boolean

5. TIANYU_SHELL_CORE_UI_THEME_URL

   - 用于指定获取 UI 主题信息的 URL 链接。
   - 类型：String

6. TIANYU_SHELL_CORE_UI_DEFAULT_THEME

   - 用于指定 Tianyu Shell 的默认 UI 主题。
   - 类型：String

7. TIANYU_SHELL_CORE_UI_DEFAULT_COLOR

   - 用于指定 Tianyu Shell 的默认颜色集。
   - 类型：dark ｜ light

### Language

1. TIANYU_SHELL_LANGUAGE_CONFIG_URL

   - 用于指定 Tianyu Shell 用于获取语言信息的远程链接地址
   - 类型：String

### Runtime

1. TIANYU_SHELL_GLOBAL_CACHE

   - 用于指定当前 Tianyu Shell 是否要启用全局的缓存。
   - 类型：boolean

2. TIANYU_SHELL_STORAGE_SUPPORT

   - 用于指定当前 Tianyu Shell 是否要启用全局的 store。
   - 类型：boolean

3. TIANYU_SHELL_ROUTER_SUPPORT

   - 用于指定当前 Tianyu Shell 是否启用 Router 功能
   - 类型：boolean

### User Interface

1. TIANYU_SHELL_UI_CORE

   - 用于指定 Tianyu Shell 是否支持 Tianyu Shell UI 的核心功能（核心功能决定 Tianyu Shell UI 的所有组件是否可用，所有组件都会检查核心功能的状态）。
   - 类型：boolean
