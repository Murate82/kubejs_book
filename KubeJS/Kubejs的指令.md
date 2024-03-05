# 1、KubeJS的指令

### 游戏内的指令

| 命令                                | 功能                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| `/kubejs custom_command <command>`  | 执行自定义指令                                               |
| `/kubejs errors`                    | 在聊天栏中获取当前脚本的报错                                 |
| `/kubejs hand` 或 `/kjs_hand`       | 快速获取手中物品信息（点击文本即可复制）[示例](https://m1.miaomc.cn/uploads/20221222_63a4360bba36e.png) |
| `/kubejs dump_registry <注册表>`    | 输出指定注册表下的所有内容                                   |
| `/kubejs export`                    | 将游戏内的配方、tags、所有方块、实体类型、流体类型导出到`kubejs\exported\kubejs-server-export.json` |
| `/kubejs export_virtual_data`       | 导出KubeJS添加的虚拟数据包至`kubejs\exported`目录下          |
| `/kubejs generate_typings`          | WIP!                                                         |
| `/kubejs hotbar`                    | 将快捷栏中所有物品信息打印到聊天（同`/kubejs hand`）         |
| `/kubejs offhand`                   | 将玩家副手的物品信息打印到聊天栏（同`/kubejs hand`）         |
| `/kubejs inventory`                 | 将玩家库存中所有物品信息打印到聊天栏（同`/kubejs hand`）     |
| `/kubejs painter <玩家> <对象>`     | 将给定的Painter对象播放给指定玩家                            |
| `/kubejs list_tags <注册表> [标签]` | 将给定标签的内容打印到聊天栏[1]                              |
| `/kubejs reload <类型>`             | 重载指定类型的内容，`<类型>`可以为`client_scripts`（客户端侧脚本）、`server_scripts`（服务器端脚本）、`lang`（语言文件）、`startup_scripts`（启动阶段脚本）[2]、`texture`（纹理）。 |
| `/kubejs stages [add                | list                                                         |
| `/kubejs warnings`                  | 查看当前脚本中的警告信息                                     |
| `/kubejs wiki`                      | 打开官方KubeJS Wiki                                          |
| `/reload`                           | 热重载脚本                                                   |

>/reload 如果没用就重启游戏吧