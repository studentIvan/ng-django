# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
from project.angular_urls import parse as ng_parse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import login, logout
from django.core.context_processors import csrf
from django.http import HttpResponseForbidden
from objects.forms import AuthenticationForm
from django.shortcuts import render
#region REDIS
from constance import config
#endregion

admin.autodiscover()
routes = ng_parse(settings.STATIC_ROOT + '/js/site/routing.js')


def logout_protected(request, csrf_token=False, next_page=None,
                     template_name='registration/logged_out.html',
                     redirect_field_name='next',
                     current_app=None, extra_context=None):
    if settings.TURN_OFF_SECURITY or csrf_token == unicode(csrf(request).get('csrf_token')):
        return logout(request, next_page, template_name, redirect_field_name, current_app, extra_context)
    else:
        return HttpResponseForbidden('Hacking attempt!')


urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api/$', 'angular_api.views.api_handler_global'),
                       url(r'^login/$', login, {'template_name': 'login.html',
                                                'authentication_form': AuthenticationForm}, name='login'),
                       url(r'^logout/(?P<csrf_token>\w+)/$', logout_protected, {'next_page': 'login'},
                           name='logout'),
                       url(r'^(?:$|%s)' % '|'.join(routes), login_required(render),
                           {
                               'template_name': 'index.html',
                               'dictionary': {
                                   'config': config,
                                   'VERSION': settings.VERSION
                               }
                           }))