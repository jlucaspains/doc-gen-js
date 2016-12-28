module DocGen {
    export class Index {

        constructor() {
            this.startObject();
        }

        private startObject(): void {
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
                // variable_mapper: {
                //     username: 'Username',
                //     phone: 'Phone',
                //     community_name: 'Community name',
                //     email: 'Email address',
                //     sender: 'Sender name',
                //     account_id: 'Account ID'
                // },
                // setup: function (ed) {
                //     ed.execCommand('mceFullScreen');
                //     // ed.on('load',function(e){
                //     //     ed.execCommand('fullscreen');
                //     // });

                //     // (window as any).tester = ed;
                //     // ed.addButton('variable', {
                //     //     title: 'Variable',
                //     //     text: 'Insert variable',
                //     //     onclick: function () {
                //     //         ed.plugins.variable.addVariable('account_id');
                //     //     }
                //     // });
                //     // ed.on('variableClick', function (e) { console.log('click', e); });
                // },
            });
        }

    }
}