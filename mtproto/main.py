import json
import io
import threading
from pyrogram import Client, idle
from flask import Flask, Response, request

API_ID = 13251350  # api_id
API_HASH = "<API_HASH-HERE>"
BOT_TOKEN = "<TOKEN-HERE>"
CHAT_ID = -100123456789  # chat_id

app = Flask(__name__)

bot = Client(
    "CDN", API_ID, API_HASH,
    bot_token=BOT_TOKEN, # You can use phone_number
    max_concurrent_transmissions=5,
    no_updates=True,
    in_memory=False
)

@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        file = request.files.get("file")
        if not file:
            return Response(
                json.dumps({"error": True, "reason": "No file selected"}),
                mimetype="application/json",
                status=400
            )
        memory_file = io.BytesIO()
        memory_file.write(file.stream.read())
        memory_file.name = file.filename
        # file size limit is 2GB , 4GB for premium users
        sent = bot.send_document(
            chat_id=CHAT_ID,
            document=memory_file,
        )
        return Response(
            json.dumps({"file_id": sent.document.file_id, "mime_type": sent.document.mime_type}),
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
