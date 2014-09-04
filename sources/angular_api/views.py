# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals, division
from angular_api.logic import APIException, get_object_or_404, user_passes_test
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.conf import settings
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


@user_passes_test(lambda u: u.is_superuser)
def get_administrative(**kwargs):
    return 'Hello Administrator!'


#endregion


functions = dict(
    inspect.getmembers(
        sys.modules[__name__],
        lambda f: inspect.isfunction(f) and f.__module__ == __name__
    )
)


@require_POST
@login_required
def api_handler_global(request):
    response, status = dict(), 200
    try:
        data = json.loads(request.body)
        data['user'] = request.user
    except json.JSONDecodeError:
        response['error'], status = 'Bad Request', 400
    else:
        try:
            function_result = functions[data['function']](**data)
            if function_result:
                response['result'] = function_result
        except APIException as e:
            response['error'], status = e.message, e.status
        except KeyError:
            response['error'], status = 'Retry With', 449
        except Exception as e:
            if settings.DEBUG:
                print(traceback.format_exc(), e)
            response['error'], status = 'Server Error', 500

    return HttpResponse(json.dumps(response), content_type='application/json', status=status)
