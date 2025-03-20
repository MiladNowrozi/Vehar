cd /root/home/Vehar
git pull origin master
npm --prefix ./back_end/ i
pm2 delete 0
pm2 start ./back_end/index.js
rm -rf ./back_end/node_modules

npm --prefix ./front_end i
npm --prefix ./front_end run build
rm -rf /usr/share/nginx/html/*
mv ./front_end/build/* /usr/share/nginx/html/
rm -rf ./front_end/build
rm -rf ./front_end/node_modules
sudo systemctl restart nginx