var DocGen;
(function (DocGen) {
    var JbsModal = Core.Web.JbsModal;
    var Source = (function () {
        function Source() {
            this.sourceUrl = '';
            this.sourceUrl = 'https://raw.githubusercontent.com/jlucaspains/doc-gen-js/master/example.json';
            this.changeSourceUrlModal = new JbsModal("changeSourceUrlModal", "Change Source Url", "500", true);
            this.bindingsElementsFromDom();
        }
        Source.prototype.bindingsElementsFromDom = function () {
            var _this = this;
            $(document).on("click", "#btn-changeSourceUrl-save", function () { _this.saveSourceUrl(); });
        };
        Source.prototype.openModal = function () {
            var html = "  <form id=\"frmChangeSourceUrl\">\n                                <div class=\"row\">\n                                    <div class=\"form-group col-md-12\">\n                                        <label>Url</label>\n                                        <input id=\"txtSouceUrl\" class=\"form-control\" type=\"text\" value=\"" + this.sourceUrl + "\">\n                                    </div>\n                                </div>\n                            </form>";
            var buttons = "<button id=\"btn-changeSourceUrl-save\" class=\"btn btn-primary\" type=\"button\"><span class=\"glyphicon glyphicon-save\"></span> Save</button>";
            this.changeSourceUrlModal.open(html, buttons);
        };
        Source.prototype.saveSourceUrl = function () {
            this.sourceUrl = $("#frmChangeSourceUrl #txtSouceUrl").val();
            this.changeSourceUrlModal.close();
        };
        return Source;
    }());
    DocGen.Source = Source;
})(DocGen || (DocGen = {}));
//# sourceMappingURL=source.js.map