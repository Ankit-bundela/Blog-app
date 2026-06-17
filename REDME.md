# 📝 Blog App (Django + React + JWT)

A simple full-stack Blog App using Django REST API and React with JWT authentication.

---

## 🚀 Features

### Backend (Django)
- JWT Authentication (SimpleJWT)
- Create & Get Posts
- Add Comments
- Protected APIs

### Frontend (React)
- Login with JWT
- Create Posts
- Display Posts
- Material UI design

---

## ⚙️ Setup

### Backend
```bash
pip install -r requirements.txt
python manage.py runserver

### Frontend 
npm install
npm start

API Endpoints
POST /api/token/ → Login
GET /api/posts/ → Get posts
POST /api/posts/create/ → Create post (Auth required)
GET /api/posts/<id>/comments/ → Get comments
