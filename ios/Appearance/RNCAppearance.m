#import "RNCAppearance.h"

#import <React/RCTBridge.h>

@implementation RNCAppearance

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(ping:(RCTResponseSenderBlock)callback)
{
  callback(@[@"pong"]);
}

@end
