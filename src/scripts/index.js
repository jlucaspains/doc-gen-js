var DocGen;
(function (DocGen) {
    var Index = (function () {
        function Index() {
            this.startObject();
        }
        Index.prototype.startObject = function () {
            tinymce.init({
                selector: 'textarea',
                height: 500,
                theme: 'modern',
                content_css: ['src/plugins/variable/plugin.css', '//www.tinymce.com/css/codepen.min.css', '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',],
                plugins: [
                    'advlist autolink lists image charmap print custompreview hr pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'nonbreaking save table contextmenu directionality',
                    'paste textcolor colorpicker textpattern imagetools variable code'
                ],
                toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | print | forecolor backcolor | variable',
                toolbar2: 'sourceUrl custompreview',
                image_advtab: true,
            });
        };
        return Index;
    }());
    DocGen.Index = Index;
})(DocGen || (DocGen = {}));
//# sourceMappingURL=index.js.map