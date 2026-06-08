import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="",
        user="",
        password="",
        database="",
        auth_plugin=""
    )

# def close_db(connection):
#     if connection.is_connected():
#         connection.close()