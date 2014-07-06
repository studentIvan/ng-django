from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api/$', 'angular_api.views.api_handler_global'),
                       url(r'^(?:$|another|test)', 'objects.views.acme'))