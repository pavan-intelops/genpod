# spin up two terminals and parallelly run the server and client
bash -c "cd socket-server && npx ts-node src/server.ts" &
bash -c "yarn && vite --host --force"
