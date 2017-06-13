define(["$","castrato","settings","templates"],function(e,n,o,t){var m,i,c=function(e){return e.length>o.key.maxLen?n.emit("console:error",t.messages.key_to_long):e.length<o.key.minLen?n.emit("console:error",t.messages.key_to_short):(i=e,n.emit("key:changed",i),n.emit("console:info",t.messages.key_ok))},s=function(){n.emit("console:motd",t.help)},a=function(){n.emit("console:clear")},l=function(e){n.emit("console:torch",e)},r=function(i){return i.length>o.nick.maxLen?n("console:error",e.template(t.messages.nick_to_long,{nick_maxLen:o.nick.maxLen})):i.length<o.nick.minLen?n("console:error",e.template(t.messages.nick_to_short,{nick_minLen:o.nick.minLen})):(m=i,n.emit("nick:changed",m),void n.emit("console:info",e.template(t.messages.nick_set,{nick:e.escapeHtml(m)})))},k=function(o){n.emit("window:title",o),n.emit("console:info",e.template(t.messages.title_set,{title:e.escapeHtml(o)}))};n.on("command:help",s),n.on("command:clear",a),n.on("command:nick",r),n.on("command:key",c),n.on("command:torch",l),n.on("command:title",k)});