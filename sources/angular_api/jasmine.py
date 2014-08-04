# -*- coding: utf-8 -*-

from __future__ import print_function, unicode_literals


def jasmine_tests_run_before(**kwargs):
    """
    Метод запускается перед тестированием
    """
    print('tests running...')
    return True


def jasmine_tests_run_after(**kwargs):
    """
    Метод запускается после окончания тестирования
    """
    print('tests finish...')
    return True