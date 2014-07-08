# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
from project.angular_urls import parse as ng_parse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import login, logout
from django.shortcuts import render

from objects.forms import AuthenticationForm

admin.autodiscover()
routes = ng_parse(settings.STATIC_ROOT + '/js/site/routing.js')

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api/$', 'angular_api.views.api_handler_global'),
                       url(r'^(?:$|%s|test)' % '|'.join(routes),
                           login_required(render),
                           {'template_name': 'index.html'}),
                       url(r'^login/$', login,
                           {'template_name': 'login.html',
                            'authentication_form': AuthenticationForm},
                           name='login'),
                       url(r'^logout/$', logout, {'next_page': 'login'},
                           name='logout'))