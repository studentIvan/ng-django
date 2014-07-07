import re


def parse(path):
    """
    parse angular.js routing file and return key routes
    """
    routingFile = open(path, 'r')
    jsBuffer = routingFile.read()
    routingFile.close()
    return tuple(set(re.findall(r'\.when\(\'/(\w+)', jsBuffer)))
