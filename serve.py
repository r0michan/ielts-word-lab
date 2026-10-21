"""Local server for IELTS単語ラボ. Tells the browser to re-check files on every load so updates show at once."""
import http.server, os, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
print(f'IELTS単語ラボ: http://localhost:{port}/  (このウィンドウを閉じると終了します)')
http.server.ThreadingHTTPServer(('', port), Handler).serve_forever()
