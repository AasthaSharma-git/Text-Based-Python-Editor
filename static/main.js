// static/main.js
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
require(['vs/editor/editor.main'], function () {
    window.editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: '# Write your Python code here\nprint("Hello, World!")',
        language: 'python',
        theme: 'vs-dark', // Default theme
        fontSize: 14, // Default font size
        minimap: { enabled: true },
        automaticLayout: true,
        lineNumbers: 'on',
        wordWrap: 'on',
    });
});

// static/main.js

// Function to open settings modal
function openSettings() {
    document.getElementById('settings-modal').style.display = "block";
}

// Function to close settings modal
function closeSettings() {
    document.getElementById('settings-modal').style.display = "none";
}

// Function to change theme
function changeTheme(event) {
    const selectedTheme = event.target.value;
    monaco.editor.setTheme(selectedTheme);
}

// Function to change font size
function changeFontSize(event) {
    const selectedFontSize = event.target.value;
    editor.updateOptions({ fontSize: selectedFontSize });
}

// Function to run code
async function runCode() {
    const code = editor.getValue();
    const outputElement = document.getElementById('output');

    // Clear the output area before running the new code
    outputElement.innerText = "Running code...";

    try {
        const response = await fetch('/run_code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        });
        const result = await response.json();

        // Show the output or errors
        outputElement.innerText = result.output || result.errors || 'No output generated.';
    } catch (error) {
        outputElement.innerText = 'Error connecting to server.';
    }
}
