import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, os.path.join(PROJECT_ROOT, "sources"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sources.project.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
