# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.forms import AuthenticationForm as DjAuthForm
from django.utils.translation import ugettext_lazy as _


class AuthenticationForm(DjAuthForm):
    username = forms.CharField(max_length=254, label='Логин')

    error_messages = {
        'invalid_login': "Неверный логин и/или пароль",
        'inactive': _("This account is inactive."),
    }