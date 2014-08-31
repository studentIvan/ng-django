# -*- coding: utf-8 -*-
from __future__ import print_function
from django.core.management.base import BaseCommand, CommandError
from django.core import management
from random import random
import subprocess


class Command(BaseCommand):
    option_list = BaseCommand.option_list

    def __init__(self):
        BaseCommand.__init__(self)

    def handle(self, *args, **options):
        print('\033[0;43m\t\t\t\t\tgulp tasks\t\t\t\t'
              '\t\033[0;37m \nrandom = %s\033[0;00m' % int(random() * 1e10))
        subprocess.call("gulp", shell=True)
        print('')

        print('\033[0;42m\t\t\tdjango development server\t\t\t'
              '\033[0;32m \nrandom = %s\033[0;00m' % int(random() * 1e10))
        management.call_command('runserver')
