# megalo-api-types

[@megalo/api](https://github.com/megalojs/megalo-api#readme)项目的描述文件支持

目前文档中的所有API都已覆盖（不保证有漏网的，也有可能部分api参数的可选属性变成了必填属性，可以提在[issues](https://github.com/hiNISAL/megalo-api-types/issues)中，第一时间修改）

第一期工程会忽略大部分返回值，只提供`Megalo`暴露的方法以及参数。

微信小程序相关的描述可以使用`@types/weixin-api`或者`wechat-mp-types`。

目前对应的官方版本：`0.5.7`

## 安装

``` shell
npm i megalo-api-types -D
```

## 使用

``` json
// tsconfig.json

{
  "compilerOptions": {
    "types": ["megalo-api-types"]
  }
}
```

## 日志

## 20190910

- 增加`Megalo.getMenuButtonBoundingClientRect`
- 同步官方版本

## 20190621

- 好像官方还是什么都没干，看commit说修了bug，但其实好像就改了内部文件夹的名字。那就跟着官方一起发个版吧。

## 20190523

- 还是什么都没改，看到官方修了几个bug，一起发个版

## 20190522

- 没什么改动，只是看官方修了几个bug，我也跟着一起发个版

## 20190417

- 修改`ENV_TYPE`中的`tt`为`TOUTIAO`
- h5支持`setNavigationBarTitle`方法

## 20190328

- 修复`Megalo.downloadFile`方法描述

## 20190223

- 同步官方文档
- 增加`Megalo.CancelToken`

## 20190222

- `getSystemInfoSync` 返回值增加
