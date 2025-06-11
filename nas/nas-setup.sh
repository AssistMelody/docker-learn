mkdir -p postgres/{db,run}
mkdir -p emby/{config,media}
chmod -R 777 postgres/run  # 确保有足够权限

docker compose -f nas.yml create

docker compose -f nas.yml start

while [ ! -d "./emby/config/plugins/" ]; do
    sleep 1
done

cp ./MetaTube.dll ./emby/config/plugins/

docker container restart emby-container
