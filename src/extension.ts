// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "xc-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('xc-ext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from xc-ext!');
	});

  function getModuleInfo(path: string){
    const pathList = path.split('/');
    const idx = pathList.findIndex(o=>o==='modules');
    const modulePath = pathList.slice(idx, idx+3).join('/');
    const shellPath = pathList.slice(0, idx).join('/');
    return { modulePath, shellPath }; 
  }

  let runModule = vscode.commands.registerCommand('xc-ext.runModule', (uri: vscode.Uri) => {
    console.log(uri);
    const path = uri.path;
    const moduleRe = /.*\/modules\/[a-zA-Z-]+\/[a-zA-Z-]+/;
    if(moduleRe.test(path)){
      const {modulePath} = getModuleInfo(path);
      const terminal = vscode.window.createTerminal('xc-ext');
      terminal.show();
      // terminal.sendText(`cd ${shellPath}`);
      terminal.sendText(`npm run dev -m=${modulePath}`);
    }else {
      vscode.window.showErrorMessage('无效模块');
    }
  });

  let buildModule = vscode.commands.registerCommand('xc-ext.buildModule', (uri: vscode.Uri) => {
    console.log(uri);
    const path = uri.path;
    const moduleRe = /.*\/modules\/[a-zA-Z-]+\/[a-zA-Z-]+/;
    if(moduleRe.test(path)){
      const {modulePath} = getModuleInfo(path);
      const terminal = vscode.window.createTerminal('xc-ext');
      terminal.show();
      // terminal.sendText(`cd ${shellPath}`);
      terminal.sendText(`npm run build -m=${modulePath}`);
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