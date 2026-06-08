from flask import Blueprint, render_template, request, redirect, session
from models.user_model import create_user, get_user_by_email, get_all_users, delete_user
from auth.utils import hash_password, verify_password
from database import get_db

auth_bp = Blueprint("auth", __name__)

# -------- LOGIN --------
@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user = get_user_by_email(email)
        if user and verify_password(password, user["password_hash"]):
            session["user_id"] = user["id"]
            session["role_id"] = user["role_id"]
            session["username"] = user["username"]
            return redirect("/")
        return "Invalid credentials"

    return render_template("login.html")

# -------- SIGNUP (CUSTOMER ONLY) --------
@auth_bp.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = hash_password(request.form["password"])

        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id FROM roles WHERE name='customer'")
        role = cursor.fetchone()

        create_user(username, email, password, role["id"])
        return redirect("/login")

    return render_template("signup.html")

# -------- LOGOUT --------
@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")
