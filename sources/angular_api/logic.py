#coding=utf-8
from django.shortcuts import _get_queryset
#from mongoengine.base import ValidationError


class APIException(Exception):
    def __init__(self, status, message='APIException'):
        self.status = status
        self.message = message

    @staticmethod
    def not_found(message='Not Found'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(404, message)

    @staticmethod
    def forbidden(message='Forbidden'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(403, message)

    @staticmethod
    def bad_request(message='Bad Request'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(400, message)

    @staticmethod
    def conflict(message='Conflict'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(409, message)

    @staticmethod
    def locked(message='Locked'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(423, message)

    @staticmethod
    def too_many_requests(message='Too Many Requests'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(429, message)

    @staticmethod
    def precondition_failed(message='Precondition Failed'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(412, message)

    @staticmethod
    def retry_with(message='Retry With'):
        """
        :type message: str or unicode
        :param message: Error message.
        :rtype: APIException
        :return: APIException
        """
        return APIException(449, message)


def get_object_or_404(interesting, *args, **kwargs):
    """
    Uses get() to return an object, or raises a 404 exception if the object
    does not exist.

    interesting may be a Model, Manager, or QuerySet object. All other passed
    arguments and keyword arguments are used in the get() query.

    Note: Like with get(), an MultipleObjectsReturned will be raised if more than one
    object is found.
    """
    queryset = _get_queryset(interesting)
    try:
        return queryset.get(*args, **kwargs)
    except queryset.model.DoesNotExist:
        #except ValidationError: (MongoDB)
        raise APIException.not_found()