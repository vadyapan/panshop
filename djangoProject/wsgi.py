# -*- coding: utf-8 -*-
import os
import sys
import platform
#путь к проекту, там где manage.py
sys.path.insert(0, '/home/c/cb75699/newsite/public_html/djangoProject')
#путь к фреймворку, там где settings.py
sys.path.insert(0, '/home/c/cb75699/newsite/public_html/djangoProject/djangoProject')
#путь к виртуальному окружению myenv
sys.path.insert(0, '/home/c/cb75699/newsite/venv/lib/python{0}/site-packages'.format(platform.python_version()[0:3]))
#sys.path.insert(0, '/home/c/cb75699/newsite/venv/lib/python3.6/site-packages')
os.environ["DJANGO_SETTINGS_MODULE"] = "djangoProject.settings"

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
