from django.shortcuts import render

# Create your views here.
def ServiceWorker(request):
    return render(request, 'sw/service-worker.js')