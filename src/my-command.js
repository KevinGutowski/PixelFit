import sketch from 'sketch'
let Settings = sketch.Settings
// documentation: https://developer.sketchapp.com/reference/api/

const prefString = "tryToFitToPixelBounds"

export function startup() {
    console.log('PixelFitted | SKETCH STARTING UP')
    let isPixelFitted = Settings.globalSettingForKey(prefString)
    let pixelFittedMenuItem = getMenuItem()

    console.log('PixelFitted | 1 isPixelFitted: ' + isPixelFitted)
    try {
        console.log('PixelFitted | 1' + pixelFittedMenuItem.description())
    } catch(e) {
        console.log('PixelFitted | 1 ERROR')
        console.log(e)
    }

    if (!pixelFittedMenuItem) {
        console.log("PixelFitted | No menu item")
        setTimeout(
            function(){
                console.log('PixelFitted | How about now?')
                console.log('PixelFitted | 2 isPixelFitted: ' + isPixelFitted)
                isPixelFitted = Settings.globalSettingForKey(prefString)
                pixelFittedMenuItem = getMenuItem()
                try {
                    console.log('PixelFitted | 3' + pixelFittedMenuItem.description())
                } catch (e) {
                    console.log('PixelFitted | 3 ERROR')
                    console.log(e)
                }
                console.log('PixelFitted | 3 isPixelFitted: ' + isPixelFitted)
                setMenuItemState(pixelFittedMenuItem, isPixelFitted)
            }, 1000);
    } else {
        setMenuItemState(pixelFittedMenuItem, isPixelFitted)
    }
}

function setMenuItemState(menuItem, settingState) {
    console.log('PixelFitted | Setting state: ' + settingState)
    console.log('PixelFitted | menuItem: ' + menuItem.description())
    console.log('PixelFitted | menuItemState: ' + menuItem.state())
    if (settingState) {
        console.log("PixelFitted | Setting On state")
        try {
            menuItem.state = NSControlStateValueOn
            let menu = NSApplication.sharedApplication().mainMenu()
            let pluginsMenu = menu.itemWithTitle('Plugins').submenu()
            menu.update()
            pluginsMenu.update()
            NSApplication.sharedApplication().mainMenu().update()
        } catch (e) {
             console.log("PixelFitted | couldn't set state")
            console.log(e)
        }
        console.log("PixelFitted | MenuItem State After: " + menuItem.state())
    } else {
        console.log("PixelFitted | Setting Off state")
        menuItem.state = NSControlStateValueOff
    }
}

function getMenuItem() {
    let menu = NSApplication.sharedApplication().mainMenu()
    let pluginsMenu = menu.itemWithTitle('Plugins').submenu()
    let menuItem = pluginsMenu.itemWithTitle('Pixel fitting')
    console.log('PixelFitted | getMenuItem: ' + menuItem)
    return menuItem
}

export function toggleSetting() {
    let pixelFittedMenuItem = getMenuItem()

    if (pixelFittedMenuItem.state() == NSControlStateValueOff) {
        Settings.setGlobalSettingForKey(prefString, 1)
        pixelFittedMenuItem.state = NSControlStateValueOn
        try {
            sketch.UI.message("✅ Pixel fitting on")
        } catch {
            // likely no document open
        }
    } else {
        Settings.setGlobalSettingForKey(prefString,0)
        pixelFittedMenuItem.state = NSControlStateValueOff
        try {
            sketch.UI.message("🔴 Pixel fitting off")
        } catch {
            // likely no document open
        }
    }
}
