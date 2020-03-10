import sketch from 'sketch'
let Settings = sketch.Settings
// documentation: https://developer.sketchapp.com/reference/api/

const prefString = "tryToFitToPixelBounds"

export function startup() {
    let isPixelFitted = Settings.globalSettingForKey(prefString)
    let pixelFittedMenuItem = getMenuItem()

    if (isPixelFitted) {
        pixelFittedMenuItem.state = NSControlStateValueOn
    } else {
        pixelFittedMenuItem.state = NSControlStateValueOff
    }
}

function getMenuItem() {
    let menu = NSApplication.sharedApplication().mainMenu()
    let pluginsMenu = menu.itemWithTitle('Plugins').submenu()
    let menuItem = pluginsMenu.itemWithTitle('Pixel fitting')
    return menuItem
}

export function toggleSetting() {
    let pixelFittedMenuItem = getMenuItem()

    if (pixelFittedMenuItem.state() == NSControlStateValueOff) {
        Settings.setGlobalSettingForKey(prefString, 1)
        pixelFittedMenuItem.state = NSControlStateValueOn
        sketch.UI.message("✅ Pixel fitting on")
    } else {
        Settings.setGlobalSettingForKey(prefString,0)
        pixelFittedMenuItem.state = NSControlStateValueOff
        sketch.UI.message("🔴 Pixel fitting off")
    }
}
