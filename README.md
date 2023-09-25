## Tạo image và container

`docker build -t goal-image .`
`docker images`
`docker run --name goal-app -p 80:80 goal-image`

---

### ngưng chạy container

`docker stop goal-app`
`docker ps -a`
`docker start goal-app`
`docker ps`
