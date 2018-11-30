from django.http import HttpResponseRedirect
from django.shortcuts import redirect
class AuthRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        print(request.user.is_authenticated)
        response = self.get_response(request)
        if not request.user.is_authenticated:
            path = request.path_info.lstrip('/')
            if path != 'login/' and  path != 'landing/':
                return redirect('/login/')
            return response
        return response