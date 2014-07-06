# -*- coding: utf-8 -*-

from __future__ import print_function, unicode_literals
#from django.contrib.auth.models import User
#from django.db import transaction
#from django.db.models import Sum, Q
from django.http import HttpResponse, Http404, HttpResponseForbidden
#from django.utils import timezone
from django.conf import settings
#from django.shortcuts import get_object_or_404
#from django.template.loader import render_to_string
#from django.core.paginator import Paginator
from angular_api.logic import *
from objects.models import *
#from decimal import Decimal
#from operator import itemgetter
import simplejson as json
import traceback
import datetime
import inspect
import sys


class APIException(Exception):
    pass


#region api functions
def get_obama_years(**kwargs):
    return datetime.date.today().year - 1961
#endregion


functions = dict(
    inspect.getmembers(sys.modules[__name__], lambda f: inspect.isfunction(f) and f.__module__ == __name__))


def api_handler_global(request):
    if request.method != 'POST':
        return HttpResponseForbidden('403 Forbidden')
    try:
        data = json.loads(request.body)
    except:
        data = dict(request.REQUEST)
    data['user'] = request.user
    response = {}
    status = 200
    try:
        function_result = functions[data['function']](**data)
        if function_result:
            response['result'] = function_result
        response['error'] = None
    except APIException as exc:
        response['error'] = exc.message
    except Http404:
        response['error'] = 'Not Found'
        status = 404
    except Exception as e:
        if settings.DEBUG:
            print(traceback.format_exc(), e)
        response['error'] = 'Server Error'
        status = 500

    return HttpResponse(json.dumps(response), content_type='application/json', status=status)
