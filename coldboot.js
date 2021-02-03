window.coldboot = (function(){
    var prefix='cb';
    var loader=`${prefix}-await`;
    var loaderId=`${loader}-id`;
    var preserve=`${prefix}-persist`;

    var loaderContainerId = `${loader}-loader`
    var textContainerId = `${loader}-text`;

    var preserveMap = {};
    var awaitId = undefined;

    function showAwait(str){
        var loaderEle = document.getElementById(loaderContainerId);
        loaderEle.style.display = 'block';
        var textEle = document.getElementById(textContainerId);
        textEle.innerText = str;
    }

    function hideAwait(){
        var loaderEle = document.getElementById(loaderContainerId);
        loaderEle.style.display = 'none';
    }

    function addToPreserveMap(key,value){
        preserveMap[key] = value;
    }

    function getFromPreserveMap(key){
        return preserveMap[key] || "";
    }

    function isAwaitTarget(target){
        var attr = target.getAttributeNames();
        if(attr.indexOf(loader) >= 0 && attr.indexOf(loaderId) >= 0){
            return {isAwait:true,target:target};
        }
        var elements =  document.querySelectorAll(`[${loader}]`)
        for(var i=0;i < elements.length;i++){
            if(elements[i].contains(target)){
                return {isAwait:true,target:elements[i]};
            }
        }
        return {isAwait:false};
    }

    function awaitListener(event){
        var target = event.target;
        var element = isAwaitTarget(target)
        if(element.isAwait){
            var awaitAttr = element.target.getAttribute(loader);
            awaitId = element.target.getAttribute(loaderId);
            showAwait(awaitAttr || 'Loading')
        }
    }

    function preserveListener(event) {
        var target = event.target;
        if(target.getAttributeNames().indexOf(preserve) >= 0){
            var preserveAttr = target.getAttribute(preserve);
            addToPreserveMap(preserveAttr,target.value)
        }
    }

    function fireEvent(target,eventName){
        var event = new Event(eventName, {bubbles: true,cancelable: false,});
        target.dispatchEvent(event);
    }

    function injectPreservedValue(){
        document.querySelectorAll(`[${preserve}]`).forEach(function(target){
            var preserveAttr = target.getAttribute(preserve);
            target.value = getFromPreserveMap(preserveAttr);
            ['focus','input','change','keypress','keydown','keyup','blur'].forEach(function(event){
                fireEvent(target,event);
            })
        })
    }

    function init(customLoaderId,customTextContainerId){
        if(customLoaderId){
            loaderContainerId = customLoaderId;
        }
        if(customTextContainerId){
            textContainerId = customTextContainerId;
        }
        document.addEventListener('click',awaitListener);
        document.addEventListener('input',preserveListener);
    }

    function complete(){
        hideAwait();
        document.removeEventListener('click',awaitListener);
        document.removeEventListener('input',preserveListener);
        injectPreservedValue();
        return {preserve:preserveMap,awaitId:awaitId};
    }

    return {
        init : init,
        complete : complete
    }
})();