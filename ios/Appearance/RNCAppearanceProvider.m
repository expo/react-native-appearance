#import "RNCAppearanceProvider.h"

@implementation RNCAppearanceProvider

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) && \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
- (void)traitCollectionDidChange:(UITraitCollection *)previousTraitCollection
{
  [super traitCollectionDidChange:previousTraitCollection];

  if (@available(iOS 13.0, *)) {
    if ([previousTraitCollection hasDifferentColorAppearanceComparedToTraitCollection:self.traitCollection]) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"RNCUserInterfaceStyleDidChangeNotification"
                                                          object:self
                                                        userInfo:@{@"traitCollection": self.traitCollection}];
    }
  }
}
#endif

@end
