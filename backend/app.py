from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/test", methods=['GET'])
def test():
    return jsonify('test')

if __name__ == '__main__':
    app.run(debug=True)