# 一、KubeJS的使用



在安装与其对应版本的KubeJS 启动游戏后，可在.minecraft文件夹下找到kubejs文件夹

```wiki
kubejs
├─assets
│  └─kubejs
│      └─textures
│          ├─block
│          └─item
├─client_scripts
├─config
├─data
├─exported
│  └─tags
├─server_scripts
└─startup_scripts

```

`assets` 文件夹和资源包的功能相同，你可以在这里的对应目录下放自定义方块、物品的纹理、模型等，也可以当做一个全局资源包加载器

`config` 文件夹中包括对KubeJS的一些配置选项

`data` 文件夹和数据包功能基本相同，类似于全局数据包加载器

`exported` 文件夹包含游戏内通过指令导出的部分数据，如数据包等

`client_scripts` 文件夹为客户端资源被加载时加载脚本（可使用 `F3` + `T` 游戏重载）

`server_scripts` 中为服务端资源被加载时加载的脚本（可使用游戏命令 `/reload` 游戏重载）

`startup_scripts` 中为启动时就被加载的脚本（可使用游戏内命令 `/kubejs reload startup_scripts` 游戏重载）