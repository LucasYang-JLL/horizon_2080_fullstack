from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.index),
    path('service-worker.js', (TemplateView.as_view(template_name="service-worker.js", content_type='application/javascript', )), name='service-worker.js'),
]