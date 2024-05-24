# spin up two terminals and parallelly run the server and client
bash -c "cd socket-server && npx ts-node src/server.ts" &
# ping the socket server to make sure it's up and then spin up frontend
bash -c "yarn && vite --host --force"
