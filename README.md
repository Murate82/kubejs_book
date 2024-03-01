# KubeJs 6 使用教程

## 一、格雷

### 自定义多方快机器

```js
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {//注册一个新的多方快控制器
  event.create('greenhouse')//设置机器的名字
    .category('drack')
    .setEUIO('in') //设置机器的能源输入/输出
    .setMaxIOSize(4, 4, 1, 0)//设置机器输入输出个数(物品输入,物品输出,流体输入,流体输出)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)//设置机器运行时处理中的样子
    .setSound(GTSoundEntries.BATH)//设置机器运行时工作的声音
})
```

setProgressBar(GuiTextures.xxx ,FillDirection.xxx)



setSound(GTSoundEntries.xxx)


