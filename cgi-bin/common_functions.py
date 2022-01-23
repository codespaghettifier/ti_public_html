import json
import sqlite3
import urllib.parse
import datetime
from os import environ


def quote_data(data):
    for key, value in data.items():
        data[key] = urllib.parse.quote(value)
    return data


def authorize():
    if 'HTTP_COOKIE' not in environ:
        return False, json.dumps({'success': False, 'error': 'No cookie'})

    cookie_strings = environ['HTTP_COOKIE'].split()
    cookies = {}
    for str in cookie_strings:
        split = str.split('=')
        cookies[split[0]] = split[1].strip(';')

    db_connection = sqlite3.connect('../project2/database/users.db')
    cursor = db_connection.execute(f"SELECT token, expires FROM session WHERE session = '{cookies['Session']}';")
    authorized = False
    for row in cursor:
        token = row[0]
        expires = row[1]
        if token == cookies['AuthToken'] and datetime.datetime.now().timestamp() < expires:
            authorized = True
    if not authorized:
        return False, json.dumps({'success': False, 'error': 'Invalid or expired token'})

    new_expires = datetime.datetime.now() + datetime.timedelta(hours=1)
    new_expires_timestamp = new_expires.timestamp()
    db_connection.execute(f"UPDATE session SET expires = {new_expires_timestamp} WHERE session = '{cookies['Session']}';")
    db_connection.commit()
    db_connection.close()

    return True, {'session': cookies['Session'], 'token': cookies['AuthToken'], 'expires': new_expires.strftime("%a, %d %b %Y %H:%M:%S GMT")}


def set_cookie(name, value, expires):
    print(f"Set-Cookie: {name}={value}; expires={expires}; SameSite=Strict; Path=/;")


def get_query_params():
    query_string = urllib.parse.unquote(environ['QUERY_STRING'])
    query_param_pairs = query_string.split('&')
    query_params = {}
    for pair in query_param_pairs:
        split = pair.split('=')
        query_params[split[0]] = split[1]
    return query_params