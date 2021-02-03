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

    function awaitListener(event){
        var target = event.target;
        var attr = target.getAttributeNames();
        if(attr.indexOf(loader) >= 0 && attr.indexOf(loaderId) >= 0){
            var awaitAttr = target.getAttribute(loader);
            awaitId = target.getAttribute(loaderId);
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

    function injectPreservedValue(){
        document.querySelectorAll(`[${preserve}]`).forEach(function(target){
            var preserveAttr = target.getAttribute(preserve);
            target.value = getFromPreserveMap(preserveAttr);
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