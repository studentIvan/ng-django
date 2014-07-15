#coding=utf-8


class APIException(Exception):
    def __init__(self, status, message='APIException'):
    	self.status = status
    	self.message = message

    def notFound(message='Not Found'):
    	return APIException(404, message)

    def forbidden(message='Forbidden'):
    	return APIException(403, message)

    def badRequest(message='Bad Request'):
    	return APIException(400, message)

    def conflict(message='Conflict'):
    	return APIException(409, message)

    def locked(message='Locked'):
    	return APIException(423, message)

    def tooManyRequests(message='Too Many Requests'):
    	return APIException(429, message)

    def preconditionFailed(message='Precondition Failed'):
    	return APIException(412, message)

    def retryWith(message='Retry With'):
    	return APIException(449, message)