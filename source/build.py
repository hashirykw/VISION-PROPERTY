#!/usr/bin/env python3
"""Assemble self-contained pages: each output .html has all CSS + JS inlined.
Run from anywhere:  python3 source/build.py"""
import pathlib, re

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent
CSS = (SRC / 'shared.css').read_text()
JS = (SRC / 'data.js').read_text() + '\n' + (SRC / 'engine.js').read_text()

NAV = [('index', 'index.html', 'Home'), ('projects', 'projects.html', 'Projects'), ('about', 'about.html', 'About'), ('contact', 'contact.html', 'Contact')]
def sv(p, fill=False):
    a = 'fill="currentColor"' if fill else 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
    return f'<svg viewBox="0 0 24 24" {a} aria-hidden="true">{p}</svg>'
IC = {
 'sun': '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 'moon': '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 'arrow': sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
 'chat': '<svg class="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
 'x': '<svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 'send': sv('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>'),
 'ig': sv('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>'),
 'fb': sv('<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.6-4h-4.1V8.8c0-.5.3-.8.5-.8z"/>', True),
 'yt': sv('<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.6 12l-5.8 3.1z"/>', True),
}

def chrome_top():
    links = ''.join(f'<a href="{h}" data-p="{k}">{t}</a>' for k, h, t in NAV)
    dl = ''.join(f'<a class="dl" href="{h}" data-p="{k}">{t}{IC["arrow"]}</a>' for k, h, t in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="amb" aria-hidden="true"><i></i><i></i><i></i></div><canvas id="bg3d" aria-hidden="true"></canvas><div class="veil" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div>
<div class="loader" aria-hidden="true"><div class="mk"></div><div class="bar"><i></i></div></div>
<div id="progress" aria-hidden="true"></div>
<header class="nav">
  <a class="brand" href="index.html" aria-label="Vision Properties, home"><span class="mk" aria-hidden="true"></span><span class="wm"><b>VISION</b><small>PROPERTIES</small></span></a>
  <nav class="menu" aria-label="Main"><span class="ind" aria-hidden="true"></span>{links}</nav>
  <div class="nav-r">
    <button class="ib theme" id="themeBtn" aria-label="Switch between light and dark theme">{IC["moon"]}{IC["sun"]}</button>
    <a class="btn btn-primary btn-sm cta-full" href="contact.html#enquire" data-i="arrow">Enquire</a>
    <button class="ib" id="menuBtn" aria-label="Menu" aria-expanded="false" aria-controls="drop"><i></i><i></i></button>
  </div>
</header>
<div class="drop" id="drop">
  <nav aria-label="Mobile">{dl}</nav>
  <div class="dc"><a href="tel:+923302152999"><b>Call</b><span>0330 2152999</span></a><a href="https://wa.me/923302152999" target="_blank" rel="noopener"><b>WhatsApp</b><span>Message us</span></a></div>
</div>
'''

def chrome_bottom():
    nav = ''.join(f'<a href="{h}">{t}</a>' for k, h, t in NAV)
    return f'''<footer class="foot">
  <div class="wrap"><div class="foot-card glass">
    <div class="foot-top">
      <div><div class="foot-logo" role="img" aria-label="Vision Properties logo"></div><p class="foot-say">A step taken today is a <span>vision</span> for tomorrow.</p></div>
      <div class="foot-lines">
        <a class="big" href="tel:+923302152999">0330 2152999</a>
        <a class="big" href="mailto:info@visionproperties.pk">info@visionproperties.pk</a>
        <p>B-115, Block H, Main Food Street, North Nazimabad, Karachi. Also on 0322 2710896 and 0330 2162999.</p>
        <a class="btn btn-glass btn-sm" href="https://goo.gl/maps/ib6KtAXq7yTiw2hF7" target="_blank" rel="noopener" data-i="map">Get directions</a>
      </div>
    </div>
    <div class="foot-row">
      <nav class="foot-nav" aria-label="Footer">{nav}<a href="contact.html#faq">FAQ</a></nav>
      <div class="foot-soc"><a class="ib soc" href="https://www.facebook.com/visionproperties.pk" target="_blank" rel="noopener" aria-label="Facebook">{IC["fb"]}</a><a class="ib soc" href="https://www.instagram.com/visionproperties.pk/" target="_blank" rel="noopener" aria-label="Instagram">{IC["ig"]}</a><a class="ib soc" href="https://www.youtube.com/@VisionPropertiesOfficial" target="_blank" rel="noopener" aria-label="YouTube">{IC["yt"]}</a></div>
    </div>
    <div class="legal"><span>© <span class="yr">2026</span> Vision Properties, Karachi</span><span>Real estate marketing &amp; investment consulting</span></div>
  </div></div>
</footer>
<button class="chat-btn" aria-label="Open the Vision assistant" aria-expanded="false" aria-controls="chat">{IC["chat"]}{IC["x"]}<span class="pip" aria-hidden="true"></span></button>
<section class="chat" id="chat" role="dialog" aria-label="Vision Properties assistant" aria-hidden="true">
  <div class="ch"><span class="mk" aria-hidden="true"></span><span><b>Vision assistant</b><small>Answers instantly · hands over to our team</small></span></div>
  <div class="msgs" aria-live="polite"></div><div class="sugg"></div>
  <form class="cf"><label class="sr" for="chatIn">Your question</label><input id="chatIn" placeholder="Ask about a project or area" autocomplete="off"><button aria-label="Send">{IC["send"]}</button></form>
</section>'''

def build(path):
    raw = path.read_text()
    meta = dict(re.findall(r'^@(\w+):\s*(.+)$', raw, re.M))
    def part(name):
        m = re.search(rf'==={name}===\n(.*?)(?=\n===\w+===|\Z)', raw, re.S)
        return m.group(1) if m else ''
    page = meta['page']
    html = f'''<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{meta['title']}</title>
<meta name="description" content="{meta['desc']}">
<meta name="theme-color" content="#0b0a0a">
<meta property="og:title" content="{meta['title']}">
<meta property="og:description" content="{meta['desc']}">
<meta property="og:type" content="website">
<meta property="og:image" content="images/2024-01-waterfall.jpg">
<link rel="icon" type="image/png" href="images/ui/logo-mark-light.png">
<script>(function(){{try{{var t=localStorage.getItem('vp-theme');if(t)document.documentElement.dataset.theme=t;}}catch(e){{}}}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..900&family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
{meta.get('head','')}
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"RealEstateAgent","name":"Vision Properties","url":"https://visionproperties.pk/","email":"info@visionproperties.pk","telephone":["+923302152999","+923222710896","+923302162999"],"address":{{"@type":"PostalAddress","streetAddress":"B-115, Block H, Main Food Street, North Nazimabad","addressLocality":"Karachi","addressRegion":"Sindh","addressCountry":"PK"}},"sameAs":["https://www.facebook.com/visionproperties.pk","https://www.instagram.com/visionproperties.pk/","https://www.youtube.com/@VisionPropertiesOfficial"]}}</script>
<style>
{CSS}
/* ---------------- page: {page} ---------------- */
{part('CSS')}
</style>
</head>
<body data-page="{page}">
{chrome_top()}
<main id="main">
{part('HTML')}
</main>
{chrome_bottom()}
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
<script>window.VP_LOGO_SRC="images/ui/logo-mark-light.png";</script>
<script>
{JS}
</script>
<script>
addEventListener('DOMContentLoaded',function(){{
{part('JS')}
}});
</script>
</body>
</html>
'''
    (OUT / f'{page}.html').write_text(html)
    print(f'{page}.html', len(html) // 1024, 'KB')

for p in sorted((SRC / 'pages').glob('*.page')):
    build(p)
