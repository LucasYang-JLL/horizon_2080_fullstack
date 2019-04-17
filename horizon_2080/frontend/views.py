from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.conf import settings
import logging
import os
import frontend.configs as configs

# Create your views here.
def index(request):
     # grabs the index.html in template/ folder
    try:
        # local development use static/dev, uat and prod environment use static/prod
        with open(os.path.join(settings.REACT_APP_DIR, configs.static_url, 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse(
            """
            This URL is only used when you have built the production
            version of the app. Visit http://localhost:8000/ instead, or
            run `npm run build` to test the production version.
            """,
            status=501,
        )