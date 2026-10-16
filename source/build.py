#!/usr/bin/env python3
"""Assemble self-contained pages: each output .html has all CSS + JS inlined."""
import base64, pathlib, re

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent / 'site' if (SRC.parent / 'site').is_dir() else SRC.parent   # repo: pages live at the root
b64 = lambda f: 'data:image/png;base64,' + base64.b64encode(f.read_bytes()).decode()
MARK = b64(OUT / 'logo-mark.png')
LOGO_SRC = b64(SRC / 'logo-src.png')
CSS = (SRC / 'shared.css').read_text()
JS = (SRC / 'data.js').read_text() + '\n' + (SRC / 'shared.js').read_text()

NAV = [('index', 'index.html', 'Home'), ('projects', 'projects.html', 'Projects'), ('about', 'about.html', 'About'), ('contact', 'contact.html', 'Contact')]

ICON = {
 'sun': '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 'moon': '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
 'wa': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.3-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>',
 'chat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg>',
 'x': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 'send': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
 'arrow': '<svg class="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 'ig': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
 'fb': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.6-4h-4.1V8.8c0-.5.3-.8.5-.8z"/></svg>',
 'yt': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.6 12l-5.8 3.1z"/></svg>',
}

def chrome_top(page):
    links = ''.join(f'<a href="{h}" data-p="{k}">{t}</a>' for k, h, t in NAV)
    sheet = ''.join(f'<a href="{h}" data-p="{k}" data-close>{t}<span>0{i+1}</span></a>' for i, (k, h, t) in enumerate(NAV))
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="bg-base" aria-hidden="true"></div><canvas id="bg3d" aria-hidden="true"></canvas><div class="bg-lines" aria-hidden="true"></div><div class="bg-veil" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div>
<div class="cursor gone" aria-hidden="true"><span class="c-ring"></span><span class="c-dot"></span></div>
<div class="loader" aria-hidden="true"><div class="ld"><div class="ld-mark"><img src="{MARK}" alt=""></div><div class="ld-word">{''.join(f'<span style="animation-delay:{.1+i*.05:.2f}s">{c}</span>' for i,c in enumerate('VISION'))}</div><div class="ld-bar"><i></i></div></div></div>
<div id="progress"></div>
<header class="nav">
  <a class="brand" href="index.html" aria-label="Vision Properties, home"><span class="seal"><img src="{MARK}" alt="Vision Properties logo"></span><span class="brand-t"><b>VISION</b><small>PROPERTIES</small></span></a>
  <nav class="menu" aria-label="Main"><span class="pill-bg" aria-hidden="true"></span>{links}</nav>
  <div class="nav-r">
    <button class="tgl" id="themeBtn" aria-label="Switch light or dark theme"><span class="knob"></span>{ICON['moon']}{ICON['sun']}</button>
    <button class="ibtn" id="sndBtn" aria-label="Sound effects" aria-pressed="false" title="Sound effects"><span class="bars"><i></i><i></i><i></i><i></i></span></button>
    <a class="btn btn-red btn-sm" href="contact.html" data-mag><span class="cta-txt">Make an enquiry</span>{ICON['arrow']}</a>
    <button class="ibtn" id="burger" aria-label="Open menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h16M4 16h10"/></svg></button>
  </div>
</header>
<div class="sheet" aria-hidden="true"><div class="scrim" data-close></div><div class="pane"><div class="grab"></div><nav>{sheet}</nav>
  <div class="row"><a class="btn btn-glass" href="tel:+923302152999">{ICON['phone']}Call</a><a class="btn btn-wa" href="https://wa.me/923302152999" target="_blank" rel="noopener">{ICON['wa']}WhatsApp</a></div></div></div>
'''

def chrome_bottom():
    return f'''<footer class="foot"><div class="wrap"><div class="foot-in">
  <div class="fcols">
    <div><a class="brand" href="index.html"><span class="seal"><img src="{MARK}" alt=""></span><span class="brand-t"><b>VISION</b><small>PROPERTIES</small></span></a>
      <p style="margin-top:18px;max-width:38ch">A full-service real estate marketing and investment consulting company. We're rethinking how you buy, sell and rent, so it's easier to get into a place you love.</p>
      <div class="social"><a class="ibtn" href="https://wa.me/923302152999" target="_blank" rel="noopener" aria-label="WhatsApp">{ICON['wa']}</a><a class="ibtn" href="https://www.facebook.com/visionproperties.pk" target="_blank" rel="noopener" aria-label="Facebook">{ICON['fb']}</a><a class="ibtn" href="https://www.instagram.com/visionproperties.pk/" target="_blank" rel="noopener" aria-label="Instagram">{ICON['ig']}</a><a class="ibtn" href="https://www.youtube.com/@VisionPropertiesOfficial" target="_blank" rel="noopener" aria-label="YouTube">{ICON['yt']}</a></div></div>
    <div><h5>Explore</h5><ul><li><a href="index.html">Home</a></li><li><a href="projects.html">All projects</a></li><li><a href="about.html">About us</a></li><li><a href="about.html#process">How we work</a></li><li><a href="contact.html#faq">FAQ</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    <div><h5>Projects</h5><ul><li><a href="project.html?p=saima-waterfront">Saima Waterfront</a></li><li><a href="project.html?p=saima-marina-residence">Saima Marina Residence</a></li><li><a href="project.html?p=paari-palace">Paari Palace</a></li><li><a href="project.html?p=saars-tower">Saars Tower</a></li><li><a href="project.html?p=roomi-city">Roomi City</a></li></ul></div>
    <div><h5>Visit &amp; call</h5><ul><li><a href="https://goo.gl/maps/ib6KtAXq7yTiw2hF7" target="_blank" rel="noopener">B-115, Block H, Main Food Street, North Nazimabad, Karachi</a></li><li><a href="tel:+923302152999">0330 2152999</a></li><li><a href="tel:+923222710896">0322 2710896</a></li><li><a href="tel:+923302162999">0330 2162999</a></li><li><a href="mailto:info@visionproperties.pk">info@visionproperties.pk</a></li></ul></div>
  </div>
  <div class="word" aria-hidden="true">VISION <em>Properties</em></div>
  <div class="legal"><span>© <span class="yr">2026</span> Vision Properties · Karachi</span><span>A step taken today is a vision for tomorrow</span></div>
</div></div></footer>
<div class="dock"><a class="d1x" href="tel:+923302152999">{ICON['phone']}Call</a><a class="d2x" href="https://wa.me/923302152999" target="_blank" rel="noopener">{ICON['wa']}WhatsApp</a><button class="d3x" data-bot>{ICON['chat']}Ask</button></div>
<button class="fab" data-bot aria-label="Open assistant"><span class="av">{ICON['chat']}</span>Ask Vision</button>
<div class="bot" role="dialog" aria-label="Vision Properties assistant" aria-hidden="true">
  <div class="bh"><span class="seal"><img src="{MARK}" alt=""></span><span><b>Vision Assistant</b><small>Replies instantly</small></span><button class="ibtn" id="botX" aria-label="Close assistant">{ICON['x']}</button></div>
  <div class="msgs" aria-live="polite"></div><div class="sugg"></div>
  <form class="bf"><input id="botIn" placeholder="Ask about a project, area or plan…" autocomplete="off" aria-label="Your question"><button aria-label="Send">{ICON['send']}</button></form>
</div>'''

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
<meta name="theme-color" content="#09090b">
<meta property="og:title" content="{meta['title']}">
<meta property="og:description" content="{meta['desc']}">
<meta property="og:type" content="website">
<meta property="og:image" content="https://visionproperties.pk/wp-content/uploads/2024/01/waterfall.jpg">
<link rel="icon" href="{MARK}">
<script>(function(){{try{{var t=localStorage.getItem('vp-theme');if(t)document.documentElement.dataset.theme=t;}}catch(e){{}}}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"RealEstateAgent","name":"Vision Properties","url":"https://visionproperties.pk/","email":"info@visionproperties.pk","telephone":["+923302152999","+923222710896","+923302162999"],"address":{{"@type":"PostalAddress","streetAddress":"B-115, Block H, Main Food Street, North Nazimabad","addressLocality":"Karachi","addressRegion":"Sindh","addressCountry":"PK"}},"sameAs":["https://www.facebook.com/visionproperties.pk","https://www.instagram.com/visionproperties.pk/","https://www.youtube.com/@VisionPropertiesOfficial"]}}</script>
<style>
{CSS}
/* ---------- page: {page} ---------- */
{part('CSS')}
</style>
</head>
<body data-page="{page}">
{chrome_top(page)}
<main id="main">
{part('HTML')}
</main>
{chrome_bottom()}
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
<script>window.VP_LOGO_SRC="{LOGO_SRC}";</script>
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
