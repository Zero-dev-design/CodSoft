from flask import Flask, render_template, request, redirect
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# YOUR EMAIL CONFIG
EMAIL_ADDRESS = ""
EMAIL_PASSWORD = ""

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send-message", methods=["POST"])
def send_message():

    name = request.form["name"]
    email = request.form["email"]
    subject = request.form["subject"]
    message = request.form["message"]

    # EMAIL CONTENT
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = EMAIL_ADDRESS
    msg["Subject"] = f"Portfolio Contact: {subject}"

    body = f"""
    Name: {name}

    Email: {email}

    Subject: {subject}

    Message:
    {message}
    """

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        server.send_message(msg)
        server.quit()

        print("Email Sent Successfully!")

    except Exception as e:
        print("Error:", e)

    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)