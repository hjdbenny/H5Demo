<?php
header("Content-Type:text/html;charset=UTF-8");
require_once "jssdk.class.php";
$weixin = new jssdk();
$wx = $weixin->get_sign();

 if(isset($_GET["code"])){
	$code = $_GET["code"];
	
	$arr = $weixin->get_openid($code);
	
	$access_token = $arr["access_token"];
	
	$openid = $arr["openid"];
	
	
	//$userinfo = $weixin->get_user($openid);//通过openid获取用户信,不会弹出窗口
	
	$userinfo = $weixin->get_user1($access_token,$openid);//用弹出获取用户信息

dump($userinfo);

}else{
 //$weixin->get_code("http://weixin10.sinaapp.com/jssdk-demo.php","snsapi_base");
 $weixin->get_code("http://weixin10.sinaapp.com/jssdk-demo.php","snsapi_userinfo");
 //获取code,	snsapi_base不弹出, 弹出为snsapi_userinfo
}

?>  
分享演示,和获取openid演示,获取用户信息,Oauth演示综合例子,获取code前面不能有输出哦 

jssdk.class.php 9,10行填写你的APPID APPSN

扫描二维码查看demo

get_user() 参数openid可以是微信发送各种类型消息所换取的openid
get_user() 通过两个参数 Oauth全局票据和openid获得,不需要关注也能获取用户信息       
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>           
<script type="text/javascript">
  wx.config({
      appId: "<?php echo $wx['appId'];?>",
      timestamp: <?php echo $wx['timestamp'];?>,
      nonceStr: "<?php echo $wx['nonceStr'];?>",
      signature: "<?php echo $wx['signature'];?>",
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
  });
  wx.ready(function () {
  
    var shareData = {
    title: '标题长长长长长长长长',
    desc: '描述多多多哦哦哦哦',
    link: "<?php echo $wx['url'];?>",
    imgUrl: 'http://www.baidu.com/img/bdlogo.png',
  };
  var adurl="http://www.baidu.com/";//回调
  //分享朋友
  wx.onMenuShareAppMessage({
       title: shareData.title,
      desc: shareData.desc,
      link: shareData.link,
      imgUrl:shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
        window.location.href =adurl;
      },
      cancel: function (res) {
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
 //朋友圈
  wx.onMenuShareTimeline({
      title: shareData.title+"---"+shareData.desc,
      link: shareData.link,
      imgUrl:shareData.imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
          window.location.href =adurl;
      },
      cancel: function (res) {
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });   
    
  });
</script>
