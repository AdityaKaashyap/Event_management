# Event Management System 🎓

A full-stack project using **Django REST Framework (backend)** and **React + Bootstrap (frontend)**.
# About Django
-Django is a python language based backend web framework where it has many things inbuilt which a backend framework need.
-It has an admin panel from where you can have the control over the things inside.
-Django ORM also known as Object Representation Mapping handles database interaction using Pytjon classes like rawSql.
-In django we primarily work on different files they are views,serializers,urls,models etc.
# Core Files
- Serializers: are used to mainly serialize the data that we are getting from the frontend so it would be easy for the python to understand it.
- Models: is the file where we actually create the schema same as in that of a database which is the most important as it teaches what should be the type of the data we need to be getting from the frontend.
- Views: is used to create the viewset on each aspect whcih has to be rendered in the frontend.
- Urls: is where we establish the names for the urls for the frontend to be easy to communicate with the backend.
# Django Rest Framework Features:
- Django rest framework is a library inside python whcih has many subclasses whcih are useful.
- It has got permission classes which specifies who can access what just like a middleware.
- It has got all the kind of Token Viewset which primarily is used when login and logout is handled.
- This is mainly responsible for the communication between frontend and backend.
# About Corsheaders
- Next we have used corsheaders library.
- Particularly talking of django it is designed only for the backend functionalities.
- But request has to be made from frontend and this library allows the cross origin requests when specified from different urls of fronend.
- Here in this project since we have used React framework only the localhost:3000 that is the frontend url is where we take the request from.
- This framework is most effective in many conditions as it would give you most of the functionalities inbuilt.

## 📂 Project Structure
- `/backend` → Django + DRF + MySQL
- `/frontend` → React + Axios + Bootstrap

## 🚀 Features
- Student Registration & Login
- Event Registration
- Attendance Tracking
- Feedback System
- JWT Authentication
- Reports: attendance %, feedback averages, top students

## 🛠️ Setup Instructions

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
