// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ife-tool" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ife-tool.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ife-tool!');
	});

  function getModuleInfo(path: string){
    const pathList = path.split('/');
    const idx = pathList.findIndex(o=>o==='module');
    const modulePath = pathList.slice(idx+1, idx+4).join('/');
    const shellPath = pathList.slice(0, idx).join('/');
    return { modulePath, shellPath }; 
  }

  let runModule = vscode.commands.registerCommand('ife-tool.runModule', (uri: vscode.Uri) => {
    const path = uri.path;
    const moduleRe = /.*\/module\/[a-zA-Z-]+\/[a-zA-Z-]+\/[a-zA-Z-]+/;
    if(moduleRe.test(path)){
      const {modulePath} = getModuleInfo(path);
      const terminal = vscode.window.createTerminal('ife-tool');
      terminal.show();
      // terminal.sendText(`cd ${shellPath}`);
      if (process.platform === 'win32') {
        terminal.sendText(`cross-env module=${modulePath} pnpm run dev`); 
      } else {
        terminal.sendText(`module=${modulePath} pnpm run dev`);
      }
    }else {
      vscode.window.showErrorMessage('无效模块');
    }
  });

  let buildModule = vscode.commands.registerCommand('ife-tool.buildModule', (uri: vscode.Uri) => {
    const path = uri.path;
    const moduleRe = /.*\/module\/[a-zA-Z-]+\/[a-zA-Z-]+/;
    if(moduleRe.test(path)){
      const {modulePath} = getModuleInfo(path);
      const terminal = vscode.window.createTerminal('ife-tool');
      terminal.show();
      // terminal.sendText(`cd ${shellPath}`);
      if (process.platform === 'win32') {
        terminal.sendText(`cross-env module=${modulePath} pnpm run dev`); 
      } else {
        terminal.sendText(`module=${modulePath} pnpm run dev`);
      }
    }else {
      vscode.window.showErrorMessage('无效模块');
    }
  });

	context.subscriptions.push(disposable);
  context.subscriptions.push(runModule);
  context.subscriptions.push(buildModule);
}

// This method is called when your extension is deactivated
export function deactivate() {}
