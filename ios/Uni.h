#import <React/RCTBridgeModule.h>
#import "DCUniMP.h"
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeDelegate.h>
@interface Uni : RCTEventEmitter <RCTBridgeModule,DCUniMPSDKEngineDelegate,RCTBridgeDelegate>

@end
