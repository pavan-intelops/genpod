#!/bin/bash

# Array of ports to kill
ports=(3000 3001 3002 3003) # Replace with the ports you want to kill

kill_ports() {
  for port in "${ports[@]}"; do
    # Get the PID of the process running on the port
    if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
      # Unix-based systems (Linux, macOS)
      pid=$(lsof -t -i:$port)
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
      # Windows
      pid=$(netstat -ano | findstr :$port | awk '{print $5}')
    else
      echo "Unsupported OS"
      exit 1
    fi

    # Kill the process if PID is found
    if [[ -n "$pid" ]]; then
      echo "Killing process $pid on port $port"
      kill -9 $pid
    else
      echo "No process found on port $port"
    fi
  done
}

kill_ports
