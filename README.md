Stop russian war. **🇺🇦 Free Ukraine!**

# openfileeditor

Tired of copying and pasting the file path when an error occurs?\
With this browser extension, clic on a link to open the file in your favourite text editor.

WARNING: THIS EXTENSION IS INTENDED FOR WEB DEVELOPERS ONLY

## Extension installation

For **Firefox**, install the bash script:
- Download [openfileeditor.sh](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/openfileeditor.sh) and [openfileeditor.json](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/config-firefox/openfileeditor.json)
- for Linux put them into: _~/.mozilla/native-messaging-hosts/_ ([docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#linux))
- for macOS put them into: _~/Library/Application Support/Mozilla/NativeMessagingHosts/_ ([docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#macos))

For **Chrome**, install the bash script:
- Download [openfileeditor.sh](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/openfileeditor.sh) and [openfileeditor.json](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/config-chrome/openfileeditor.json)
- for Linux put them into: _~/.config/google-chrome/NativeMessagingHosts/_ ([docs](https://developer.chrome.com/docs/extensions/mv3/nativeMessaging/#native-messaging-host-location))
- for macOS put them into: _~/Library/Application Support/Google/Chrome/NativeMessagingHosts/_ ([docs](https://developer.chrome.com/docs/extensions/mv3/nativeMessaging/#native-messaging-host-location))

For **Chromium**, install the bash script:
- Download [openfileeditor.sh](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/openfileeditor.sh) and [openfileeditor.json](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/config-chrome/openfileeditor.json)
- for Linux put them into: _~/.config/chromium/NativeMessagingHosts/_ ([docs](https://developer.chrome.com/docs/extensions/mv3/nativeMessaging/#native-messaging-host-location))
- for macOS put them into: _~/Library/Application Support/Chromium/NativeMessagingHosts/_ ([docs](https://developer.chrome.com/docs/extensions/mv3/nativeMessaging/#native-messaging-host-location))

For **Opera**, install the bash script:
- Download [openfileeditor.sh](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/openfileeditor.sh) and [openfileeditor.json](https://raw.githubusercontent.com/luigifab/webext-openfileeditor/master/config-opera/openfileeditor.json)
- for Linux put them into: _/etc/opt/chrome/native-messaging-hosts/_ ([docs](https://dev.opera.com/extensions/message-passing/#native-messaging-host))
- for macOS put them into: _~/Library/Application Support/Google/Chrome/NativeMessagingHosts/_ ([docs](https://dev.opera.com/extensions/message-passing/#native-messaging-host))

Secondly:
- Update the **path** of _openfileeditor.sh_ in _openfileeditor.json_ (it must exists)
- Be sure that _openfileeditor.sh_ **is executable** (`chmod +x openfileeditor.sh`)
- By default, the script will try to run **geany**, and if it's not available, it will run **xdg-open**, so feel free to update it with your favourite text editor

Thirdly, install the extension:
- [Firefox](https://addons.mozilla.org/firefox/addon/openfileeditor/)
- Chrome/Chromium not yet available
- Edge not yet available
- [Opera](https://addons.opera.com/extensions/details/openfileeditor/)
- Safari not yet available

## Extension upgrade

It's automatic with your browser.

But it's not the case for _openfileeditor.sh_ and _openfileeditor.json_, follow again the installation for them.

## Website update

You must update your web page error, read [demo](https://luigifab.github.io/webext-openfileeditor/index.html) examples.

Compatibility:
- [OpenMage](https://github.com/OpenMage/magento-lts): with [PR 3679](https://github.com/OpenMage/magento-lts/pull/3679)
- [opemange/maillog 5.9.0+](https://www.luigifab.fr/openmage/maillog)
- [opemange/cronlog 4.6.0+](https://www.luigifab.fr/openmage/cronlog)
- [opemange/modules 4.6.0+](https://www.luigifab.fr/openmage/modules)
- [opemange/versioning 4.6.0+](https://www.luigifab.fr/openmage/versioning)
- BlackFire.io: not yet
- Sentry.io: not yet
- GitHub: not yet
- GitLab: not yet

## Usage

Open your favourite text editor, when an error occur in your website, click on the link to open the file.\
Try the [demo](https://luigifab.github.io/webext-openfileeditor/index.html).

There are logs in your browser console (`OpenFileEditor: ...`) and in your tmp directory (`/tmp/openfileeditor.txt`).

Don't be stupid! You must have the file on your computer.

---

If you like, take some of your time to improve some translations, go to https://bit.ly/2HyCCEc.
