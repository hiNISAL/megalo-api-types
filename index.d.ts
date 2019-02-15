declare namespace Megalo {
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
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    fail?(),
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
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  interface SocketTask {
    /** 通过 WebSocket 连接发送数据 */
    send?(object: {
      /** 需要发送的内容 */
      data: string|ArrayBuffer,
      /** 接口调用成功的回调函数 */
      success?(),
      /** 接口调用失败的回调函数 */
      fail?(),
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
      success?(),
      /** 接口调用失败的回调函数 */
      fail?(),
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?(),
    }),

    /** 监听 WebSocket 连接打开事件 */
    onOpen?(callback?: () => {}),

    /** 监听 WebSocket 连接关闭事件 */
    onClose?(callback?: () => {}),

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
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    fail?(),
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
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;

  /** 保存图片到系统相册。不支持H5平台 */
  function saveImageToPhotosAlbum(res: {
    /** 图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径 */
    filePath,
    /** 接口调用成功的回调函数 */
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }): Promise<any>;


  /** 保存视频到系统相册。不支持支付宝、H5平台 */
  function saveVideoToPhotosAlbum(object: {
    /** 视频文件路径，可以是临时文件路径也可以是永久文件路径 */
    filePath: string,
    /** 接口调用成功的回调函数 */
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    fail?(),
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
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;

  /** 获取该小程序下已保存的本地缓存文件列表 不支持头条、H5 */
  function getSavedFileList(options: {
    /** 接口调用成功的回调函数 */
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 wx.getFileInfo() 接口。不支持头条、H5 */
  function getSavedFileInfo(options: {
    /** 文件路径 */
    filePath: string,
    /** 接口调用成功的回调函数 */
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;


  /** 删除本地缓存文件 不支持头条、H5 */
  function removeSavedFile(options: {
    /** 需要删除的文件路径 */
    filePath: string,
    /** 接口调用成功的回调函数 */
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
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
    success?(),
    /** 接口调用失败的回调函数 */
    fail?(),
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(),
  }) : Promise<any>;
  
}
