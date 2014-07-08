from django.test import TestCase
from angular_api.views import *


class ApiTestCase(TestCase):
    def setUp(self):
        print('fuck on')

    def test_obama_has_53_years(self):
        self.assertEqual(get_obama_years(), 53)

    def tearDown(self):
        print('fuck off')