/**
 * Created by outstudio on 16/4/22.
 */

window.App=new Object();

window.App.getModel=function(){
    return "debug";
}
window.App.getLoadModel = function () {
    return "true";
}
window.App.load = function () {
    $("#loading").fakeLoader({prolong: true});
}
window.App.unload = function () {
    $("#loading").fadeOut();
}