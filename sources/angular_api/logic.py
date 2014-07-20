#coding=utf-8


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