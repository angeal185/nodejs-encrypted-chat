define(["$.utils","$.proto"],function(e,n){function o(){}function r(e){var n,r=new o;if(void 0!==e)if(e===document)r.push(document);else if(e===window)r.push(window);else if(n=document.querySelectorAll(e))for(var t=0;t<n.length;t++)r.push(n[t]);return r}o.prototype=new Array;for(var t in n)o.prototype[t]=n[t];for(var i in e)r[i]=e[i];return r});