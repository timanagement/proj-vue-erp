/**
 * Created by GiantX on 2017/5/6.
 */
if (window.attachEvent) {
  window.attachEvent('onload', function () {
    var el = document.createElement('div')
    var elStyle = el.style
    var docBody = document.getElementsByTagName('body')[0]
    docBody.innerHTML = ''
    el.innerHTML = '<div>尊敬的用户,商翔ERP系统已不再保障IE9浏览器下的可用性。建议您尽快 <a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target=_blank>升级浏览器</a>，或者使用<a href="http://www.google.com/intl/zh-CN/chrome/" target=_blank>Chrome</a>、<a href="http://www.firefox.com.cn/download/" target=_blank>Firefox</a>。 </div>'
    elStyle.width = '100%'
    elStyle.color = '#090'
    elStyle.fontSize = '16px'
    elStyle.backgroundColor = '#F2FFEA'
    elStyle.textAlign = 'CENTER'
    elStyle.padding = '12px 11px'
    elStyle.padding = '12px 11px'
    docBody.appendChild(el)
  })
}
