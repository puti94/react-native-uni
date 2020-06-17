/**
 * User: puti.
 * @flow
 * Time: 2020/6/16 21:25 下午.
 */
import React, { Component, ComponentType } from 'react';
import {
  AppRegistry,
  NativeEventEmitter,
  NativeModules,
  Platform,
  Text,
  View,
} from 'react-native';

class NormalSplashView extends Component<{ appid: string }> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ff0',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>启动屏:{this.props.appid}</Text>
      </View>
    );
  }
}

let splashView: ComponentType<{ appid: string }>;

AppRegistry.registerComponent('UniModules.uniSplashView', () => {
  return splashView || NormalSplashView;
});

const Uni: any = NativeModules.Uni;
const uniEmitter = new NativeEventEmitter(Uni);
type Config = {
  // 胶囊按钮的标题和标识
  items?: { title: string; key: string }[];
  //是否显示胶囊按钮
  capsule?: boolean;
  //安卓独有，胶囊按钮字体大小
  fontSize?: string;
  //安卓独有，胶囊按钮字体颜色
  fontColor?: string;
  //安卓独有，胶囊按钮字体宽度
  fontWeight?: string;
};

/**
 * 设置小程序启动屏
 * @param component
 */
export function setSplashView(component: ComponentType<{ appid: string }>) {
  splashView = component;
}

/**
 * 初始化框架
 * @param params
 */
export function initialize(params: Config = {}): Promise<boolean> {
  return Uni.initialize({
    items: [],
    capsule: true,
    fontSize: '16px',
    fontColor: '#000',
    fontWeight: 'normal',
    ...params,
  });
}

type LaunchArgs = {
  //uni小程序id
  appid: string;
  //需要传给小程序的参数
  params?: Object;
  //打开小程序的路径
  path?: string;
};

/**
 * 启动参数
 * @param arg
 * @returns {*}
 */
export function launch(arg: LaunchArgs): Promise<boolean> {
  if (arg.params && Platform.OS === 'android') {
    //将参数转化为json字符串免得转化
    arg.params = JSON.stringify(arg.params);
  }
  return Uni.launch(arg);
}

/**
 * 是否存在小程序
 * @param appid
 * @returns {*}
 */
export function isExistsApp(appid: string): Promise<boolean> {
  return Uni.isExistsApp(appid);
}

/**
 * 获取真正运行的小程序id
 * @returns {*}
 */
export function getRuningAppid(): Promise<string | null> {
  return Uni.getRuningAppid();
}

/**
 * 获取小程序版本信息
 * @param appid
 * @returns {*}
 */
export function getAppVersionInfo(
  appid: string
): Promise<{ name: string; code: number } | null> {
  return Uni.getAppVersionInfo(appid);
}

/**
 * 获取小程序运行路径
 * @returns {*}
 */
export function getAppBasePath(appid: string): Promise<string> {
  return Platform.OS === 'android'
    ? Uni.getAppBasePath()
    : Uni.getAppBasePath(appid);
}

/**
 * 获取当前小程序的直连url
 * @returns {*}
 */
export function getCurrentPageUrl(): Promise<string> {
  return Uni.getCurrentPageUrl();
}

/**
 * 关闭当前小程序
 * @returns {*}
 */
export function closeCurrentApp(): Promise<boolean> {
  return Uni.closeCurrentApp();
}

/**
 * 释放wgt文件
 * @returns {*}
 */
export function releaseWgtToRunPathFromPath(path: string): Promise<boolean> {
  return Uni.releaseWgtToRunPathFromPath(path);
}

/**
 * 监听胶囊自定义按键启动
 * @returns {EmitterSubscription}
 */
export function onMenuClick(cb: (key: any) => void) {
  return uniEmitter.addListener('MenuItemClick', cb);
}

/**
 * 监听小程序向app发送的消息
 * @param cb
 * @return {EmitterSubscription}
 */
export function onEventReceive(cb: (data: any) => void) {
  return uniEmitter.addListener('UniMPEventReceive', (data) => {
    if (Platform.OS === 'android') {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }
    cb(data);
  });
}

/**
 * 监听小程序关闭
 * @param cb
 * @returns {EmitterSubscription}
 */
export function onAppClose(cb: () => void) {
  return uniEmitter.addListener('UniMPOnClose', cb);
}
