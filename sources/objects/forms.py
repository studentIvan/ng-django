# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm as DjAuthForm
from django.utils.translation import ugettext_lazy as _
from constance import config
from django.conf import settings
import redis


class AuthenticationForm(DjAuthForm):
    username = forms.CharField(max_length=254, label='Логин')

    error_messages = {
        'invalid_login': "Неверный логин и/или пароль",
        'inactive': _("This account is inactive."),
    }

    @staticmethod
    def get_login_attempts(username):
        r = redis.StrictRedis(**settings.CONSTANCE_REDIS_CONNECTION)
        attempt_key = '_auth_attempts:%s' % username
        attempts = int(r.get(attempt_key) or 0) + 1
        r.set(attempt_key, attempts, 60)
        return attempts

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            if AuthenticationForm.get_login_attempts(username) > config.AUTH_ATTEMPTS_PER_MINUTE:
                raise forms.ValidationError(
                    'Слишком много попыток авторизации, попробуйте через минуту',
                    code='invalid_login',
                    params={'username': self.username_field.verbose_name},
                )
            self.user_cache = authenticate(username=username,
                                           password=password)
            if self.user_cache is None:
                raise forms.ValidationError(
                    self.error_messages['invalid_login'],
                    code='invalid_login',
                    params={'username': self.username_field.verbose_name},
                )
            elif not self.user_cache.is_active:
                raise forms.ValidationError(
                    self.error_messages['inactive'],
                    code='inactive',
                )

        return self.cleaned_data