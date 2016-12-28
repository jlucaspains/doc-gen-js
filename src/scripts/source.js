var DocGen;
(function (DocGen) {
    var Source = (function () {
        function Source(sourceUrl) {
            this.sourceUrl = sourceUrl;
            //this.startObject();
        }
        Source.prototype.openModal = function () {
            alert("entrou");
        };
        return Source;
    }());
    DocGen.Source = Source;
})(DocGen || (DocGen = {}));
//# sourceMappingURL=source.js.map