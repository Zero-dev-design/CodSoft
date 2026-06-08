# 3D Modeling & Game Development Landing Page

## Description

A modern landing page designed for a 3D Modeling and Game Development Studio.

The project focuses on creating an attractive user experience while integrating backend and database functionality using Flask and MySQL.

## Technologies Used

* Python
* Flask
* HTML5
* CSS3
* JavaScript
* MySQL

## Installation

1. Clone the repository.

2. Install required packages:

pip install flask mysql-connector-python

3. Open the application file.

4. Configure the Flask Secret Key:

```python
app.secret_key = "YOUR_SECRET_KEY"
```

Replace:

YOUR_SECRET_KEY with a secure random string.

5. Configure your MySQL database connection:

```python
def get_db():
    return mysql.connector.connect(
        host="",
        user="",
        password="",
        database="",
        auth_plugin=""
    )
```

Replace the fields with your database information:

* host
* user
* password
* database
* auth_plugin

6. Start the application:

python app.py

7. Open:

http://127.0.0.1:5000

## Features

* Modern Landing Page Design
* Responsive Layout
* Flask Backend Integration
* MySQL Database Connectivity
* Interactive UI Components
* Clean Navigation Structure

## Author
Sagar Biswas
Developed as part of the CodeSoft Web Development Internship.
