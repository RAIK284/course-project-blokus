from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import requests
from board import *

app = Flask(__name__)
CORS(app)

@app.route("/test_route", methods=['POST'])
def test_route():
    data = request.json['data']
    return jsonify(data)

@app.route("/get_board", methods=['GET'])
def get_board():
    return jsonify(board)

if __name__ == '__main__':
    app.run(debug=True)