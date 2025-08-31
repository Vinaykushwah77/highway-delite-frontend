#  MERN Stack Authentication & Notes App  

This is a **MERN stack application** with authentication and notes management features.  
It was created as part of an assignment based on a **Figma design** for the frontend.  

---

##  Features  

###  Authentication  
- Signup with OTP verification  
- Secure Signin with JWT  
- Middleware-protected routes  

###  Notes Management  
- Create & Delete notes  
- Notes are **user-specific**  

###  Frontend (React + Tailwind)  
- Signin & Signup pages matching Figma design  
- Responsive UI:  
  - **Desktop** → Card + Right-side image  
  - **Mobile** → Card with logo on top  

###  Backend (Node + Express + MongoDB)  
- REST API with JWT authentication  
- MongoDB models for User & Notes  
- Controllers for auth & notes  
- Middleware for route protection  
- OTP via email using Nodemailer  

---

## Tech Stack  

### Frontend  
- React.js  
- React Router DOM  
- Tailwind CSS  

### Backend  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Nodemailer  

---

##  Folder Structure  
assingment-app/
│── highway-delite-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Note.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── utils/
│   │   └── sendOtp.js
│   ├── src/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
│── highway-delite-frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── right-column.png
│   │   ├── top.png
│   │   ├── signup.png
│   │   ├── signin.png
│   │   └── dashboard.png
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SigninForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── SigninPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   ├── App.test.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
│
└── README.md
---
##  Installation & Setup  

### Clone Repository  

git clone <repo-url>
cd assingment-app

## Backend Setup 
cd backend
npm install

### Create .env file inside backend/

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=5000

## Run backend server

npm start 

## Screenshots

### Sign Up Page
![Signup](frontend/public/signup.png)

### Sign In Page
![Signin](frontend/public/signin.png)

### Dashboard Page
![Dashboard](frontend/public/dashboard.png)


## Frontend Setup 

cd frontend
npm install

## Create .env file inside frontend/

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

## Run frontend 

npm start 

Open the app in browser:
http://localhost:3000

## Deployment

Backend → Render
Frontend → Vercel

## Author
 Vinay Kushwah
 vinaykushwah805@example.com
 GitHub Profile - [Vinaykushwah77](https://github.com/Vinaykushwah77)