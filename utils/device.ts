// 判断页面是在手机端，平板端 打开
export const getIsPhone =  () => {
  let is = false
  const userAgentInfo = navigator.userAgent;
  const width = window.innerWidth
  const mobileAgents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  for (let i = 0; i < mobileAgents.length; i++) {
    if (userAgentInfo.indexOf(mobileAgents[i]) !== -1) {
      is = true
    }
  }
  if(width < 768) {
    is = true
  }
  return is
}
// * 获取操作系统类型，0 Android ,1 iOS

export function getOSType() {
  if (/(Android)/i.test(navigator.userAgent)) {
      return 0;
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return 1;
  } else {
      return 2;
  }
}
//判断当前环境是否是微信环境
export function is_weixin(){
  const ua = navigator.userAgent.toLowerCase();
  //@ts-ignore
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
       return true;
 } else {
        return false;
  }
}

