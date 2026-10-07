from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import webbrowser, threading

ROOT = Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(ROOT),**kwargs)
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()
    def log_message(self, format, *args):
        pass

def open_browser():
    webbrowser.open("http://127.0.0.1:8770")

if __name__ == "__main__":
    threading.Timer(0.8, open_browser).start()
    print("Easy Pay – Safe Pay running at http://127.0.0.1:8770")
    ThreadingHTTPServer(("127.0.0.1",8770),Handler).serve_forever()
