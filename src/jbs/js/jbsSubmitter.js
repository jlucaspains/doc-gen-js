var Core;
(function (Core) {
    var Web;
    (function (Web) {
        var JbsSubmitter = (function () {
            function JbsSubmitter(url, method, parameters, message, contentType, jbsModal) {
                //DEFAULT VALUES
                if (method == null)
                    method = "GET";
                if (contentType == null)
                    contentType = "application/x-www-form-urlencoded; charset=UTF-8";
                this.method = method;
                this.url = url;
                this.parameters = parameters;
                this.message = message;
                this.contentType = contentType;
                this.jbsModal = jbsModal;
            }
            JbsSubmitter.prototype.request = function () {
                var thisRequest = this;
                if (thisRequest.jbsModal != null) {
                    thisRequest.jbsModal.hide();
                }
                if (this.message !== null && this.message !== "") {
                    Web.JbsWait.show(this.message);
                }
                return $.ajax({
                    type: this.method,
                    url: this.url,
                    cache: false,
                    data: this.parameters,
                    contentType: this.contentType,
                    success: function (data) {
                        if (thisRequest.message !== undefined && thisRequest.message !== null && thisRequest.message !== "") {
                            Web.JbsWait.stop();
                        }
                        if (thisRequest.jbsModal != null) {
                            thisRequest.jbsModal.show();
                        }
                    },
                    error: function (req, status, error) {
                        Web.JbsWait.stop();
                        if (thisRequest.jbsModal != null) {
                            thisRequest.jbsModal.show();
                        }
                    }
                });
            };
            return JbsSubmitter;
        }());
        Web.JbsSubmitter = JbsSubmitter;
    })(Web = Core.Web || (Core.Web = {}));
})(Core || (Core = {}));
//# sourceMappingURL=jbsSubmitter.js.map