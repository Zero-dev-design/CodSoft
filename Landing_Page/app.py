from flask import Flask, render_template
from auth.routes import auth_bp

app = Flask(__name__)
app.secret_key = ""

# REGISTER BLUEPRINT
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/games")
def games():
    return render_template("games.html")

@app.route("/games/<game_slug>")
def game_detail(game_slug):
    return render_template("game_detail.html", game=game_slug)

@app.route("/news")
def news():
    return render_template("news.html")

@app.route("/store")
def store():
    return render_template("store.html")

@app.route("/admin/users")
def admin():
    return render_template("admin_users.html")
if __name__ == "__main__":
    app.run(debug=True)
