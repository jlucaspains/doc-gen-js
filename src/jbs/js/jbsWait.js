var Core;
(function (Core) {
    var Web;
    (function (Web) {
        var JbsWait = (function () {
            function JbsWait() {
            }
            JbsWait.verifityContainer = function () {
                if ($("#divJbsElementsContainer").length === 0)
                    $("body").append("<div id='divJbsElementsContainer'></div>");
            };
            JbsWait.show = function (message) {
                //FIRST WE VERIFIFY THE CONTAINER
                this.verifityContainer();
                //CALCULAMOS O ZINDEX DOS ELEMENTOS
                var numberOfElements = $(".jbsElement").length;
                var zindex = 2000 + (2 * numberOfElements);
                //INSERIMOS NO HTML
                $("#divJbsElementsContainer").append("<div class='divJbsOverlay' overlayFor='jbsWait' style='z-index: " + (zindex + 1) + "'></div>");
                $("body").append("<div class='jbsElement jbsWait' style='z-index: " + (zindex + 2) + "'><h2>" + message + "</h2></div>");
                //TRATAMOS A LARGURA
                var divWait;
                if (numberOfElements === 0) {
                    divWait = $(".jbsWait");
                }
                else {
                    divWait = $(".jbsWait:last");
                }
                divWait.css("margin-left", ((divWait.width() + 60) / 2) * -1);
            };
            JbsWait.stop = function () {
                $(".jbsWait:last").remove();
                $(".divJbsOverlay[overlayFor='jbsWait']:last").remove();
            };
            return JbsWait;
        }());
        Web.JbsWait = JbsWait;
    })(Web = Core.Web || (Core.Web = {}));
})(Core || (Core = {}));
$(function () {
    $("form[data-waitform='true']").submit(function () {
        var validator = $(this).validate();
        var message = "Submiting form, wait...";
        if (this.dataset.waitformmessage != null && this.dataset.waitformmessage !== "") {
            message = this.dataset.waitformmessage;
        }
        if (validator.form()) {
            Core.Web.JbsWait.show(message);
            return true;
        }
        else {
            return false;
        }
    });
});
//# sourceMappingURL=jbsWait.js.map