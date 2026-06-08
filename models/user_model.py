from database import get_db
from flask import session  
def create_user(username, email, password_hash, role_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO users (username, email, password_hash, role_id) VALUES (%s,%s,%s,%s)",
        (username, email, password_hash, role_id)
    )
    db.commit()
    cursor.close()
    db.close()

def get_user_by_email(email):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    return user

def admin_required(func):
    def wrapper(*args, **kwargs):
        if session.get("role_id") != 1:  # admin role ID
            return "Access Denied"
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper

def get_all_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT users.id, username, email, roles.name AS role
        FROM users JOIN roles ON users.role_id = roles.id
    """)
    users = cursor.fetchall()
    cursor.close()
    db.close()
    return users

def delete_user(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM users WHERE id=%s", (user_id,))
    db.commit()
    cursor.close()
    db.close()
