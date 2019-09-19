# vuesplit README

This extension split a vue file into 3 files.

The purpose is to view 3 sections of vue files: template/script/style. Because we often jump between those sections, eg. add class name in template section, then create this class in style section. So it may reduce some jumps and some memory burden.

## Features

Make sure you cursor is in the template section. Press shift+ctrl+v [macOS: shift+cmd+v] (the default shortcut key) to split current vue files into three files.

![before](images/before.png)

![after](images/after.png)

## Extension Settings

This extension contributes the following settings:

- `vuesplit.toggleSideBar`: Should toggle the sidebar?
- `vuesplit.repeatCommandToClose`: Repeat the vue.split command to close opened editor groups.

## Known Issues

You should put the cursor in the template section, then execute the command.  
May fix this if many think it's really troublesome.

## Release Notes

### 1.0.1

modify readme.

### 1.0.0

init release.

### For more information

- [github](https://github.com/zjlovezj/vuesplit.git)

**Enjoy!**
