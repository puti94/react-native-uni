package com.reactnativeuni

import com.alibaba.fastjson.JSONObject
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import io.dcloud.feature.sdk.DCSDKInitConfig
import io.dcloud.feature.sdk.DCUniMPSDK
import io.dcloud.feature.sdk.MenuActionSheetItem
import java.util.*

class UniModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private fun sendEvent(eventName: String, params: Any) {
    if (params is JSONObject) {
      reactContext
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit(eventName, params.toString())
    } else {
      reactContext
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit(eventName, params)
    }
  }

  override fun getName(): String {
    return "Uni"
  }

  @ReactMethod
  fun initialize(params: ReadableMap, promise: Promise) {
    try {
      val items = params.getArray("items")
      val capsule = params.getBoolean("capsule")
      val fontSize = params.getString("fontSize")
      val fontColor = params.getString("fontColor")
      val fontWeight = params.getString("fontWeight")
      val sheetItems: MutableList<MenuActionSheetItem> = ArrayList()
      for (i in 0 until items!!.size()) {
        val item = items.getMap(i)
        sheetItems.add(MenuActionSheetItem(item!!.getString("title"), item.getString("key")))
      }
      val config = DCSDKInitConfig.Builder()
        .setCapsule(capsule)
        .setMenuDefFontSize(fontSize)
        .setMenuDefFontColor(fontColor)
        .setMenuDefFontWeight(fontWeight)
        .setMenuActionSheetItems(sheetItems)
        .build()
      DCUniMPSDK.getInstance().setDefMenuButtonClickCallBack { appid, key -> sendEvent("MenuItemClick", key) }
      DCUniMPSDK.getInstance().setOnUniMPEventCallBack { event, data, callback -> sendEvent("UniMPEventReceive", data) }
      DCUniMPSDK.getInstance().setUniMPOnCloseCallBack { appid -> sendEvent("UniMPOnClose", appid) }
      DCUniMPSDK.getInstance().initialize(reactContext, config) { b -> promise.resolve(b) }
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun launch(config: ReadableMap, promise: Promise) {
    try {
      var path: String? = null
      var params: String? = null
      val appid = config.getString("appid")
      if (config.hasKey("path")) {
        path = config.getString("path")
      }
      if (config.hasKey("params")) {
        params = config.getString("params")
      }
      DCUniMPSDK.getInstance().startApp(this.currentActivity, appid, UniSplashView::class.java, path, if (params == null) null else org.json.JSONObject(params))
      promise.resolve(null)
    } catch (e: Exception) {
      e.printStackTrace()
      promise.reject(e)
    }
  }

  @ReactMethod
  fun getAppBasePath(promise: Promise) {
    try {
      val path = DCUniMPSDK.getInstance().getAppBasePath(this.currentActivity)
      promise.resolve(path)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun isExistsApp(appid: String?, promise: Promise) {
    try {
      promise.resolve(DCUniMPSDK.getInstance().isExistsApp(appid))
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun getRuningAppid(promise: Promise) {
    try {
      promise.resolve(DCUniMPSDK.getInstance().runingAppid)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun getCurrentPageUrl(promise: Promise) {
    try {
      promise.resolve(DCUniMPSDK.getInstance().currentPageUrl)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun getAppVersionInfo(appid: String?, promise: Promise) {
    try {
      val info = DCUniMPSDK.getInstance().getAppVersionInfo(appid)
      if (info === null) {
        promise.resolve(null)
        return
      }
      val map = Arguments.createMap()
      map.putString("name", info.getString("name"))
      map.putInt("code", info.getString("code").toInt())
      promise.resolve(map)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun closeCurrentApp(promise: Promise) {
    try {
      promise.resolve(DCUniMPSDK.getInstance().closeCurrentApp())
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun sendEvent(name: String?, data: ReadableMap?, promise: Promise) {
    try {
      promise.resolve(DCUniMPSDK.getInstance().sendUniMPEvent(name, data))
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun releaseWgtToRunPathFromPath(path: String?, promise: Promise) {
    try {
      DCUniMPSDK.getInstance().releaseWgtToRunPathFromePath(path) { code: Int, _: Any? ->
        promise.resolve(code == 1)
      }
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

}
