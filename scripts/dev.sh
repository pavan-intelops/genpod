#  parallelly run the server and client
bash -c "cd socket-server && yarn && yarn dev" &
bash -c "yarn && vite --host --force" &
# run the file-server
bash -c "cd file-server && yarn && yarn dev"
