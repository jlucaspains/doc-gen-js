/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('custompreview', function (editor) {
	var source = new DocGen.Source();
	var preview = new DocGen.Preview(editor, !tinymce.Env.ie);

	editor.addButton('custompreview', { icon: 'mce-ico mce-i-preview', title: 'Preview', cmd: 'mcepreview' });
	editor.addButton('sourceUrl', { icon: 'mce-ico mce-i-anchor', title: 'Source Url', cmd: 'changeSourceUrl' });
	editor.addMenuItem('custompreview', { text: 'Preview', cmd: 'mcepreview', context: 'view' });

	editor.addCommand('changeSourceUrl', function () { source.openModal(); });
	editor.addCommand('mcepreview', function () { preview.open(source.sourceUrl); });
});