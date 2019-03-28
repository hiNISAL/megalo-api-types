# megalo-api-types

[@megalo/api](https://github.com/megalojs/megalo-api#readme)项目的描述文件支持

目前文档中的所有API都已覆盖（不保证有漏网的，也有可能部分api参数的可选属性变成了必填属性，可以提在[issues](https://github.com/hiNISAL/megalo-api-types/issues)中，第一时间修改）

第一期工程会忽略大部分返回值，只提供`Megalo`暴露的方法以及参数。

微信小程序相关的描述可以使用`@types/weixin-api`或者`wechat-mp-types`。

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

## 20190328

- 修复`Megalo.downloadFile`方法描述

## 20190223

- 同步官方文档
- 增加`Megalo.CancelToken`

## 20190222

- `getSystemInfoSync` 返回值增加
