# app.py
from flask import Flask, request, jsonify, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    # Render the HTML template with the Monaco editor interface
    return render_template('index.html')

@app.route('/run_code', methods=['POST'])
def run_code():
    code = request.json.get('code')
    try:
        # Run the Python code and capture output
        result = subprocess.run(
            ['python', '-c', code], capture_output=True, text=True, timeout=5
        )
        return jsonify({
            'output': result.stdout,
            'errors': result.stderr
        })
    except subprocess.TimeoutExpired:
        return jsonify({'output': '', 'errors': 'Execution timed out.'})

if __name__ == '__main__':
    app.run(debug=True)
