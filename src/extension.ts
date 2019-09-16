// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const conf = vscode.workspace.getConfiguration("vuesplit");
// console.log(conf);
const toggleSideBar = conf.get("toggleSideBar");
const repeatCommandToClose = conf.get("repeatCommandToClose");

let exeCount = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vuesplit" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.vuesplit",
    async () => {
      exeCount++;

      if (repeatCommandToClose && exeCount % 2 === 0) {
        await vscode.commands.executeCommand(
          "workbench.action.focusFirstEditorGroup"
        );
        await vscode.commands.executeCommand(
          "workbench.action.closeEditorsInOtherGroups"
        );
        if (toggleSideBar) {
          await vscode.commands.executeCommand(
            "workbench.action.toggleSidebarVisibility"
          );
        }
        return;
      }
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      // vscode.window.showInformationMessage("Hello vscode!");
      // vscode.commands.executeCommand("editor.action.addCommentLine");
      // vscode.commands.executeCommand("editor.fold");
      // vscode.commands.executeCommand("revealLine", { lineNumber: 10 });
      // vscode.commands.executeCommand("editorScroll", { to: "down" });
      // vscode.commands.executeCommand("vscode.setEditorLayout", {
      //   orientation: 0,
      //   groups: [
      //     { groups: [{}, {}], size: 0.5 },
      //     { groups: [{}, {}], size: 0.5 }
      //   ]
      // });

      if (toggleSideBar) {
        await vscode.commands.executeCommand(
          "workbench.action.toggleSidebarVisibility"
        );
      }
      await vscode.commands.executeCommand(
        "workbench.action.focusFirstEditorGroup"
      );
      // await vscode.commands.executeCommand("editor.unfoldAll");
      await vscode.commands.executeCommand("editor.foldAllMarkerRegions");
      await vscode.commands.executeCommand("workbench.action.splitEditor");
      await vscode.commands.executeCommand("workbench.action.splitEditor");

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
      // vscode.commands.executeCommand(
      //   "workbench.action.toggleSidebarVisibility"
      // );
      // vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup");
      // vscode.commands.executeCommand(
      //   "workbench.action.closeEditorsInOtherGroups"
      // );
      // vscode.commands.executeCommand("workbench.action.gotoSymbol", "script"); // fail. no args
      // vscode.commands.executeCommand("editor.foldAll");
      await vscode.commands.executeCommand(
        "workbench.action.focusFirstEditorGroup"
      );
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 200)
      );
      // await vscode.commands.executeCommand("editor.foldLevel1");
      // await new Promise(resolve =>
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000)
      // );
      // console.log(vscode.window.activeTextEditor.document.getText());
      // console.log(vscode.window.);
      // const docText = vscode.window.activeTextEditor.document.getText();
      await unfoldTag("template");
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 200)
      );
      await vscode.commands.executeCommand("editor.unfoldRecursively");

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 100)
      );
      await vscode.commands.executeCommand(
        "workbench.action.focusSecondEditorGroup"
      );
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 200)
      );
      // await vscode.commands.executeCommand("editor.foldLevel1");
      // await new Promise(resolve =>
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000)
      // );
      await unfoldTag("script");
      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 200)
      );
      await vscode.commands.executeCommand("editor.unfoldRecursively");

      // await new Promise(resolve =>
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000)
      // );
      await vscode.commands.executeCommand(
        "workbench.action.focusThirdEditorGroup"
      );
      // await vscode.commands.executeCommand("editor.foldLevel1");
      await unfoldTag("style");
      await vscode.commands.executeCommand("editor.unfoldRecursively");

      await vscode.commands.executeCommand(
        "workbench.action.focusFirstEditorGroup"
      );
    }
  );

  context.subscriptions.push(disposable);
}

async function unfoldTag(tag: string) {
  await vscode.commands.executeCommand("editorScroll", {
    to: "up",
    by: "page",
    value: 100
  });
  // await vscode.commands.executeCommand("cursorMove", {
  //   to: "up",
  //   by: "line",
  //   value: 0
  // });
  const doc = vscode.window.activeTextEditor.document;
  if (!doc) {
    console.log("error: no doc", doc);
  } else {
    console.log(doc);
  }
  const docLineCount = doc.lineCount;
  let desireLine = 0;
  for (let i = 0; i < docLineCount; i++) {
    const line = doc.lineAt(i).text;
    if (line.startsWith("<" + tag)) {
      desireLine = i;
      break;
    }
  }
  console.log("desire line", desireLine);
  return vscode.commands.executeCommand("cursorMove", {
    to: "down",
    by: "line",
    value: desireLine
  });
}
// this method is called when your extension is deactivated
export function deactivate() {}
