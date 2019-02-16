declare namespace Megalo {
  interface BaseOptions {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行 */
    complete?(), 
  }

  /**
   * 发起网络请求，支持 Promise 化使用。不支持H5环境。
   */
  function request(options: {
    /** 开发者服务器接口地址 url */
    path: string,
    /** 请求的参数 */
    data?: object|string|any[],
    /** 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json */
    header?: object,
    /** （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
    method?: string,
    /** 返回的数据格式 */
    dataType?: string,
    /** 响应的数据类型（支付宝不支持）*/
    responseType?: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行 */
    complete?(),
  }): Promise<any>;
  

  /**
   * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。不支持H5环境
   */
  function uploadFile(options: {
    /** 开发者服务器地址 */
    url: string,
    /** 要上传文件资源的路径 */
    filePath: string,
    /** 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容 */
    name: string,
    /** HTTP 请求 Header，Header 中不能设置 Referer */
    header?: object,
    /** HTTP 请求中其他额外的 form data */
    formData?: object,
    /** 接口调用成功的回调函数 */
    success?(res: { data: string, statusCode: number }),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /**
   * 下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。不支持H5环境
   */
  function uploadFile(options: {
    /** 开发者服务器地址 */
    url: string,
    /** 要上传文件资源的路径 */
    filePath: string,
    /** HTTP 请求 Header，Header 中不能设置 Referer */
    header?: object,
    /** HTTP 请求中其他额外的 form data */
    formData?: object,
    /** 接口调用成功的回调函数 */
    success?(res: { tempFilePath: string, statusCode: number }),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  interface SocketTask {
    /** 通过 WebSocket 连接发送数据 */
    send?(object: {
      /** 需要发送的内容 */
      data: string|ArrayBuffer,
      /** 接口调用成功的回调函数 */
      success?(data?),
      /** 接口调用失败的回调函数 */
      fail?(err?),
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?(),
    }),

    /** 关闭 WebSocket 连接 */
    close?(object: {
      /** 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。默认1000（表示正常关闭连接） */
      code?: number,
      /** 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 123 字节的 UTF-8 文本（不是字符）。 */
      reason?: string,
      /** 接口调用成功的回调函数 */
      success?(data?),
      /** 接口调用失败的回调函数 */
      fail?(err?),
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?(),
    }),

    /** 监听 WebSocket 连接打开事件 */
    onOpen?(callback?: () => any),

    /** 监听 WebSocket 连接关闭事件 */
    onClose?(callback?: () => any),

    /** 监听 WebSocket 错误事件 */
    onError?(callback?: (errMsg: string) => {}),

    /** 监听 WebSocket 接受到服务器的消息事件 */
    onMessage?(callback?: (data: string|ArrayBuffer) => {})
  }

  /**
   * 创建一个 WebSocket 链接。
   * 支持存在最多两个 WebSocket 链接，每次成功调用 Megalo.connectSocket 会返回一个新的 SocketTask。
   * 不支持H5环境
   */
  function connectSocket(options: {
    /** 开发者服务器接口地址，必须是 wss 协议 */
    url: string,
    /** HTTP Header , header 中不能设置 Referer */
    header?: object,
    /** 默认是 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
    method: string,
    /** 子协议数组 */
    protocols: string[],
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<SocketTask>;


  /** 从本地相册选择图片或使用相机拍照。不支持H5环境 */
  function chooseImage(options: {
    /** 最多可以选择的图片张数 默认值9张 */
    count?: number,
    /** 所选的图片的尺寸 */
    sizeType?: 'original'|'compressed',
    /** 选择图片的来源 */
    sourceType?: 'album' | 'camera'[],
    /** 接口调用成功的回调函数 */
    success?(object: {
      res: {
        /** 图片的本地临时文件路径列表 */
        tempFilePaths: {}[],
        /** 图片的本地临时文件列表 */
        tempFiles: { path: string, size: number }[],
      }
    }),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>

  
  /** 压缩图片接口，可选压缩质量。不支持百度、头条、H5环境 */
  function compressImage(options: {
    /** 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径 */
    src: string,
    /** 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）。默认值80 */
    quality?: number,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。不支持H5环境 */
  function previewImage(options: {
    /** 需要预览的图片链接列表。 */
    urls: string[],
    /** 当前显示图片的链接 */
    current?: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 获取图片信息。网络图片需先配置download域名才能生效。不支持H5和头条环境 */
  function getImageInfo(options: {
    /** 图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径 */
    src: string,
    /** 接口调用成功的回调函数 */
    success?(res: {
      /** 图片原始宽度，单位px。不考虑旋转 */
      width: number,
      /** 图片原始高度，单位px。不考虑旋转 */
      height: number,
      /** 图片的本地路径 */
      path: string,
      /** 拍照时设备方向 */
      orientation: string,
      /** 图片格式 */
      type: string,
    }),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;

  /** 保存图片到系统相册。不支持H5平台 */
  function saveImageToPhotosAlbum(res: {
    /** 图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径 */
    filePath,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;

  /** 创建 live-player 上下文 LivePlayerContext 对象。不支持支付宝、头条、H5环境 */
  function createLivePlayerContext(liveId: any, scope?: any);

  /** 获取全局唯一的录音管理器 RecorderManager。不支持支付宝、H5环境。 */
  function getRecorderManager();

  /** 获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态。不支持支付宝、头条、H5环境 */
  function getBackgroundAudioManager();

  /** 创建内部 audio 上下文 InnerAudioContext 对象。不支持支付宝、H5平台 */
  function createInnerAudioContext();

  /** 拍摄视频或从手机相册中选视频。不支持支付宝、H5平台 */
  function chooseVideo(options: {
    /** album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera'] */
    sourceType?: "album" | "camera"[];
    /** 是否压缩所选的视频源文件，默认值为true，需要压缩 */
    compressed?: boolean;
    /** 拍摄视频最长拍摄时间，单位秒。最长支持60秒 */
    maxDuration?: number;
    /** 前置或者后置摄像头，默认为前后都有，即：['front', 'back'] */
    camera?: "front" | "back";
    /** 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明 */
    success?(res: {
      /** 选定视频的临时文件路径 */
      tempFilePath: string;
      /** 选定视频的时间长度 */
      duration: number;
      /** 选定视频的数据量大小 */
      size: number;
      /** 返回选定视频的长 */
      height: number;
      /** 返回选定视频的宽 */
      width: number;
    }): void;
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 保存视频到系统相册。不支持支付宝、H5平台 */
  function saveVideoToPhotosAlbum(object: {
    /** 视频文件路径，可以是临时文件路径也可以是永久文件路径 */
    filePath: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;

  /** 创建 video 上下文 VideoContext 对象。不支持支付宝、头条、H5环境 */
  function createVideoContext(videoId: any, scope: any);

  /** 创建 camera 上下文 CameraContext 对象。不支持支付宝、头条、H5环境 */
  function createCameraContext();

  /** 保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用，不支持H5平台 */
  function saveFile(options: {
    /** 需要保存的文件的临时路径 */
		tempFilePath: string;
		/** 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'} */
		success?(res: {
      /** 文件的保存路径 */
		  savedFilePath: string;
    }): void;
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 获取文件信息，不支持头条、H5 */
  function getFileInfo(options: {
    /** 本地文件路径 */
		filePath: string;
		/** 计算文件摘要的算法，默认值 md5，有效值：md5，sha1 */
		digestAlgorithm?: string;
		success?(options: {
      /** 文件大小，单位：B */
      size: number;
      /** 按照传入的 digestAlgorithm 计算得出的的文件摘要 */
      digest: string;
      /** 调用结果 */
      errMsg: string;
    }): void;
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;

  /** 获取该小程序下已保存的本地缓存文件列表 不支持头条、H5 */
  function getSavedFileList(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 wx.getFileInfo() 接口。不支持头条、H5 */
  function getSavedFileInfo(options: {
    /** 文件路径 */
    filePath: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 删除本地缓存文件 不支持头条、H5 */
  function removeSavedFile(options: {
    /** 需要删除的文件路径 */
    filePath: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 新开页面打开文档，不支持支付宝、头条、H5 */
  function openDocument(options: {
    /** 本地缓存中的指定的 key */
		key: string;
		/** 需要存储的内容 */
    data: any | string;
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;
  

  /** 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口，支持 Promise 化使用。 */
  function setStorage(object: {
    /** 本地缓存中的指定的 key */
    key: string,
    /** 需要存储的内容 */
    data: {} | string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。 */
  function setStorageSync(key: string, data: {} | string);


  /** 从本地缓存中异步获取指定 key 对应的内容，支持 Promise 化使用。 */
  function getStorage(options: {
    /** 本地缓存中的指定的 key */
    key: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;

  
  /** 从本地缓存中同步获取指定 key 对应的内容。 */
  function getStorageSync(options: {
    /** 本地缓存中的指定的 key */
    key: string,
  });


  /** 异步获取当前 storage 的相关信息，支持 Promise 化使用。 */
  function getStorageInfo(options: {
    /** 本地缓存中的指定的 key */
    key: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 同步获取当前 storage 的相关信息。 */
  function getStorageInfoSync();


  /** 从本地缓存中异步移除指定 key，支持 Promise 化使用。 */
  function removeStorage(options: {
    /** 本地缓存中的指定的 key */
    keys: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 从本地缓存中同步移除指定 key 。 */
  function removeStorageSync(key: string);


  /** 清理本地数据缓存。 */
  function clearStorage();


  /** 同步清理本地数据缓存 */
  function clearStorageSync();


  /** 使用方式同 wx.getLocation，支持 Promise 化使用。不支持H5平台 */
  function getLocation(options: {
    /** wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 */
    type?: string,
    /** 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度 */
    altitude?: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 打开地图选择位置 支持 Promise 化使用。不支持头条、H5 */
  function chooseLocation(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 使用微信内置地图查看位置 支持 Promise 化使用。不支持H5 */
  function openLocation(options: {
    /** 纬度，范围为-90~90，负数表示南纬。使用 gcj02 国测局坐标系 */
    latitude: number,
    /** 经度，范围为-180~180，负数表示西经。使用 gcj02 国测局坐标系 */
    longitude: number,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 创建 map 上下文 MapContext 对象。不支持头条、H5 */
  function createMapContext(mapId: string, scope: object);


  /** 获取系统信息，支持 Promise 化使用。部分返回值参数H5不支持 */
  function getSystemInfo(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取系统信息同步接口。部分返回值参数H5不支持 */
  function getSystemInfoSync();


  /** 判断小程序的API，回调，参数，组件等是否在当前版本可用。不支持头条与H5 */
  function canIUse(schema: string);


  /** 获取网络类型，支持 Promise 化使用。不支持H5 */
  function getNetworkType(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 监听网络状态变化。不支持H5 */
  function onNetworkStatusChange(callback?: (res?) => void);


  /** 监听加速度数据事件。不支持H5 */
  function onAccelerometerChange(callbacl: (res: {
    /** x轴 */
    x: number,
    /** y轴 */
    y: number,
    /** z轴 */
    z: number,
  }) => void);


  /** 开始监听加速度数据。不支持支付宝、H5 */
  function startAccelerometer(options: {
    interval?: 'game'|'normal'|'ui',
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 停止监听加速度数据。不支持H5 */
  function stopAccelerometer(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 监听罗盘数据变化事件。不支持H5 */
  function onCompassChange(callbacl: (res: {
    /** 面对的方向度数 */
    direction: number,
    /** 精度 */
    accuracy: number|string,
  }) => void);


  /** 开始监听罗盘数据,不支持支付宝、H5 */
  function startCompass(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 停止监听罗盘数据，不支持H5 */
  function stopCompass(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 监听陀螺仪数据变化事件。不支持百度、头条、H5 */
  function onGyroscopeChange(callback?: (res?: {
    /** x轴的角速度 */
    x: number,
    /** y轴的角速度 */
    y: number,
    /** z轴的角速度 */
    z: number,
  }) => void);


  /** 拨打电话，支持 Promise 化使用。不支持H5 */
  function makePhoneCall(options: {
    /** 需要拨打的电话号码 */
    phoneNumber: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 调起客户端扫码界面进行扫码，支持 Promise 化使用。不支持H5 */
  function scanCode(options: {
    /** 是否只能从相机扫码，不允许从相册选择图片 */
    onlyFromCamera?: boolean,
    /** 扫码类型 */
    scanType?: ('barCode'|'qrCode'|'datamatrix'|'pdf417')[],
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 设置系统剪贴板的内容，支持 Promise 化使用。不支持H5 */
  function setClipboardData(options: {
    /** 剪贴板的内容 */
    data: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 获取系统剪贴板的内容, 不支持H5 */
  function getClipboardData(options: {
    /** 接口调用成功的回调函数 */
    success?(data?: {
      /** 剪贴板的内容 */
      data: string,
    }),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  });


  /** 初始化蓝牙模块，支持 Promise 化使用。不支持百度、头条、H5 */
  function openBluetoothAdapter(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。，支持 Promise 化使用。不支持百度、头条、H5 */
  function closeBluetoothAdapter(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 获取本机蓝牙适配器状态，支持 Promise 化使用。不支持百度、头条、H5 */
  function getBluetoothAdapterState(options: {
    /** 接口调用成功的回调函数 */
    success?(data?: {
      /** 是否正在搜索设备 */
      discovering: boolean,
      /** 蓝牙适配器是否可用 */
      available: boolean,
    }),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 监听蓝牙适配器状态变化事件,不支持百度、头条、H5 */
  function onBluetoothAdapterStateChange(callback?: (res?: {
    /** 是否正在搜索设备 */
    discovering: boolean,
    /** 蓝牙适配器是否可用 */
    available: boolean,
  }) => any);


  /** 开始搜寻附近的蓝牙外围设备。支持 Promise 化使用。不支持百度、头条、H5 */
  function startBluetoothDevicesDiscovery(options: {
    /** 要搜索的蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。 */
    services?: string[],
    /** 是否允许重复上报同一设备 */
    allowDuplicatesKey?: boolean,
    /** 上报设备的间隔。0 表示找到新设备立即上报，其他数值根据传入的间隔上报。 */
    interval?: number,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索，支持 Promise 化使用。不支持百度、头条、H5 */
  function stopBluetoothDevicesDiscovery(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。支持 Promise 化使用。不支持百度、头条、H5 */
  function getBluetoothDevices(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 根据 uuid 获取处于已连接状态的设备。支持 Promise 化使用。不支持百度、头条、H5 */
  function getConnectedBluetoothDevices(options: {
    /** 蓝牙设备主 service 的 uuid 列表 */
    services: string[],
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 监听寻找到新设备的事件, 不支持百度、头条、H5 */
  function onBluetoothDeviceFound(callback?: (data?: {
    /** 新搜索到的设备列表 */
    devices: any,
  }) => any);


  /** 若小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。，支持 Promise 化使用。不支持百度、头条、H5 */
  function createBLEConnection(options: {
    /** 用于区分设备的 id */
    deviceId: string,
    /** 超时时间，单位ms，不填表示不会超时 */
    timeout?: number,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 断开与低功耗蓝牙设备的连接。，支持 Promise 化使用。不支持百度、头条、H5 */
  function closeBLEConnection(options: {
    /** 用于区分设备的 id */
    deviceId: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取蓝牙设备所有服务(service)。支持 Promise 化使用。不支持百度、头条、H5 */
  function getBLEDeviceServices(options: {
    /** 用于区分设备的 id */
    deviceId: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取蓝牙设备某个服务中所有特征值(characteristic)。支持 Promise 化使用。不支持百度、头条、H5 */
  function getBLEDeviceCharacteristics(options: {
    /** 蓝牙设备 id */
    deviceId: string,
    /** 蓝牙服务 uuid，需要使用 getBLEDeviceServices 获取 */
    serviceId: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 读取低功耗蓝牙设备的特征值的二进制数据值。支持 Promise 化使用。不支持百度、头条、H5 */
  function readBLECharacteristicValue(options: {
    /** 蓝牙设备 id */
    deviceId: string,
    /** 蓝牙服务 uuid，需要使用 getBLEDeviceServices 获取 */
    serviceId: string,
    /** 蓝牙特征值的 uuid */
    characteristicId: string,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;

  /** 向低功耗蓝牙设备特征值中写入二进制数据 ，支持 Promise 化使用。不支持百度、头条、H5 */
  function writeBLECharacteristicValue(options: {
    /** 蓝牙设备 id */
    deviceId: string,
    /** 蓝牙服务 uuid，需要使用 getBLEDeviceServices 获取 */
    serviceId: string,
    /** 蓝牙特征值的 uuid */
    characteristicId: string,
    /** 蓝牙设备特征值对应的二进制值 */
    value: ArrayBuffer,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。支持 Promise 化使用。不支持百度、头条、H5 */
  function notifyBLECharacteristicValueChange(options: {
    /** 蓝牙设备 id */
    deviceId: string,
    /** 蓝牙服务 uuid，需要使用 getBLEDeviceServices 获取 */
    serviceId: string,
    /** 蓝牙特征值的 uuid */
    characteristicId: string,
    /** 是否启用 notify */
    state: boolean,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 监听低功耗蓝牙连接状态的改变事件。不支持百度、头条、H5 */
  function onBLEConnectionStateChange(callback?: (res?: {
    /** 蓝牙设备ID */
    deviceId: string,
    /** 是否处于已连接状态 */
    connected: boolean,
  }) => any);


  /** 监听低功耗蓝牙设备的特征值变化事件。不支持百度、头条、H5 */
  function onBLECharacteristicValueChange(callback?: (res?: {
    /** 蓝牙设备 id */
    deviceId: string,
    /** 蓝牙特征值对应服务的 uuid */
    serviceId: string,
    /** 蓝牙特征值的 uuid */
    characteristicId: string,
    /** 特征值最新的值 */
    value: ArrayBuffer,
  }) => any);


  /** 开始搜索附近的 iBeacon 设备，支持 Promise 化使用。不支持头条、百度、H5 */
  function startBeaconDiscovery(options: {
    /** iBeacon 设备广播的 uuid 列表 */
    uuids: string[],
    /** 是否校验蓝牙开关，仅在 iOS 下有效 */
    ignoreBluetoothAvailable?: boolean,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 停止搜索附近的 iBeacon 设备,支持 Promise 化使用。不支持头条、百度、H5 */
  function stopBeaconDiscovery(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取所有已搜索到的 iBeacon 设备，支持Promise. 不支持头条、百度、H5 */
  function getBeacons(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 监听 iBeacon 设备更新事件，不支持头条、百度、H5 */
  function onBeaconUpdate(callback?: (res?: any) => any);


  /** 监听 iBeacon 服务状态变化事件，不支持头条、百度、H5 */
  function onBeaconServiceChange(callback?: (res?: any) => any);


  /** 设置屏幕亮度 支持Promise.不支持H5、头条 */
  function setScreenBrightness(options: {
    /** 屏幕亮度值，范围 0 ~ 1。0 最暗，1 最亮 */
    value: number,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取屏幕亮度 支持Promise, 不支持H5、头条 */
  function getScreenBrightness(options: {
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 设置是否保持常亮状态。支持Promise 不支持H5 */
  function setKeepScreenOn(options: {
    /** 是否保持屏幕常亮 */
    keepScreenOn: boolean,
    /** 接口调用成功的回调函数 */
    success?(data?),
    /** 接口调用失败的回调函数 */
    fail?(err?),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;
}
