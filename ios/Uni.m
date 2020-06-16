//
//  Uni.m
//
//  Created by puti on 2020/6/16.
//

#import <Foundation/Foundation.h>
#import "Uni.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#define UNIErrorDomain @" An Error Has Occurred"

@implementation Uni{
   bool hasListeners;
}
RCT_EXPORT_MODULE();
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_METHOD(initialize:(NSDictionary *)params  findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *items = params[@"items"];
  NSMutableArray *sheetItems = [NSMutableArray array];
  
  for (int i=0; i<items.count; i++) {
      NSLog(@"-> %@",items[i]);
    [sheetItems addObject:[[DCUniMPMenuActionSheetItem alloc] initWithTitle:items[i][@"title"] identifier:items[i][@"key"]]];
  }
    
      [DCUniMPSDKEngine setDefaultMenuItems:sheetItems];
  
     [DCUniMPSDKEngine setMenuButtonHidden:!params[@"capsule"]];
      [DCUniMPSDKEngine setDelegate:self];
     resolve([NSNumber numberWithBool:true]);
}
RCT_EXPORT_METHOD(launch:(NSDictionary *)arg  findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  
  NSString *appid = arg[@"appid"];
  NSString *path = arg[@"path"];
  NSDictionary *params = arg[@"params"];
  
  if (![DCUniMPSDKEngine isExistsApp:appid]) {
      // 读取导入到工程中的wgt应用资源
      NSString *appResourcePath = [[NSBundle mainBundle] pathForResource:appid ofType:@"wgt"];
      if (!appResourcePath) {
        reject(@"-1",@"资源不存在",[NSError errorWithDomain:UNIErrorDomain code:-1 userInfo:@{}]);
          return;
      }
      // 将应用资源部署到运行路径中
      if (![DCUniMPSDKEngine releaseAppResourceToRunPathWithAppid:appid resourceFilePath:appResourcePath]) {
       if (!appResourcePath) {
         reject(@"-1",@"部署不成功",[NSError errorWithDomain:UNIErrorDomain code:-1 userInfo:@{}]);
      
           return;
       }
      }
  }
   [DCUniMPSDKEngine openApp:appid
                         arguments:params redirectPath:path];
   resolve([NSNumber numberWithBool:true]);
}
RCT_EXPORT_METHOD(getAppVersionInfo:(NSString *)appid  findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  NSDictionary *info = [DCUniMPSDKEngine getUniMPVersionInfoWithAppid:appid];
  resolve(info);
}
RCT_EXPORT_METHOD(isExistsApp:(NSString *)appid  findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  BOOL isExistsApp = [DCUniMPSDKEngine isExistsApp:appid];
  resolve([NSNumber numberWithBool:isExistsApp]);
}

RCT_EXPORT_METHOD(getAppBasePath:(NSString *)appid  findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([DCUniMPSDKEngine getAppRunPathWithAppid:appid]);
}
RCT_EXPORT_METHOD(getCurrentPageUrl:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([DCUniMPSDKEngine getCurrentPageUrl]);
}

RCT_EXPORT_METHOD(getRuningAppid:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([DCUniMPSDKEngine getActiveUniMPAppid]);
}
RCT_EXPORT_METHOD(closeCurrentApp:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  [DCUniMPSDKEngine closeUniMP];
  resolve([NSNumber numberWithBool:true]);
}


RCT_EXPORT_METHOD(releaseWgtToRunPathFromPath:(NSString *)path findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *appid = [[path lastPathComponent] stringByDeletingPathExtension];
  BOOL success = [DCUniMPSDKEngine releaseAppResourceToRunPathWithAppid:appid resourceFilePath:path];
  resolve([NSNumber numberWithBool:success]);
}

RCT_EXPORT_METHOD(sendEvent:(NSString *)name eventData:(NSDictionary *)data findEventsWithResolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
{
  [DCUniMPSDKEngine sendUniMPEvent:name data:data];
  resolve([NSNumber numberWithBool:true]);
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"MenuItemClick",@"UniMPEventReceive",@"UniMPOnClose"];
}
- (void)defaultMenuItemClicked:(NSString *)identifier {
  if(hasListeners){
     [self sendEventWithName:@"MenuItemClick" body:identifier];
  }
}
- (void)onUniMPEventReceive:(NSString *)event data:(id)data callback:(DCUniMPKeepAliveCallback)callback {

    NSLog(@"Receive UniMP event: %@ data: %@",event,data);
    if(hasListeners){
     [self sendEventWithName:@"UniMPEventReceive" body:data];
    }
    // 回传数据给小程序
    // DCUniMPKeepAliveCallback 用法请查看定义说明
    if (callback) {
        callback(@"native callback message",NO);
    }
}

- (UIView *)splashViewForApp:(NSString *)appid{
  return [[RCTRootView alloc] initWithBridge: self.bridge moduleName:@"UniModules.uniSplashView" initialProperties:@{@"appid":appid}];
}
- (void)uniMPOnClose:(NSString *)appid{
  if(hasListeners){
   [self sendEventWithName:@"UniMPOnClose" body:appid];
  }
}

// 在添加第一个监听函数时触发
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}


@end
