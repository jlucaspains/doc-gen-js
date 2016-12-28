var DocGen;
(function (DocGen) {
    var JbsModal = Core.Web.JbsModal;
    var JbsSubmitter = Core.Web.JbsSubmitter;
    var Preview = (function () {
        function Preview(editor, sandbox) {
            this.editor = editor;
            this.sandbox = sandbox;
            this.previewModal = new JbsModal("previewModal", "Preview", "900", true);
        }
        Preview.prototype.open = function (sourceUrl) {
            var _this = this;
            var formSubmitter = new JbsSubmitter(sourceUrl, "GET", null, "Load data, please wait...", null, null);
            $.when(formSubmitter.request()).then(function (response) {
                var html = Mustache.to_html(_this.editor.getContent(), JSON.parse(response));
                _this.previewModal.open(html, null);
            }).fail(function (error) {
                console.error(error);
            });
        };
        return Preview;
    }());
    DocGen.Preview = Preview;
})(DocGen || (DocGen = {}));
//# sourceMappingURL=preview.js.map