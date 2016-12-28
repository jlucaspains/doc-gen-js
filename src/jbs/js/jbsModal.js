var Core;
(function (Core) {
    var Web;
    (function (Web) {
        var JbsModal = (function () {
            function JbsModal(id, title, width, autoClose) {
                this.verifityContainer();
                //DEFAULT VALUES
                if (id == null)
                    id = "jbsModal";
                if (autoClose === undefined || autoClose === null)
                    autoClose = true;
                this.id = id;
                this.title = title;
                this.width = width;
                this.autoClose = autoClose;
            }
            JbsModal.prototype.verifityContainer = function () {
                if ($("#divJbsElementsContainer").length === 0)
                    $("body").append("<div id='divJbsElementsContainer'></div>");
            };
            JbsModal.prototype.open = function (html, buttons) {
                this.openModal(this, html);
                //WE APPEND BOTTONS, IF EXISTS
                if (buttons !== "" || buttons !== null) {
                    $("#" + this.id).find(".modal-footer").prepend(buttons);
                }
            };
            ;
            JbsModal.prototype.load = function (url, message, method, callback) {
                var _this = this;
                if (callback === void 0) { callback = null; }
                //AFTER LOAD THE MODAL, WE NEED HAVE SURE THAT DOESN'T EXIST A MODAL WITH THE SAME ID
                if ($("#" + this.id).length > 0) {
                    $("#divJbsElementsContainer").append("<div class='divJbsOverlay' overlayFor='" + this.id + "' style='z-index: " + (parseInt($("#" + this.id).css("z-index")) - 1) + "'></div>");
                    $("#" + this.id).modal("show");
                    //CALLBACK
                    if (callback !== null && callback !== undefined) {
                        callback();
                    }
                    //END
                    return;
                }
                //DEFAULT VALUES
                if (message == null)
                    message = "Loading page, wait...";
                if (method == null)
                    method = "GET";
                var modalRequest = new Web.JbsSubmitter(url, method, null, message, null, null);
                $.when(modalRequest.request()).then(function (response) {
                    _this.openModal(_this, response, callback);
                });
            };
            ;
            JbsModal.prototype.openModal = function (config, modalContent, callback) {
                if (callback === void 0) { callback = null; }
                //CALCULAMOS O ZINDEX DOS ELEMENTOS
                var numberOfElements = $(".jbsElement").length;
                var zindex = 2000 + (2 * numberOfElements);
                $("#divJbsElementsContainer").append("<div class='divJbsOverlay' overlayFor='" + config.id + "' style='z-index: " + (zindex + 1) + "'></div>");
                var htmlModal = " <div class='modal jbsModal jbsElement' id='" + config.id + "' tabindex='-1' data-autoclose='" + config.autoClose + "' role='dialog' aria-labelledby='" + config.id + "' aria-hidden='true' style='z-index: " + (zindex + 2) + "'>\n                                <div class='modal-dialog' style='width:" + config.width + "px'>\n                                    <div class='modal-content'>\n                                        <div class='modal-header'>\n                                            <button type='button' class='close btnJbsModalClose' jbsModalId='" + config.id + "' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>\n                                            <h4 class='modal-title'>" + config.title + "</h4>\n                                        </div>\n                                        <div class='modal-body'>" + modalContent + "</div>\n                                        <div class='modal-footer'>\n                                            <button type='button' data-dismiss='modal' class='btn btn-default btnJbsModalClose' jbsModalId='" + config.id + "'>Close</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>";
                //APPEND MODAL ON HTML
                $("body").append(htmlModal);
                //WE APPEND BOTTONS, IF EXISTS
                $("#" + config.id).find(".modal-footer").prepend($("#" + config.id).find(".divJbsModalButtons").html());
                $("#" + config.id).find(".divJbsModalButtons").remove();
                //$.validator.unobtrusive.parse(document);
                //OPEN MODAL
                $("#" + config.id).modal({ keyboard: false, backdrop: false });
                //CALLBACK
                if (callback !== null && callback !== undefined) {
                    callback();
                }
            };
            JbsModal.prototype.close = function () {
                jbsModalClose(this.id);
            };
            return JbsModal;
        }());
        Web.JbsModal = JbsModal;
    })(Web = Core.Web || (Core.Web = {}));
})(Core || (Core = {}));
$(document).on("click", ".btnJbsModalClose", function () { jbsModalClose($(this).attr("jbsModalId")); });
function jbsModalClose(jbsModalId) {
    $(".divJbsOverlay[overlayFor='" + jbsModalId + "']").remove();
    //AUTOCLOSE OFF
    var element = $("#" + jbsModalId)[0];
    if (element.dataset.autoclose === "false") {
        $("#" + jbsModalId).modal("hide");
        return;
    }
    $("#" + jbsModalId).remove();
    //WHEN WE CLOSE THE MODAL, BUT STILL ONE MORE WE ADD DE CLASS 'modal-open' ON BODY
    if ($(".modal.in").length > 0) {
        $("body").addClass("modal-open");
    }
    else {
        $("body").removeClass("modal-open");
        $("body").css("padding-right", "0");
    }
}
$(document).on("click", "[data-modal='true']", function (e) {
    e.preventDefault();
    var modalButton = new Core.Web.JbsModal(this.dataset.modalid, this.dataset.modaltitle, this.dataset.modalwidth, this.dataset.modalautoclose);
    modalButton.load(this.dataset.modalurl, null, this.dataset.modalmethod);
});
//# sourceMappingURL=jbsModal.js.map