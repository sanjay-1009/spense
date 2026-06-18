from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent / 'public'
html_files = list(root.glob('*.html'))
head_re = re.compile(r'(?i)<head\b[^>]*>')
manifest_re = re.compile(r'(?i)<link\s+rel=["\']manifest["\']\s+href=["\']manifest\.json["\']\s*/?>')
theme_re = re.compile(r'(?i)<meta\s+name=["\']theme-color["\']\s+content=["\']#206bc4["\']\s*/?>')
icon_re = re.compile(r'(?i)<link\s+rel=["\']icon["\']\s+href=["\']images/logo\.png["\']\s*/?>')
apple_re = re.compile(r'(?i)<link\s+rel=["\']apple-touch-icon["\']\s+href=["\']images/logo\.png["\']\s*/?>')
body_close_re = re.compile(r'(?i)</body>')

inject = (
    '<link rel="manifest" href="manifest.json">\n'
    '<link rel="icon" href="images/logo.png">\n'
    '<link rel="apple-touch-icon" href="images/logo.png">\n'
    '<meta name="theme-color" content="#206bc4">'
)

for path in sorted(html_files):
    text = path.read_text(encoding='utf-8')
    text = manifest_re.sub('', text)
    text = theme_re.sub('', text)
    text = icon_re.sub('', text)
    text = apple_re.sub('', text)
    text = re.sub(r'(?m)^[ \t]*\n', '', text)
    if head_re.search(text):
        text = head_re.sub(lambda m: m.group(0) + '\n' + inject + '\n', text, count=1)
    if 'js/sw-register.js' not in text:
        if body_close_re.search(text):
            text = body_close_re.sub('<script src="js/sw-register.js"></script>\n</body>', text, count=1)
        else:
            text = text + '\n<script src="js/sw-register.js"></script>\n'
    path.write_text(text, encoding='utf-8')
