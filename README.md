# Vedhika Project Deploy

This is a full-stack web application built using Django and React.

## Tech Stack
- Backend: Django, Django REST Framework
- Frontend: React.js
- Database: Postgresql (development)
- Authentication: JWT
- Version Control: Git & GitHub
- 
## Project Structure
backend/
  myproject/
    manage.py
    requirements.txt

frontend/
  myproject/
    src/
    package.json


## How to Run Locally

### Backend
```bash
cd backend/myproject
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend/myproject
npm install
npm start

## Deployment

- Backend can be deployed using Gunicorn + Nginx
- Frontend can be built using `npm run build`
- CI/CD can be handled using GitHub Actions

