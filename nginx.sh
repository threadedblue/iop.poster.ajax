HTTP_ROOT=`pwd`
echo HTTP_ROOT=$HTTP_ROOT
/usr/bin/sed 's%{{HTTP_ROOT}}%'"${HTTP_ROOT}"'%' <nginx.tpl > nginx.conf
sudo nginx -c $HTTP_ROOT/nginx.conf