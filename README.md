pm2 start npm --name "croco" -- start
pm2 start service.js --name "server"

pm2 monit


sudo fuser -k 5000/tcp  # Cierra el puerto 5000
sudo fuser -k 3000/tcp  # Cierra el puerto 3000

pm2 start npm --name "croco" -- start
gunicorn -w 4 -b 0.0.0.0:5000 --name "server" --timeout 900 main:app

gunicorn -w 4 -b 0.0.0.0:5000 --timeout 900 /var/www/main:app

pm2 start nodemon --name "server" --watch service.js -- -e js,jsx,json

pm2 start /var/www/main.py --name "my-app" --interpreter python3 --watch