import React, {useEffect} from 'react';
import {Alert, Button, ScrollView, View, EventSubscription} from 'react-native';
import * as Uni from 'react-native-uni';
import LottieView from "lottie-react-native";
import RNFS, {DownloadProgressCallbackResult} from "react-native-fs";

Uni.initialize({
  items: [{title: "标题", key: "t1"}],
  capsule: true,
  fontSize: "16px",
  fontColor: "#000",
  fontWeight: "normal",
}).then(res => {
  console.log('initialize', res)
}).catch(e => {
  console.error('initialize:Error', e)
})

class SplashView extends React.Component<{ appid: string }> {
  render() {
    console.log('SplashView', this.props.appid)
    return <View style={{flex: 1, backgroundColor: '#ff0', alignItems: 'center', justifyContent: 'center'}}>
      <LottieView source={require('./progress.json')} autoPlay loop/>
    </View>
  }
}

Uni.setSplashView(SplashView);

export default function App() {

  useEffect(() => {
    let subs: EventSubscription[] = [];
    subs.push(Uni.onMenuClick(key => {
      console.log('点击胶囊', key)
    }));
    subs.push(Uni.onAppClose(() => {
      console.log('onAppClose')
    }));
    subs.push(Uni.onEventReceive(data => {
      console.log('数据', data)
      Uni.closeCurrentApp().then(res => console.log('关闭', res)).catch(e => console.error('失败', e));
    }));
    return () => {
      subs.forEach(sub => sub.remove())
    }
  }, [])
  return (
    <ScrollView style={{flex: 1}}
                contentContainerStyle={{alignContent: 'center', paddingTop: 100, justifyContent: 'center'}}>

      <Button title="启动(本地商城项目)" onPress={() => {
        Uni.launch({appid: "__UNI__82FC134"}).then(() => console.log('success')).catch(e => console.error("错误", e))
      }}/>
      <Button title="isExistsApp" onPress={() => {
        Uni.isExistsApp("__UNI__CAFB3F6").then(res => Alert.alert(String(res)))
      }}/>
      <Button title="getRuningAppid" onPress={() => {
        Uni.getRuningAppid().then(res => Alert.alert(res || 'no')).catch(e => console.error("错误", e))
      }}/>
      <Button title="getAppVersionInfo" onPress={() => {
        Uni.getAppVersionInfo("__UNI__82FC134").then(res => Alert.alert(JSON.stringify(res)))
      }}/>
      <Button title="getAppBasePath" onPress={() => {
        Uni.getAppBasePath("__UNI__82FC134").then(res => Alert.alert(res)).catch(e => console.error("错误", e))
      }}/>
      <Button title={'释放wgt'} onPress={() => {
        Uni.releaseWgtToRunPathFromPath("/Users/puti/Desktop/WorkSpace/uni/test/unpackage/release/__UNI__82FC134.wgt")
          .then(res => {
            if (res) {
              Uni.launch({appid: '__UNI__82FC134'})
            }
          })

      }}/>
      <Button title="ThorUI组件库示例" onPress={() => {
        openFromUrl('__UNI__CFCF797', (res) => console.log('下载进度', res))
      }}/>
      <Button title="云上商城完整用户端" onPress={() => {
        openFromUrl('__UNI__9269930', (res) => console.log('下载进度', res))
      }}/>
      <Button title="仿「ONE · 一个」App模板" onPress={() => {
        openFromUrl('__UNI__CAFB3F6', (res) => console.log('下载进度', res))
      }}/>
      <Button title="数字货币交易系统模板" onPress={() => {
        openFromUrl('__UNI__1E0AAC2', (res) => console.log('下载进度', res))
      }}/>
      <Button title="App权限判断和提示示例" onPress={() => {
        openFromUrl('__UNI__6BD0AC8', (res) => console.log('下载进度', res))
      }}/>
    </ScrollView>
  );
}

function openFromUrl(appid: string, progress: (res: DownloadProgressCallbackResult) => void) {
  let toFile = `${RNFS.TemporaryDirectoryPath}${appid}.wgt`;
  return Uni.isExistsApp(appid).then((res) => {
    if (res) return Uni.launch({appid: appid})
    return RNFS.downloadFile({
      fromUrl: `https://va.substrate.top/${appid}.wgt`,
      toFile: toFile,
      progress: progress,
      progressDivider: 1,
    }).promise.then(res => {
      console.log('下载完成', res, toFile);
      return Uni.releaseWgtToRunPathFromPath(toFile)
    }).then(res => {
      console.log('释放完成', res);
      RNFS.unlink(toFile).then(() => console.log('删除完成'));
      return Uni.launch({appid: appid})
    })
  })
}
