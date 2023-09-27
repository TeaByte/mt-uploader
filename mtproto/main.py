import json
import os
import threading
from pyrogram import Client, idle
from flask import Flask, Response, request

API_ID = 1
API_HASH = "API_HASH_HERE"
BOT_TOKEN = "TOKEN_HAERE"
CHAT_ID = -1

app = Flask(__name__)
bot = Client(
    "CDN", API_ID, API_HASH,
    bot_token=BOT_TOKEN,
    max_concurrent_transmissions=5,
    no_updates=True,
    in_memory=True
)


@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        file = request.files.get("file")
        if not file:
            return Response(
                {"error": True, "reason": "No file selected"},
                mimetype="application/json",
                status=400
            )

        file.save(file.filename)
        sent = bot.send_document(
            chat_id=CHAT_ID,
            document=file.filename,
        )
        print(file.filename)
        os.remove(file.filename)

        return Response(
            json.dumps({"file_id": sent.document.file_id,
                        "mime_type": sent.document.mime_type}),
            mimetype="application/json",
            status=200
        )

    else:
        return Response(
            json.dumps({"error": True, "reason": "Invalid method"}),
            mimetype="application/json",
            status=400
        )


@app.route("/get", methods=["POST", "GET"])
def get():

    if request.method == "POST":
        file_id = request.form.get("file_id")

    elif request.method == "GET":
        file_id = request.args.get("file_id")

    else:
        return Response(
            json.dumps({"error": True, "reason": "Invalid method"}),
            mimetype="application/json",
            status=400
        )

    if not file_id:
        return Response(
            json.dumps({"error": True, "reason": "file_id is required"}),
            mimetype="application/json",
            status=400
        )

    else:
        try:
            for chunk in bot.stream_media(message=file_id):
                return Response(
                    chunk,
                    mimetype="application/octet-stream",
                    status=200
                )
        except Exception as e:
            return Response(
                json.dumps({"error": True, "reason": str(e)}),
                mimetype="application/json",
                status=400
            )


@app.route("/test")
def test():
    return Response(bot.get_me().__str__(), mimetype="application/json")


bot.start()
threading.Thread(target=app.run, args=("0.0.0.0", 80,), daemon=True).start()
idle()
