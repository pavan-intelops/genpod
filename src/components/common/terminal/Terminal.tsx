import { useEffect, useRef } from 'react';
import socket from 'src/utils/socket';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    const initializeTerminal = () => {
      terminal.current = new Terminal({
        cursorBlink: true,
        theme: {
          foreground: '#f8f8f2',
          background: '#1e1f29',
          cursor: '#bbbbbb',

          black: '#000000',
          brightBlack: '#555555',

          red: '#ff5555',
          brightRed: '#ff5555',

          green: '#50fa7b',
          brightGreen: '#50fa7b',

          yellow: '#f1fa8c',
          brightYellow: '#f1fa8c',

          blue: '#bd93f9',
          brightBlue: '#bd93f9',

          magenta: '#ff79c6',
          brightMagenta: '#ff79c6',

          cyan: '#8be9fd',
          brightCyan: '#8be9fd',

          white: '#bbbbbb',
          brightWhite: '#ffffff'
        }
      });

      terminal.current.loadAddon(fitAddon.current);
      if (!terminalRef.current) return;
      terminal.current.open(terminalRef.current);
      fitAddon.current.fit();

      // Socket.IO data handling
      socket.on('output', data => {
        if (!terminal.current) return;
        terminal.current.write(data);
      });

      terminal.current.onData(data => {
        socket.emit('input', data);
      });
    };

    const timeoutId = setTimeout(initializeTerminal, 0);

    return () => {
      clearTimeout(timeoutId);
      if (terminal.current) {
        terminal.current.dispose();
      }
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
  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default TerminalComponent;
