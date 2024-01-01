/**
 * Created L/13/11/2023
 * Updated J/16/11/2023
 *
 * Copyright 2023 | Fabrice Creuzot (luigifab) <code~luigifab~fr>
 * https://github.com/luigifab/webext-openfileeditor
 *
 * This program is free software, you can redistribute it or modify
 * it under the terms of the GNU General Public License (GPL) as published
 * by the free software foundation, either version 2 of the license, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but without any warranty, without even the implied warranty of
 * merchantability or fitness for a particular purpose. See the
 * GNU General Public License (GPL) for more details.
 */

// base on https://github.com/mdn/webextensions-examples/tree/main/native-messaging
// openfileeditor.sh is a bash script that open the real text editor
let root = (typeof browser == 'object') ? browser : chrome;

// from webpage to content.js to background.js (here)
root.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'OpenFileEditorCallback') {
		try {
			root.runtime.sendNativeMessage('openfileeditor', { text: '!' + request.value + '|' }).then(
				function (response) {
					sendResponse('OK, file (' + request.value + ') sent to openfileeditor.sh: ' + response);
				},
				function (error) {
					sendResponse('ERROR, file (' + request.value + '), ' + error);
				}
			);
		}
		catch (e) {
			sendResponse('ERROR, file (' + request.value + '), ' + e.message);
		}
		return true;
	}
});