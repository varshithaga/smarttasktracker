# 🧠 Smart Task Tracker

A minimal full-stack task management system with role-based access control using **Django REST Framework** and **React**.

---

## 📁 Folder Structure

smart-task-tracker/  
│  
├── backend/               # Django backend  
│   ├── manage.py  
│   ├── backend/         # Django project folder  
│   └── core/           # App for tasks, projects, and users  
│  
├── frontend/              # React frontend  
│   ├── public/  
│   ├── src/  
│   │   ├── components/     # All UI components including Login, Dashboard, etc.  
│   │   ├── App.js  
│   │   └── index.js  
│   ├── package.json  
│   └── .gitignore  
│  
├── .gitignore  
├── requirements.txt  
└── README.md

---

## ⚙️ Backend Setup (Django + PostgreSQL)

cd backend  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  

## In settings.py, configure PostgreSQL:  
 DATABASES = {  
     'default': {  
         'ENGINE': 'django.db.backends.postgresql',  
         'NAME': 'your_db_name',  
         'USER': 'your_db_user',  
         'PASSWORD': 'your_db_password',  
         'HOST': 'localhost',  
         'PORT': '5432',  
     }  
 }  

python manage.py makemigrations  
python manage.py migrate  
python manage.py createsuperuser  
python manage.py runserver  

---

## 💻 Frontend Setup (React)

cd frontend  
npm install  
npm start  

---

## 🔑 Authentication & Roles

Admin: Can create/update projects and create,update and assign tasks
Contributor: Can view assigned tasks and update their status  

---

## 🔐 Roles are auto-assigned based on email during registration:
- Username containing **admin** (e.g., `abc@admin`) → assigned role: **admin**
- All other username (e.g., `xyz@contributor`) → assigned role: **contributor**
  
---

## 📦 Tech Stack

Backend: Django, Django REST Framework, Simple JWT  
Frontend: React, Axios, React Router  
Database: PostgreSQL  

---

