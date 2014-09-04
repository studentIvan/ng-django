import re


def parse(path):
    """
    parse angular.js routing file and return key routes
    """
    routing_file = open(path, 'r')
    js_buffer = routing_file.read()
    routing_file.close()
    return tuple(set(re.findall(r'\.when\(\'/(\w+)', js_buffer)))
