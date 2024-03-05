module.exports = {
    // 书籍信息
    title: 'Kubejs 6使用教程(1.20.1+)',
    description: 'Kubejs6的使用',
    author: 'Murate',
    lang: 'zh-cn',

    // 插件列表
    plugins: [
        "-lunr",
        "-search",
        // "search-pro",
        "code",
        "back-to-top-button",
        "expandable-chapters",
        // "prism",
        "-highlight",
        "tbfed-pagefooter",
        "-sharing",
        "search-pro-fixed",
        "auto-scroll-table",
        "lightbox"
    ],

    // 插件全局配置
    pluginsConfig: {
        "prism": {
            "css": [
                "prismjs/themes/prism-coy.css"
            ]
        }, "tbfed-pagefooter": {
            "modify_label": "文章修改时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        }
    },

    // 模板变量
    variables: {
        // 自定义
    },
    "styles": {
        "website": "styles/website.css"
    }
};