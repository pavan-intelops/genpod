#  parallelly run the server and client
bash -c "cd socket-server && yarn && yarn dev" &
bash -c "yarn && vite --host --force" &
# run the middleware
bash -c "cd middleware && yarn && yarn dev"
