# run

```bash
docker compose up -d --build
```

# sonar scanner

```bash
docker pull sonarsource/sonar-scanner-cli
```

## note: `wait a minute`, then access `http://localhost:9000`

# start sonar scanner

```bash
docker run \
  --name sonar-scanner \
  -v "D:/Docker/sonarqube/example:/usr/src" \
  sonarsource/sonar-scanner-cli \
  -Dsonar.projectKey=example \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://192.168.1.18:9000 \
  -Dsonar.login=sqp_8ff957692f13616e9306d1375a4fcb97fae35f03
```

`Note`: 192.168.1.18 => ipv4

# if the <sonar-scanner> container exists, delete it with the command:

```bash
docker rm sonar-scanner
```
