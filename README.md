# megalo-api-types

[@megalo/api](https://github.com/megalojs/megalo-api#readme)项目的描述文件支持

**仅实现了部分，目前正在更新当中，进度65%**

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
