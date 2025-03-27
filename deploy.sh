cd /root/home/Vehar
sudo systemctl stop nginx
git pull origin master
cd ./back_end
pm2 delete 0
rm -rf ./node_modules
npm i
pm2 start index.js
cd ..

cd ./front_end
npm i
npm run build
rm -rf /usr/share/nginx/html/*
mv ./build/* /usr/share/nginx/html/
rm -rf ./build
rm -rf ./node_modules
sudo systemctl start nginx