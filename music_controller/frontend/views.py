import os, markdown
from django.conf import settings
from django.shortcuts import render





def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")

def privacy_policy(request):
    md_path = os.path.join("V:\WebApps\MusicController\privacy-policy.md")
    with open(md_path, encoding="utf-8") as f:
        html = markdown.markdown(f.read())
    return render(request, "frontend/privacy_policy.html", {"content": html})