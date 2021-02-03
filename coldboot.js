window.coldboot = (function(){
    var prefix='cb';
    var loader=`${prefix}-await`;
    var preserve=`${prefix}-persist`;

    var loaderId = `${loader}-loader`
    var textContainerId = `${loader}-text`;

    var preserveMap = {};

    function showAwait(str){
        var loaderEle = document.getElementById(loaderId);
        loaderEle.style.display = 'block';
        var textEle = document.getElementById(textContainerId);
        textEle.innerText = str;
    }

    function hideAwait(){
        var loaderEle = document.getElementById(loaderId);
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
        var toAwait = target.getAttributeNames().indexOf(loader) >= 0;
        if(toAwait){
            var awaitAttr = target.getAttribute(loader);
            showAwait(awaitAttr || 'Loading')
        }
    }

    function preserveListener(event) {
        var target = event.target;
        var toPreserve = target.getAttributeNames().indexOf(preserve) >= 0;
        if(toPreserve){
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
            loaderId = customLoaderId;
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
        return preserveMap;
    }

    return {
        init : init,
        complete : complete
    }
})();