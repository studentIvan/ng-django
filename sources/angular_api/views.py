# -*- coding: utf-8 -*-

from __future__ import print_function, unicode_literals
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.conf import settings
from angular_api.logic import *
import simplejson as json
import traceback
import datetime
import inspect
import sys


#region api functions
def get_obama_years(**kwargs):
    return datetime.date.today().year - 1961


def yet_another_api_function(**kwargs):
    return get_object_or_404(User, id=200)  # error 404 test

#endregion


functions = dict(
    inspect.getmembers(
        sys.modules[__name__],
        lambda f: inspect.isfunction(f) and f.__module__ == __name__
    )
)


@login_required
def api_handler_global(request):
    if request.method != 'POST':
        raise APIException.forbidden()

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
    except APIException as e:
        response['error'] = e.message
        status = e.status
    except Exception as e:
        if settings.DEBUG:
            print(traceback.format_exc(), e)
        response['error'] = 'Server Error'
        status = 500

    return HttpResponse(json.dumps(response), content_type='application/json', status=status)
