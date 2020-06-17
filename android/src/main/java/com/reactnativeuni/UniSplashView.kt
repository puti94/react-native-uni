package com.reactnativeuni

import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import com.facebook.react.ReactApplication
import com.facebook.react.ReactRootView
import io.dcloud.feature.sdk.Interface.IDCUniMPAppSplashView

class UniSplashView : IDCUniMPAppSplashView {
  var splashView: ReactRootView? = null
  override fun getSplashView(context: Context, appid: String): View {
    splashView = ReactRootView(context)
    val bundle = Bundle()
    bundle.putString("appid", appid)
    val instanceManager = (context.applicationContext as ReactApplication).reactNativeHost.reactInstanceManager
    splashView!!.startReactApplication(instanceManager, "UniModules.uniSplashView", bundle)
    return splashView as ReactRootView
  }

  override fun onCloseSplash(viewGroup: ViewGroup) {
    viewGroup.removeView(splashView)
  }
}
