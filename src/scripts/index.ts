module DocGen {
	export class Index {

		private source: Source;
		private preview: Preview;

		constructor() { this.startObject(); }

		private startObject(): void {
			const scope = this;
			this.source = new Source();

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
					scope.preview = new DocGen.Preview(editor, !(tinymce as any).Env.ie);


					editor.addButton('custompreview', { icon: 'mce-ico mce-i-preview', title: 'Preview', cmd: 'mcepreview' });
					editor.addButton('sourceUrl', { icon: 'mce-ico mce-i-anchor', title: 'Source Url', cmd: 'changeSourceUrl' });
					editor.addButton('customSave', { icon: 'mce-ico mce-i-save', title: 'Save', cmd: 'customSave' });

					editor.addMenuItem('custompreview', { text: 'Preview', cmd: 'mcepreview', context: 'view' });

					editor.addCommand('changeSourceUrl', () => { scope.source.openModal(); });
					editor.addCommand('mcepreview', () => { scope.preview.open(scope.source.sourceUrl); });
					editor.addCommand('customSave', () => { scope.saveContent(editor) });

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


		}

		private saveContent(editor: any): void {
			var object: Object = { content: editor.getContent() };
			localStorage.setItem("editorContent", JSON.stringify(object));
		}
	}
}