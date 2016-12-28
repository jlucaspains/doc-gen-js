var DocGen;
(function (DocGen) {
    var Index = (function () {
        function Index() {
            this.startObject();
        }
        Index.prototype.startObject = function () {
            var scope = this;
            this.source = new DocGen.Source();
            var contentSave = localStorage.getItem("editorContent");
            if (contentSave !== null) {
                $("textarea").html(JSON.parse(contentSave).content);
            }
            var tinymceEditor = tinymce.init({
                selector: 'textarea',
                height: 500,
                theme: 'modern',
                content_css: ['src/plugins/variable/plugin.css', '//www.tinymce.com/css/codepen.min.css', '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',],
                plugins: [
                    'advlist autolink lists image charmap print hr pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'nonbreaking save table contextmenu directionality',
                    'paste textcolor colorpicker textpattern imagetools variable code'
                ],
                toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | print | forecolor backcolor | variable',
                toolbar2: 'sourceUrl custompreview customSave',
                image_advtab: true,
                // variable_mapper: {
                //     username: 'Username',
                //     phone: 'Phone',
                //     community_name: 'Community name',
                //     email: 'Email address',
                //     sender: 'Sender name',
                //     account_id: 'Account ID'
                // },
                setup: function (editor) {
                    scope.preview = new DocGen.Preview(editor, !tinymce.Env.ie);
                    editor.addButton('custompreview', { icon: 'mce-ico mce-i-preview', title: 'Preview', cmd: 'mcepreview' });
                    editor.addButton('sourceUrl', { icon: 'mce-ico mce-i-anchor', title: 'Source Url', cmd: 'changeSourceUrl' });
                    editor.addButton('customSave', { icon: 'mce-ico mce-i-save', title: 'Save', cmd: 'customSave' });
                    editor.addMenuItem('custompreview', { text: 'Preview', cmd: 'mcepreview', context: 'view' });
                    editor.addCommand('changeSourceUrl', function () { scope.source.openModal(); });
                    editor.addCommand('mcepreview', function () { scope.preview.open(scope.source.sourceUrl); });
                    editor.addCommand('customSave', function () { scope.saveContent(editor); });
                    //ed.execCommand('mceFullScreen');
                    // ed.on('load',function(e){
                    //     ed.execCommand('fullscreen');
                    // });
                    // (window as any).tester = ed;
                    // ed.addButton('variable', {
                    //     title: 'Variable',
                    //     text: 'Insert variable',
                    //     onclick: function () {
                    //         ed.plugins.variable.addVariable('account_id');
                    //     }
                    // });
                    // ed.on('variableClick', function (e) { console.log('click', e); });
                },
            });
        };
        Index.prototype.saveContent = function (editor) {
            var object = { content: editor.getContent() };
            localStorage.setItem("editorContent", JSON.stringify(object));
        };
        return Index;
    }());
    DocGen.Index = Index;
})(DocGen || (DocGen = {}));
//# sourceMappingURL=index.js.map