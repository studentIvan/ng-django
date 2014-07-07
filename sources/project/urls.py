from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
from project.angular_urls import parse as ng_parse

admin.autodiscover()
routes = ng_parse(settings.STATIC_ROOT + '/js/site/routing.js')

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api/$', 'angular_api.views.api_handler_global'),
                       url(r'^(?:$|%s|test)' % '|'.join(routes), 'objects.views.acme'))