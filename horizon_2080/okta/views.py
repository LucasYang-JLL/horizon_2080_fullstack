from django.shortcuts import render
from django.http import HttpResponseRedirect
from saml2 import (
    BINDING_HTTP_POST,
    BINDING_HTTP_REDIRECT,
    entity,
)
from saml2.client import Saml2Client
from saml2.config import Config as Saml2Config
from django.contrib.auth import login
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from users.models import *
# Create your views here.

def _get_saml_client():
    settings = {
        "entityid" : "http://example.com/sp/metadata.xml",
        'metadata': {
            # 'inline': [rv.text],
                'remote': [{"url":"https://dev-386623.oktapreview.com/app/exkhvr0claqOt5UGb0h7/sso/saml/metadata"}]
                # "local": ["C:\\GitHub\\python34\\horizon_markets\\metadata.xml"],
                # "local": [".\\horizon_markets\\metadata.xml"]
                # "local": ["./Horizon2080_Production_SP_metadata.xml"]
            },
        'service': {
            'sp': {
                'endpoints': {
                    'assertion_consumer_service': [
                        ("http://localhost:8000/login/callback", BINDING_HTTP_REDIRECT),
                        ("http://localhost:8000/login/callback", BINDING_HTTP_POST)
                        # (https_acs_url, BINDING_HTTP_REDIRECT),
                        # (https_acs_url, BINDING_HTTP_POST)
                    ],
                },
                # Don't verify that the incoming requests originate from us via
                # the built-in cache for authn request ids in pysaml2
                'allow_unsolicited': True,
                # Don't sign authn requests, since signed requests only make
                # sense in a situation where you control both the SP and IdP
                'authn_requests_signed': False,
                'logout_requests_signed': True,
                'want_assertions_signed': True,
                'want_response_signed': False,
            },
        },
    }
    spConfig = Saml2Config()
    spConfig.load(settings)
    spConfig.allow_unknown_attributes = True
    saml_client = Saml2Client(config=spConfig)
    return saml_client

def okta_login(request):
    saml_client = _get_saml_client()
    _, info = saml_client.prepare_for_authenticate()

    redirect_url = None

    for key, value in info['headers']:
        if key == 'Location':
            redirect_url = value
            break

    return HttpResponseRedirect(redirect_url)

#need to exempt csrf, otherwise Django returns 403
@csrf_exempt
def acs(request):
    saml_client = _get_saml_client()
    resp = request.POST.get('SAMLResponse', None)
    # make sure the http address is the exact same as in the _get_saml_client() config
    authn_response = saml_client.parse_authn_request_response(resp, entity.BINDING_HTTP_POST) 
    authn_response.get_identity()
    user_info = authn_response.get_subject()
    #return a list of results
    # User = get_user_model()
    user = User.objects.filter(email=user_info.text)
    if not user:
        return HttpResponse("User does not exist!")
    else:
        # manually set the backend attribute
        user[0].backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user[0])
        return HttpResponseRedirect("/")