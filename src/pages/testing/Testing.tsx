import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { GLOBAL_CONSTANTS } from 'src/constants.global';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const socket = io(GLOBAL_CONSTANTS.socketUrl, {});

const TerminalComponent = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    // Initialize terminal
    terminal.current = new Terminal({
      cursorBlink: true
    });
    terminal.current.loadAddon(fitAddon.current);
    if (!terminalRef.current) return;
    terminal.current.open(terminalRef.current);
    fitAddon.current.fit();

    // Socket.IO data handling
    socket.on('output', data => {
      console.log('data: ', data);
      if (!terminal.current) return;
      terminal.current.write(data);
    });

    terminal.current.onData(data => {
      console.log('data: ', data);
      socket.emit('input', data);
    });

    return () => {
      if (!terminal.current) return;
      terminal.current.dispose();
      socket.off('output');
    };
  }, []);

  // Fit terminal on resize
  useEffect(() => {
    const resizeListener = () => {
      fitAddon.current.fit();
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '300px' }} />;
};

export default TerminalComponent;
