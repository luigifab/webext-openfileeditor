/**
 * Created L/13/11/2023
 * Updated S/28/02/2026
 *
 * Copyright 2023-2025 | Fabrice Creuzot (luigifab) <code~luigifab~fr>
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

function logActionOpenFileEditor(type, text) {
	console[type](text);
	let status = document.getElementById('openfileeditorstatus');
	if (status)
		status.textContent = '(' + type + ') ' + text;
}

// handler for openfileeditor links for webpages
// from webpage to content.js (here) to background.js
function OpenFileEditor(ev) {

	"use strict";
	try {
		let value, link = ev.target;
		while (link.parentNode && (link.nodeName !== 'BODY') && !link.classList.contains('openfileeditor'))
			link = link.parentNode;

		// <a href="[xyz://]{filepath}" class="openfileeditor" [data-line="{linenumb}"]>...</a>
		// <a href="..." class="openfileeditor" data-file="{filepath}" [data-line="{linenumb}"]>...</a>
		if (link.nodeName === 'A') {

			value = link.hasAttribute('data-file') ? link.getAttribute('data-file') : link.href.replace(/^\w+:\/\//, '');
			if (link.hasAttribute('data-line'))
				value += ':' + link.getAttribute('data-line');
		}
		// <span class="openfileeditor" data-file="{filepath}" [data-line="{linenumb}"]>...</span>
		// <span class="openfileeditor" [data-line="{linenumb}"]>{filepath}</span>
		else if (link.nodeName === 'SPAN') {

			if (link.hasAttribute('data-file')) {
				value = link.getAttribute('data-file');
				if (link.hasAttribute('data-line'))
					value += ':' + link.getAttribute('data-line');
			}
			else {
				value = link.textContent.trim();
				if (link.hasAttribute('data-line'))
					value += ':' + link.getAttribute('data-line');
			}
		}
		// <button class="openfileeditor" data-file="{filepath}" [data-line="{linenumb}"]>....</button>
		else if (link.nodeName === 'BUTTON') {

			value = link.getAttribute('data-file');
			if (link.hasAttribute('data-line'))
				value += ':' + link.getAttribute('data-line');
		}

		if (value) {
			let root = (typeof browser == 'object') ? browser : chrome;
			// firefox way
			root.runtime.sendMessage({ action: 'OpenFileEditorCallback', value: value }).then(
				function (value) {
					logActionOpenFileEditor('info', 'OpenFileEditor: ' + value);
				},
				function (value) {
					logActionOpenFileEditor('error', 'OpenFileEditor: ' + value);
				}
			);
		}
	}
	catch (e) {
		logActionOpenFileEditor('error', 'OpenFileEditor: ' + e.message);
	}

	ev.stopPropagation();
}

function initOpenFileEditor(elems) {

	"use strict";
	if (elems === false) {
		let observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.target.id != 'openfileeditorstatus') {
					clearTimeout(delayOpenFileEditor);
					delayOpenFileEditor = setTimeout(function () { initOpenFileEditor(mutation.target); }, 1000);
				}
			});
		});
		observer.observe(document, { subtree: true, childList: true });
	}

	let nb = 0, sentry, btn, fln, lnb;
	sentry = document.querySelectorAll('#blk_router div.traceback li.system-frame');
	elems  = elems || document;

	if (sentry.length > 0) {
		// sentry.io
		sentry.forEach(function (elem) {

			fln = elem.querySelector('code.filename');
			lnb = elem.querySelector('code.lineno');

			if (fln && lnb) {

				fln = fln.textContent.trim();
				lnb = lnb.textContent.trim();

				if ((fln.length > 2) && (fln[0] == '/')) {

					btn = elem.querySelector('button.openfileeditor');
					if (!btn) {
						btn = document.createElement('button');
						btn.setAttribute('type', 'button');
						btn.setAttribute('class', 'openfileeditor openfileeditorok sentry');
						btn.setAttribute('style', 'margin:0 5px; padding:0 2px; border-radius:4px; background-color:lime;');
						btn.appendChild(document.createTextNode('open'));
						elem.querySelector('code.lineno').parentNode.appendChild(btn);
					}

					btn.addEventListener('click', OpenFileEditor);
					btn.setAttribute('data-file', fln);
					btn.setAttribute('data-line', lnb);
					nb++;
				}
			}
		});
	}
	else {
		// world
		elems.querySelectorAll('a.openfileeditor, span.openfileeditor, button.openfileeditor').forEach(function (elem) {

			if (elem.classList.contains('openfileeditorok'))
				elem.removeEventListener('click', OpenFileEditor);
			else
				elem.classList.add('openfileeditorok');

			elem.addEventListener('click', OpenFileEditor);

			if (elem.nodeName === 'A')
				elem.onclick = function () { return false; };
			else if (elem.nodeName === 'SPAN')
				elem.setAttribute('style', 'cursor:pointer; text-decoration:underline;');

			nb++;
		});
	}

	logActionOpenFileEditor('info', 'OpenFileEditor: ' + nb + ' link(s)');
}

let delayOpenFileEditor;
initOpenFileEditor(false);