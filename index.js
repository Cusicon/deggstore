const { app, BrowserWindow, webFrame } = require("electron");
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
	// require express via express_app module
	// require("./server/app");
	// Create the browser window.
	win = new BrowserWindow({
		width: 1000,
		height: 700,
		minWidth: 900,
		minHeight: 600,
		titleBarStyle: "hidden",
		title: "Degg Store",
		icon: "res/images/logo/degg.png",
		fullscreenable: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.resolve(path.join(__dirname, "/res/js/preload.js"))
		}
	});
	win.once("ready-to-show", () => {
		win.webContents.setZoomFactor(1.0);
		win.show();
	});
	// Loads the flash screen; later the main server will be loaded implicitly
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "res/flash.html"),
			protocol: "file:",
			slashes: true
		})
	);
	win.focus();

	// Open the DevTools.
	// win.webContents.openDevTools()

	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
