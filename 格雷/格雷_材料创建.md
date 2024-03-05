# 1.1 材料创建

## 创建金属锭

```js
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('andesite_alloy')
        .ingot()
        .components('1x andesite', '1x iron')
        .color(0x839689).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, 		       GTMaterialFlags.GENERATE_SMALL_GEAR)
})	
```

## 创建宝石

```js
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('purple_coal')
        .gem(2, 4000) //(等级属性，燃烧tick)
        .element(GTElements.C) 
        .ore() //是否生成矿物 
        .color(0x7D2DDB).iconSet(GTMaterialIconSet.LIGNITE)
})
```

## 创建导线

```js
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('mysterious_dust')
        .dust()
        .cableProperties(GTValues.V[GTValues.LV], 69, 0, true) // 
})
```

## 创建流体

```js
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('mysterious_ooze')
        .fluid()
        .color(0x500bbf)
        .fluidTemp(69420) 
})
```

> 流体如果创建报错删除.fluidTemp(xxx)