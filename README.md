1. **Clone the Repository**

   ```sh
   git clone https://github.com/TeaByte/mt-uploader.git
   cd mt-uploader
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Start MTPROTO API**

   ```sh
   # Don't forget to put telegram bot-token, etc.. in ( main.py )
   cd mtproto
   py main.py
   ```

4. **Make `.env` File**

   ```env
   # Telegram MTPROTO Flask API endpoint
   PYTHON_MTPROTO_API_URL=http://127.0.0.1:80

   # Database
   DATABASE_URL=postgres://....neon.tech/main
   SHADOW_DATABASE_URL=postgres://....neon.tech/shadow

   # Google Recaptcha V2
   RECAPTCHA_SECRET_KEY=...

   ```

   Neon PostgreSQL: https://console.neon.tech

5. **Start the Development Server**

   ```sh
   npm run dev
   ```

##

![photo](https://i.ibb.co/826bBQW/image.png)
