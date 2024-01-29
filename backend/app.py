from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

@app.route("/test_route", methods=['POST'])
def test_route():
    data = request.json['data']
    return jsonify(data)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)