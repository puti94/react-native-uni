//
//  DCUniMPSDKEngine.h
//  DCUniMP
//
//  Created by XHY on 2020/1/14.
//  Copyright © 2020 DCloud. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "DCUniMPMenuActionSheetStyle.h"

NS_ASSUME_NONNULL_BEGIN

@protocol DCUniMPSDKEngineDelegate <NSObject>

///
/// 回调数据给小程序
/// result：回调参数支持 NSString 或 NSDictionary 类型
/// keepAlive：如果 keepAlive 为 YES，则可以多次回调数据给小程序，反之触发一次后回调方法即被移除
typedef void (^DCUniMPKeepAliveCallback)(id result, BOOL keepAlive);

@optional
/// 胶囊按钮菜单 ActionSheetItem 点击回调方法
/// @param identifier item 项的标识
- (void)defaultMenuItemClicked:(NSString *)identifier;

/// 返回打开小程序时的闪屏视图
/// @param appid appid
- (UIView *)splashViewForApp:(NSString *)appid;

/// 关闭小程序的回调方法
/// @param appid appid
- (void)uniMPOnClose:(NSString *)appid;


/// 小程序向原生发送事件回调方法
/// @param event 事件名称
/// @param data 数据：NSString 或 NSDictionary 类型
/// @param callback 回调数据给小程序
- (void)onUniMPEventReceive:(NSString *)event data:(id)data callback:(DCUniMPKeepAliveCallback)callback;

@end

@interface DCUniMPSDKEngine : NSObject

#pragma mark - SDK 全局生命周期方法
/// 初始化 sdk 全局环境
/// @param options 启动参数
+ (void)initSDKEnvironmentWihtLaunchOptions:(NSDictionary *)options;

/// 释放SDK资源
+ (void)destory;

#pragma mark - 小程序应用相关方法

/// 获取 App 运行路径，注：需要将应用资源放到此路径下
/// @param appid appid
+ (NSString *)getAppRunPathWithAppid:(NSString *)appid;

/// 运行目录中是否已经存在 App
/// @param appid appid
+ (BOOL)isExistsApp:(NSString *)appid;

/// 将wgt应用资源包部署到运行路径中
/// @param appid appid
/// @param wgtPath wgt应用资源包路径
+ (BOOL)releaseAppResourceToRunPathWithAppid:(NSString *)appid
                            resourceFilePath:(NSString *)wgtPath;

/// 启动 App
/// @param appid appid
/// @param arguments 启动参数（可以在小程序中通过 plus.runtime.arguments 获取此参数）
+ (void)openApp:(NSString *)appid
      arguments:(NSDictionary * __nullable)arguments;

/// 启动 App
/// @param appid appid
/// @param arguments 启动参数（可以在小程序中通过 plus.runtime.arguments 获取此参数）
/// @param redirectPath 启动后直接打开的页面路径 例："pages/component/view/view?a=1&b=2"
+ (void)openApp:(NSString *)appid
      arguments:(NSDictionary * _Nullable)arguments
   redirectPath:(NSString * _Nullable)redirectPath;

/// 关闭当前小程序应用
+ (void)closeUniMP;

/// 获取当前运行的小程序appid
+ (NSString *)getActiveUniMPAppid;


/// 获取当前小程序页面的直达链接url
+ (NSString *)getCurrentPageUrl;


/// 获取已经部署的小程序应用资源版本信息
/// @param appid appid
/// 返回数据为 manifest 中的配置信息
/// {
///     "name": "1.0.0",     // 应用版本名称
///     "code": 100          // 应用版本号
/// }
+ (NSDictionary *__nullable)getUniMPVersionInfoWithAppid:(NSString *)appid;


/// 向小程序发送事件
/// @param event 事件名称
/// @param data 数据：NSString 或 NSDictionary 类型
+ (void)sendUniMPEvent:(NSString *)event data:(id)data;

#pragma mark - 胶囊按钮相关方法

/// 设置导航栏上的胶囊按钮显示还是隐藏（默认显示）
/// @param menuButtonHidden Bool 是否隐藏胶囊按钮
+ (void)setMenuButtonHidden:(BOOL)menuButtonHidden;

/// 配置点击菜单按钮弹出 ActionSheet 视图的样式
/// @param menuActionSheetStyle DCUniMPMenuActionSheetStyle
+ (void)configMenuActionSheetStyle:(DCUniMPMenuActionSheetStyle *)menuActionSheetStyle;

/// 配置胶囊按钮菜单 ActionSheet 全局项
/// @param items DCUniMPMenuActionSheetItem 数组
+ (void)setDefaultMenuItems:(NSArray<DCUniMPMenuActionSheetItem *> *)items;


/// 设置 DCUniMPSDKEngineDelegate
/// @param delegate 代理对象
+ (void)setDelegate:(id<DCUniMPSDKEngineDelegate>)delegate;

#pragma mark - App 生命周期方法
+ (void)applicationDidBecomeActive:(UIApplication *)application;
+ (void)applicationWillResignActive:(UIApplication *)application;
+ (void)applicationDidEnterBackground:(UIApplication *)application;
+ (void)applicationWillEnterForeground:(UIApplication *)application;


#pragma mark - 如果需要使用 URL Scheme 或 通用链接相关功能，请实现以下方法
+ (void)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options;
+ (void)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity;

#pragma mark - 如需使用远程推送相关功能，请实现以下方法
+ (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
+ (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo;

#pragma mark - 如需使用本地推送通知功能，请实现以下方法
+ (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification;

@end

NS_ASSUME_NONNULL_END
