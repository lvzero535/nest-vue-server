# 为什么要有access_token和refresh_token？

access_token和refresh_token都存在前端，为什么要两个呢，不能一个设置长时间有效果吗？这里主要是为了降低风险，存在前端都有可能被劫持的风险。
如果劫持了access_token，攻击者只能短时间使用。如果劫持了refresh_token，刷新access_token后，用户的access_token无效被退出登录，重新登录后，刷新这两个token。
