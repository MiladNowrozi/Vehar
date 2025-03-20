cd /root/home/Vehar
git pull origin master
pm2 delete 0
rm -rf ./back_end/node_modules
npm --prefix ./back_end/ i
cd ./back_end && pm2 start index.js && cd ..

npm --prefix ./front_end i
npm --prefix ./front_end run build
rm -rf /usr/share/nginx/html/*
mv ./front_end/build/* /usr/share/nginx/html/
rm -rf ./front_end/build
rm -rf ./front_end/node_modules
sudo systemctl restart nginx