import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SECRET_KEY = 'v)-8q_3giew*pdy*&e@&knte6mz&1=$9$29+2h_k8s2*#aftx$'
DEBUG = True
TURN_OFF_SECURITY = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'objects',
    'south',
    'compressor'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

if not TURN_OFF_SECURITY:
    MIDDLEWARE_CLASSES += ('django.middleware.csrf.CsrfViewMiddleware',)

ROOT_URLCONF = 'project.urls'

WSGI_APPLICATION = 'project.wsgi.application'

if 'DATABASE_SETTINGS' in os.environ:
    #DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
    cred = json.loads(os.environ['DATABASE_SETTINGS'])
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': cred['db_name'],
            'USER': cred['db_user'],
            'PASSWORD': cred['db_pass'],
            'HOST': cred['db_host'],
            'PORT': cred['db_port'],
        }
    }
else:
    #DEFAULT_FILE_STORAGE = 'connections.gridfs_files.GridfsStorage'
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

LANGUAGE_CODE = 'ru-RU'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'objects/static_files')
COMPRESS_ENABLED = not DEBUG
COMPRESS_OUTPUT_DIR = 'assets'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'objects/django_templates'),
)

LOGIN_URL = '/login/'
LOGOUT_URL = '/logout/'
LOGIN_REDIRECT_URL = '/'

