# 1.3 自定义机器

### 自定义机器

**SingleBlock_Registry.js**

```js
// 注册机器配方类型
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {//注册一个新的多方块
  event.create('small_greenhouses')//设置机器的名字
    .category('smallgreenhouses')//设置类型
    .setEUIO('in') //设置机器的能源输入/输出
    .setMaxIOSize(1, 1, 1, 0)//设置机器输入输出个数(物品输入,物品输出,流体输入,流体输出)
    .setSlotOverlay(false, false, GuiTextures.SOLIDIFIER_OVERLAY)//设置机器的背面带有覆盖版
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)//设置机器运行时处理中的样子
    .setSound(GTSoundEntries.BATH)//设置机器运行时工作的声音
})   }）

// 注册机器方块
GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('small_greenhouses', 'simple', GTValues.IV)//名字和配方类型相同、单方块、机器电压
        .recipeType('small_greenhouses', true, true)//显示的配方类型名字
        .workableTieredHullRenderer('gtceu:block/machines/smallgreenhouses')//设置机器材质
})   }）
```

**recipes.js**

```js
const [ULV, LV, MV, HV, EV, IV, LuV, ZPM, UV, UHV, UEV, UIV, UXV, OpV, MAX] = GTValues.VA
event.recipes.gtceu.small_greenhouses("rubber_sapling")//配方ID
     .itemInputs('gtceu:rubber_sapling')//物品输入
     .inputFluids(Fluid.of('minecraft:water', 1000))//流体输入
     .itemOutputs("32x gtceu:rubber_log")//物品输出
     .duration(90)//持续时间
     .EUt(IV)//电压
```

**en_us.json**

```json
{
    "gtceu.small_greenhouses": "Small Greenhouses",
    "block.gtceu.iv_small_greenhouses": "Small Greenhouses"
}
```

**zh_cn.json**

```json
{
    "gtceu.small_greenhouses": "小型温室",
    "block.gtceu.iv_small_greenhouses": "小型温室"
}
```

![image-20240303192101734](image/image-20240303192101734.png)

![image-20240303194652425](image/image-20240303194652425.png)!(图像- 

> 在给单方块机器添加材质时材质要放在\kubejs\assets\gtceu\textures\block\machines里

![image-20240304020358188](image/image-20240304020358188.png)

![image-20240304020508372](image/image-20240304020508372.png)!(图像- 

**overlay_front_active.png.mcmeta**

```json
//默认运行方向从下到上
{
  "animation": {   
  	"frametime": 3   
}
//多种状态可以指定运行的方向    
}
 "animation": {   
    "frametime": 16,   
    "frames": [   
      0,
      1,  
      2
    ]
  }
```

材质可以打开此模组.jar文件assets\gtceu\textures\block\machines查看（或者自行绘画）

### 自定义多方块机器

**Multiblock_Registry.js**

```js
// 注册机器配方类型
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {//注册一个新的多方块
  event.create('greenhouse')//设置机器的名字
    .category('greenhouse')//设置类型
    .setEUIO('in') //设置机器的能源输入/输出
    .setMaxIOSize(4, 4, 1, 0)//设置机器输入输出个数(物品输入,物品输出,流体输入,流体输出)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)//设置机器运行时处理中的样子
    .setSound(GTSoundEntries.BATH)//设置机器运行时工作的声音
    .setMaxTooltips(5)//设置最大信息提示
})
// 注册机器方块
GTCEuStartupEvents.registry('gtceu:machine', event => {
  event.create('greenhouse', 'multiblock')//名字和配方类型相同、多方快
    .rotationState(RotationState.NON_Y_AXIS)//设置多方快为不围绕Y轴旋转
    .recipeType('greenhouse')//现在的配方类型名字
    .appearanceBlock(GCyMBlocks.CASING_ATOMIC)//设置成型后外壁的材质
    .pattern(definition => FactoryBlockPattern.start()//多方块的摆放
      .aisle('CCC', 'CGC', 'CGC', 'CLC', 'CCC')
      .aisle('CMC', 'GSG', 'G#G', 'LIL', 'COC')
      .aisle('CKC', 'CGC', 'CGC', 'CLC', 'CNC')
      .where('K', Predicates.controller(Predicates.blocks(definition.get())))//给每个字符指定所需方块（此行为机器控制器）
      .where('M', Predicates.blocks('moss_block')
        .or(Predicates.blocks('dirt'))
        .or(Predicates.blocks('grass_block'))
      )//可以定义多种方块
      .where('G', Predicates.blocks('ae2:quartz_glass'))
      .where('S', Predicates.blocks('oak_sapling')
        .or(Predicates.blocks('dark_oak_sapling'))
        .or(Predicates.blocks('spruce_sapling'))
        .or(Predicates.blocks('birch_sapling'))
        .or(Predicates.blocks('jungle_sapling'))
        .or(Predicates.blocks('acacia_sapling'))
        .or(Predicates.blocks('azalea'))
        .or(Predicates.blocks('flowering_azalea'))
        .or(Predicates.blocks('mangrove_propagule'))
        .or(Predicates.blocks('gtceu:rubber_sapling'))
      )
      .where('I', Predicates.blocks('glowstone'))
      .where('L', Predicates.blocks(GTBlocks.CASING_GRATE.get()))//装配线格栅
      .where('C', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())//外壳
        .or(Predicates.autoAbilities(definition.getRecipeTypes()))//或者输入输出接口
      )
      .where('O', Predicates.abilities(PartAbility.MUFFLER)//消声器
        .setExactLimit(1)//限制数量
      )
      .where('N', Predicates.abilities(PartAbility.MAINTENANCE))//维护仓
      .where('#', Predicates.air())//空气
      .build()
).workableCasingRenderer('gtceu:block/casings/gcym/atomic_casing'
                         ,'gtceu:block/multiblock/implosion_compressor'
                         , false)//控制器材质，控制器正面样式
})   }）
```

![image-20240305124232425](image/image-20240305124232425.png)

**recipes.js**

```js  
 function Greenhouse(id, input, eu, fluid, output) {
        event.recipes.gtceu.greenhouse(id)//配方id
            .circuit(1)//设置编程电路
            .itemInputs(input)//物品输入
            .inputFluids(Fluid.of('minecraft:water', fluid))//流体输入
            .itemOutputs(output)//物品输出
            .duration(90)//持续时间
            .EUt(eu)//电压
            .dimension("minecraft:overworld")//指定维度处理
            .biome('minecraft:planis')//指定群系处理
      		.chancedOutput('gtceu:rubber_sapling',50,1)//概率输出物品
            .chancedFluidOutput('gtceu:rubber',5,2)//概率输出流体
            .cleanroom(CleanroomType.CLEANROOM)//是否需要纯净仓
    }	
    //橡胶树
    Greenhouse('rubber_sapling','gtceu:rubber_sapling',MV,1000,
               ['32x gtceu:rubber_log',
                '8x gtceu:sticky_resin',
                '4x gtceu:rubber_sapling'
               ])
    
```

![image-20240305180758409](image/image-20240305180758409.png)

#### gtceu:recipe_type

| 方法                                                | 属性                                   |
| --------------------------------------------------- | -------------------------------------- |
| .setEUIO(string)                                    | in（消耗电的机器）、out（发电的机器）  |
| .setMaxIOSize(number,number,number,number)          | 物品输入，物品输出，流体输入，流体输出 |
| .setProgressBar(GuiTextures.xxx ,FillDirection.xxx) | (处理中的图标,处理中图标的方向)        |
| .setSound(GTSoundEntries.xxx)                       | 机器运行时的声音                       |
| .setMaxTooltips(number)                             | 配方中显示信息最大行数                 |

#### GuiTextures

| 图片                                                         | 值                               |
| ------------------------------------------------------------ | -------------------------------- |
| ![progress_bar_boiler_fuel_steel](image/gtceu/progress_bar_boiler_fuel_steel.png) | 不写setProgressBar默认的图标     |
| ![progress_bar_arrow](image/gtceu/progress_bar_arrow.png)    | PROGRESS_BAR_ARROW               |
| ![progress_bar_crystallization](image/gtceu/progress_bar_crystallization.png) | PROGRESS_BAR_CRYSTALLIZATION     |
| ![progress_bar_arrow_multiple](image/gtceu/progress_bar_arrow_multiple.png) | PROGRESS_BAR_ARROW_MULTIPLE      |
| ![progress_bar_arc_furnace](image/gtceu/progress_bar_arc_furnace.png) | PROGRESS_BAR_ARC_FURNACE         |
| ![progress_bar_assembly_line_arrow](image/gtceu/progress_bar_assembly_line_arrow.png) | PROGRESS_BAR_ASSEMBLY_LINE_ARROW |
| ![progress_bar_bath](image/gtceu/progress_bar_bath.png)      | PROGRESS_BAR_BATH                |
| ![progress_bar_bending](image/gtceu/progress_bar_bending.png) | PROGRESS_BAR_BENDING             |
| ![progress_bar_canner](image/gtceu/progress_bar_canner.png)  | PROGRESS_BAR_CANNER              |
| ![progress_bar_circuit](image/gtceu/progress_bar_circuit.png) | PROGRESS_BAR_CIRCUIT             |
| ![progress_bar_circuit_assembler](image/gtceu/progress_bar_circuit_assembler.png) | PROGRESS_BAR_CIRCUIT_ASSEMBLER   |
| ![progress_bar_coke_oven](image/gtceu/progress_bar_coke_oven.png) | PROGRESS_BAR_COKE_OVEN           |
| ![progress_bar_compress](image/gtceu/progress_bar_compress.png) | PROGRESS_BAR_COMPRESS            |
| ![progress_bar_cracking](image/gtceu/progress_bar_cracking.png) | PROGRESS_BAR_CRACKING            |
| ![progress_bar_extract](image/gtceu/progress_bar_extract.png) | PROGRESS_BAR_EXTRACT             |
| ![progress_bar_extruder](image/gtceu/progress_bar_extruder.png) | PROGRESS_BAR_EXTRUDER            |
| ![progress_bar_fusion](image/gtceu/progress_bar_fusion.png)  | PROGRESS_BAR_FUSION              |
| ![progress_bar_gas_collector](image/gtceu/progress_bar_gas_collector.png) | PROGRESS_BAR_GAS_COLLECTOR       |
| ![progress_bar_hammer](image/gtceu/progress_bar_hammer.png)  | PROGRESS_BAR_HAMMER              |
| ![progress_bar_lathe](image/gtceu/progress_bar_lathe.png)    | PROGRESS_BAR_LATHE               |
| ![progress_bar_macerate](image/gtceu/progress_bar_macerate.png) | PROGRESS_BAR_MACERATE            |
| ![progress_bar_magnet](image/gtceu/progress_bar_magnet.png)  | PROGRESS_BAR_MAGNET              |
| ![progress_bar_mass_fab](image/gtceu/progress_bar_mass_fab.png) | PROGRESS_BAR_MASS_FAB            |
| ![progress_bar_mixer](image/gtceu/progress_bar_mixer.png)    | PROGRESS_BAR_MIXER               |
| ![progress_bar_packer](image/gtceu/progress_bar_packer.png)  | PROGRESS_BAR_PACKER              |
| ![progress_bar_recycler](image/gtceu/progress_bar_recycler.png) | PROGRESS_BAR_RECYCLER            |
| ![progress_bar_sift](image/gtceu/progress_bar_sift.png)      | PROGRESS_BAR_SIFT                |
| ![progress_bar_slice](image/gtceu/progress_bar_slice.png)    | PROGRESS_BAR_SLICE               |
| ![progress_bar_unpacker](image/gtceu/progress_bar_unpacker.png) | PROGRESS_BAR_UNPACKER            |
| ![progress_bar_wiremill](image/gtceu/progress_bar_wiremill.png) | PROGRESS_BAR_WIREMILL            |

#### FillDirection

| 图片                                            | 值            |
| ----------------------------------------------- | ------------- |
| ![LEFT_TO_RIGHT](image/gtceu/LEFT_TO_RIGHT.gif) | LEFT_TO_RIGHT |
| ![RIGHT_TO_LEFT](image/gtceu/RIGHT_TO_LEFT.gif) | RIGHT_TO_LEFT |
| ![DOWN_TO_UP](image/gtceu/DOWN_TO_UP.gif)       | DOWN_TO_UP    |
| ![UP_TO_DOWN](image/gtceu/UP_TO_DOWN.gif)       | UP_TO_DOWN    |

> 燃烧的处理效果不能使用UP_TO_DOWN会报错

#### gtceu:machine

| 方法                                           | 属性                                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| .create(string, string, ang[])                 | 机器名称，类型（simple单方块、multiblock多方快），[电压（可以写一个或者多个，按照电压生成机器的个数只在simple类型生效）] |
| .appearanceBlock(GTBlocks.xxx)                 | 外壳材质                                                     |
| .Predicates.blocks(blocks)                     | 指定方块                                                     |
| .workableCasingRenderer(string,string,boolean) | 控制器材质，控制器正面材质                                   |

> 在.appearanceBlock()和.Predicates.blocks()中可选择（GTBlocks类或GCyMBlocks类中外壳材质）
>
> 在.workableCasingRenderer中设置控制器外壳的材质可以自定义材质也可以使用GTM自带的材质，在使用自定义的材质时要使用kubejs定义方块材质的位置

**GTBlocks & GCyMBlocks & workableCasingRenderer控制器材质**

| 图片                                                         | GTBlocks                             | GCyMBlocks                                  | workableCasingRenderer                                       |
| ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ |
| ![machine_primitive_bricks](image/gtceu/solid/machine_primitive_bricks.png) | GTBlocks.CASING_PRIMITIVE_BRICKS     | /                                           | gtceu:block/casings/solid/machine_primitive_bricks           |
| ![machine_coke_bricks](image/gtceu/solid/machine_coke_bricks.png) | GTBlocks.CASING_COKE_BRICKS          | /                                           | gtceu:block/casings/solid/machine_coke_bricks                |
| ![machine_casing_bronze_plated_bricks](image/gtceu/solid/machine_casing_bronze_plated_bricks.png) | GTBlocks.CASING_BRONZE_BRICKS        | /                                           | gtceu:block/casings/solid/machine_casing_bronze_plated_bricks |
| ![machine_casing_clean_stainless_steel](image/gtceu/solid/machine_casing_clean_stainless_steel.png) | GTBlocks.CASING_STAINLESS_CLEAN      | /                                           | gtceu:block/casings/solid/machine_casing_clean_stainless_steel |
| ![machine_casing_frost_proof](image/gtceu/solid/machine_casing_frost_proof.png) | GTBlocks.CASING_ALUMINIUM_FROSTPROOF | /                                           | gtceu:block/casings/solid/machine_casing_frost_proof         |
| ![machine_casing_heatproof](image/gtceu/solid/machine_casing_heatproof.png) | GTBlocks.CASING_INVAR_HEATPROOF      | /                                           | gtceu:block/casings/solid/machine_casing_heatproof           |
| ![machine_casing_inert_ptfe](image/gtceu/solid/machine_casing_inert_ptfe.png) | GTBlocks.CASING_PTFE_INERT           | /                                           | gtceu:block/casings/solid/machine_casing_inert_ptfe          |
| ![machine_casing_palladium_substation](image/gtceu/solid/machine_casing_palladium_substation.png) | GTBlocks.CASING_PALLADIUM_SUBSTATION | /                                           | gtceu:block/casings/solid/machine_casing_palladium_substation |
| ![machine_casing_robust_tungstensteel](image/gtceu/solid/machine_casing_robust_tungstensteel.png) | GTBlocks.CASING_TUNGSTENSTEEL_ROBUST | /                                           | gtceu:block/casings/solid/machine_casing_robust_tungstensteel |
| ![machine_casing_solid_steel](image/gtceu/solid/machine_casing_solid_steel.png) | GTBlocks.CASING_STEEL_SOLID          | /                                           | gtceu:block/casings/solid/machine_casing_solid_steel         |
| ![machine_casing_stable_titanium](image/gtceu/solid/machine_casing_stable_titanium.png) | GTBlocks.CASING_TITANIUM_STABLE      | /                                           | gtceu:block/casings/solid/machine_casing_stable_titanium     |
| ![machine_casing_sturdy_hsse](image/gtceu/solid/machine_casing_sturdy_hsse.png) | GTBlocks.CASING_HSSE_STURDY          | /                                           | gtceu:block/casings/solid/machine_casing_sturdy_hsse         |
| ![atomic_casing](image/gtceu/gcym/atomic_casing.png)         | /                                    | GCyMBlocks.CASING_ATOMIC                    | gtceu:block/casings/gcym/atomic_casing                       |
| ![corrosion_proof_casing](image/gtceu/gcym/corrosion_proof_casing.png) | /                                    | GCyMBlocks.CASING_CORROSION_PROOF           | gtceu:block/casings/gcym/corrosion_proof_casing              |
| ![high_temperature_smelting_casing](image/gtceu/gcym/high_temperature_smelting_casing.png) | /                                    | GCyMBlocks.CASING_HIGH_TEMPERATURE_SMELTING | gtceu:block/casings/gcym/high_temperature_smelting_casing    |
| ![industrial_steam_casing](image/gtceu/gcym/industrial_steam_casing.png) | /                                    | GCyMBlocks.CASING_INDUSTRIAL_STEAM          | gtceu:block/casings/gcym/industrial_steam_casing             |
| ![large_scale_assembling_casing](image/gtceu/gcym/large_scale_assembling_casing.png) | /                                    | GCyMBlocks.CASING_LARGE_SCALE_ASSEMBLING    | gtceu:block/casings/gcym/large_scale_assembling_casing       |
| ![laser_safe_engraving_casing](image/gtceu/gcym/laser_safe_engraving_casing.png) | /                                    | GCyMBlocks.CASING_LASER_SAFE_ENGRAVING      | gtceu:block/casings/gcym/laser_safe_engraving_casing         |
| ![nonconducting_casing](image/gtceu/gcym/nonconducting_casing.png) | /                                    | GCyMBlocks.CASING_NONCONDUCTING             | gtceu:block/casings/gcym/nonconducting_casing                |
| ![reaction_safe_mixing_casing](image/gtceu/gcym/reaction_safe_mixing_casing.png) | /                                    | GCyMBlocks.CASING_REACTION_SAFE             | gtceu:block/casings/gcym/reaction_safe_mixing_casing         |
| ![secure_maceration_casing](image/gtceu/gcym/secure_maceration_casing.png) | /                                    | GCyMBlocks.CASING_SECURE_MACERATION         | gtceu:block/casings/gcym/secure_maceration_casing            |
| ![shock_proof_cutting_casing](image/gtceu/gcym/shock_proof_cutting_casing.png) | /                                    | GCyMBlocks.CASING_SHOCK_PROOF               | gtceu:block/casings/gcym/shock_proof_cutting_casing          |
| ![stress_proof_casing](image/gtceu/gcym/stress_proof_casing.png) | /                                    | GCyMBlocks.CASING_STRESS_PROOF              | gtceu:block/casings/gcym/stress_proof_casing                 |
| ![vibration_safe_casing](image/gtceu/gcym/vibration_safe_casing.png) | /                                    | GCyMBlocks.CASING_VIBRATION_SAFE            | gtceu:block/casings/gcym/vibration_safe_casing               |
| ![watertight_casing](image/gtceu/gcym/watertight_casing.png) | /                                    | GCyMBlocks.CASING_WATERTIGHT                | gtceu:block/casings/gcym/watertight_casing                   |

**workableCasingRenderer控制器正面材质**

| 图片                                                         | workableCasingRenderer                         |
| ------------------------------------------------------------ | ---------------------------------------------- |
| ![overlay_front](image/gtceu/multiblock/overlay_front.png)   | gtceu:block/multiblock/coke_oven               |
| ![overlay_front_active](image/gtceu/multiblock/overlay_front_active.png) | gtceu:block/multiblock/data_bank               |
| ![overlay_front](image/gtceu/multiblock/overlay_front1.png)  | gtceu:block/multiblock/electric_blast_furnace  |
| ![overlay_front](image/gtceu/multiblock/overlay_front2.png)  | gtceu:block/multiblock/primitive_blast_furnace |
| ![overlay_front](image/gtceu/multiblock/overlay_front3.png)  | gtceu:block/multiblock/steam_grinder           |
| ![overlay_front](image/gtceu/multiblock/overlay_front4.png)  | gtceu:block/multiblock/steam_oven              |
| ![overlay_front](image/gtceu/multiblock/overlay_front5.png)  | gtceu:block/multiblock/implosion_compressor    |

> 看上哪个直接复制就好

#### recipes

| 方法                                              | 内容                                                      |
| ------------------------------------------------- | --------------------------------------------------------- |
| .circuit(number)                                  | 编程电路（0-32）                                          |
| .itemInputs(inputs)                               | 多物品输入                                                |
| .inputFluids(inputs)                              | 多流体输入                                                |
| .itemOutputs(outputs)                             | 多物品输出                                                |
| .outputFluids(outputs)                            | 多流体输出                                                |
| .chancedOutput(stack,chance,tierchanceboost)      | 物品概率输出(输出的物品，概率，升压提高的概率)            |
| .chancedFluidOutput(stack,chance,tierchanceboost) | 流体概率输出(输出流体，概率，升压提高的概率)              |
| .cleanroom(CleanroomType)                         | 纯净车间(CLEANROOM纯净车间,STERILE_CLEANROOM无菌纯净车间) |
| .duration(number)                                 | 持续时间                                                  |
| .EUt(number)                                      | 电压(正电压耗电，负电压产电)                              |
| .dimension(dimension)                             | 维度                                                      |
| .biome(biome)                                     | 群系                                                      |

**GTSoundEntries**

| 名字         | 音效 | GTSoundEntries              |
| ------------ | ---- | --------------------------- |
| CHEMICAL     | 化学 | GTSoundEntries.CHEMICAL     |
| FIRE         | 火焰 | GTSoundEntries.FIRE         |
| REPLICATOR   | 复制 | GTSoundEntries.REPLICATOR   |
| MOTOR        | 马达 | GTSoundEntries.MOTOR        |
| TURBINE      | 涡轮 | GTSoundEntries.TURBINE      |
| CUT          | 切割 | GTSoundEntries.CUT          |
| MINER        | 矿机 | GTSoundEntries.MINER        |
| BOILER       | 锅炉 | GTSoundEntries.BOILER       |
| ASSEMBLER    | 组装 | GTSoundEntries.ASSEMBLER    |
| FURNACE      | 火炉 | GTSoundEntries.FURNACE      |
| COOLING      | 冷却 | GTSoundEntries.COOLING      |
| BATH         | 浸洗 | GTSoundEntries.BATH         |
| COMBUSTION   | 燃烧 | GTSoundEntries.COMBUSTION   |
| MACERATOR    | 研磨 | GTSoundEntries.MACERATOR    |
| COMPRESSOR   | 压缩 | GTSoundEntries.COMPRESSOR   |
| CENTRIFUGE   | 离心 | GTSoundEntries.CENTRIFUGE   |
| MIXER        | 混合 | GTSoundEntries.MIXER        |
| ELECTROLYZER | 电解 | GTSoundEntries.ELECTROLYZER |
| ARC          | 电弧 | GTSoundEntries.ARC          |

### 示例（应力物品发电机

**energyoutput_recipe_type.js**

``` js
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
  event.create('energyoutput')
    .category('energyoutput')
    .setEUIO('out')
    .setMaxIOSize(1, 0, 0, 0)
    .setProgressBar(GuiTextures.PROGRESS_BAR_HAMMER, FillDirection.UP_TO_DOWN)
    .setSound(GTSoundEntries.ARC)
    .setMaxTooltips(6)
})
````

**energyoutput_multiblock.js**

```js
GTCEuStartupEvents.registry('gtceu:machine', event => {
  event.create('energyoutput', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeType('energyoutput')
    .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
    .pattern(definition => FactoryBlockPattern.start()
      .aisle('CCC', 'CGC', 'CCI')
      .aisle('CCC', 'GSG', 'COC')
      .aisle('CKC', 'CGC', 'CNC')
      .where('K', Predicates.controller(Predicates.blocks(definition.get())))
      .where('G', Predicates.blocks('ae2:quartz_glass'))
      .where('S', Predicates.blocks('immersiveengineering:generator'))
      .where('C', Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
        .or(Predicates.autoAbilities(definition.getRecipeTypes()))
      )
      .where('I',Predicates.abilities(PartAbility.INPUT_KINETIC)
      .setExactLimit(1))
      .where('O', Predicates.abilities(PartAbility.MUFFLER)
        .setExactLimit(1)
      )
      .where('N', Predicates.abilities(PartAbility.MAINTENANCE))
      .build()
    )
    .workableCasingRenderer('gtceu:block/casings/solid/machine_casing_solid_steel'
                            ,'gtceu:block/multiblock/implosion_compressor'
                            , false)
})
```

**en_us.json**

```
{
    "block.gtceu.energyoutput": "EnergyOutput",
    "gtceu.energyoutput": "EnergyOutput"
}
```

**energyoutput_recipes.js**

```js
 event.recipes.gtceu.energyoutput('energy')
     .inputStress(256)
     .rpm(32)
     .itemInputs('minecraft:coal_block')
     .EUt(-HV)
     .duration(18000)
```

![image-20240305195918469](image/image-20240305195918469.png)

![image-20240305195945762](image/image-20240305195945762.png)
