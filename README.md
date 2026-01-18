# 🏪 StoreSphere

**A Scalable Store Rating & Management Platform**

StoreSphere is a **full-stack, production-ready web application** designed to manage stores, users, and ratings with **role-based access**, **real-time insights**, and **containerized deployment**.

Built with modern engineering practices, StoreSphere demonstrates **clean architecture**, **secure backend design**, and **cloud-ready deployment**.

---

## 🚀 Why StoreSphere?

Most rating systems fail to handle **ownership, access control, and scalability** properly.
StoreSphere solves this by:

* Enforcing **strict role-based access**
* Providing **separate dashboards** for Admins and Store Owners
* Supporting **Docker-based local & cloud deployment**
* Using a **normalized relational database design**

This project is intentionally built to reflect **real-world engineering standards**, not just a demo app.

---

## 🧠 Core Features

### 👤 User Roles

### 🛠️ System Administrator

The System Administrator has complete control over the platform.

**Capabilities**

* Add new **Stores**, **Normal Users**, and **Admin Users**
* View an administrative dashboard with:

  * Total number of users
  * Total number of stores
  * Total number of submitted ratings
* View and manage users with:

  * Name
  * Email
  * Address
  * Role
* View store listings with:

  * Store Name
  * Email
  * Address
  * Overall Rating
* Apply filters on listings by:

  * Name
  * Email
  * Address
  * Role
* View detailed user profiles

  * Includes store rating if the user is a Store Owner
* Secure logout

---

### 👤 Normal User

Normal users interact with the platform primarily as customers.

**Capabilities**

* Sign up and log in using a single authentication system
* Registration fields:

  * Name
  * Email
  * Address
  * Password
* Update password after login
* View a list of all registered stores
* Search stores by:

  * Name
  * Address
* Store listings display:

  * Store Name
  * Address
  * Overall Rating
  * User’s submitted rating
* Submit ratings (1–5) for stores
* Modify previously submitted ratings
* Secure logout

---

### 🏪 Store Owner

Store Owners gain insights into how their stores are performing.

**Capabilities**

* Log in using the same authentication system
* Update password after login
* Access a dedicated dashboard to:

  * View a list of users who submitted ratings
  * See the average rating of their store
* Secure logout

---

 

### ⭐ Rating System

* 1–5 star rating model
* Optional written feedback
* Average ratings calculated per store
* Reviewer identity preserved securely

---

 

## 🧩 Tech Stack

### Frontend

* **React (Vite)**
* **TypeScript**
* **Tailwind CSS**
* Role-based routing
* Component-driven UI architecture

### Backend

* **NestJS**
* **TypeORM**
* **JWT Authentication**
* Role Guards & Interceptors
* Modular domain-driven structure

### Database

* **MySQL**
* Fully normalized schema
* Strong foreign-key relationships

### DevOps & Deployment

* **Docker & Docker Compose**
* **Render (Cloud Deployment)**
* **Nginx (Frontend serving)**
* `.env`-driven configuration

---

## 🗂️ Project Structure

```
STORESPHERE/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth
│   │   │   ├── users
│   │   │   ├── stores
│   │   │   └── ratings
│   │   └── common/
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
└── render.yaml
```

This separation ensures:

* Clean responsibility boundaries
* Easy scalability
* Independent deployment of services

---
## 🎨 UI Snapshots

> Below are selected screenshots showcasing key functionalities of StoreSphere across different user roles.

### 🔐 Authentication

* Login Page (Single Login System for All Roles)
* User Registration (Normal Users)

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ac8cdae1-1226-498d-92b6-f3759ba2a296" />

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e880a677-5199-49c8-9240-39807d458883" />


---

### 🛠️ System Administrator Dashboard

* Platform statistics overview
* User & store management

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6a80e916-1956-4ff8-a715-8362695b27a2" />

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d76d2062-fee4-4da4-a7ac-619fd63d9f84" />

 

---

### 🏪 Normal User – Store Listings & Ratings

* Browse & search stores
* Submit and modify ratings

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0efb59bc-c993-4baa-a4c2-2b1b27305eb7" />

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/56ec5417-2ebf-484f-93c9-c69735be66c2" />


---

### 📊 Store Owner Dashboard

* View average rating
* See list of users who rated the store

📸 *Screenshot:* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5b3c1e7b-102e-4620-9782-d48d70b94b70" />


> ℹ️ Screenshots are stored under `/docs/screenshots` for better documentation structure.

---

## 👥 User Roles & Access Control

StoreSphere implements a **single authentication system** with **role-based authorization**, ensuring users only access functionalities permitted by their role.

### Supported Roles

1. **System Administrator**
2. **Normal User**
3. **Store Owner**

Role validation is enforced at both:

* Backend (NestJS Guards)
* Frontend (Route-level protection)

---

 

 
## 🧾 Form Validation Rules

All forms follow **strict validation rules** enforced on both frontend and backend.

| Field    | Validation Rule                                                      |
| -------- | -------------------------------------------------------------------- |
| Name     | Min 20 characters, Max 60 characters                                 |
| Address  | Max 400 characters                                                   |
| Password | 8–16 characters, at least 1 uppercase letter and 1 special character |
| Email    | Must follow standard email format                                    |

---

## 🔄 Sorting & Filtering

* All tabular views support:

  * Ascending / Descending sorting
  * Filtering by Name, Email, Address, Role
* Implemented consistently across:

  * Admin dashboards
  * Store listings

---

 

## 🗃️ Database Design Principles

* Fully normalized schema
* Strong foreign key constraints
* Clear ownership relationships
* Optimized for read-heavy dashboards
* Designed for scalability and future extensions

## 🗄️ Database Design (ER Diagram)

### Core Entities

* **User**
* **Store**
* **Rating**

### Relationships

* One **User (Store Owner)** → Many **Stores**
* One **User** → Many **Ratings**
* One **Store** → Many **Ratings**

```
User ───< Store ───< Rating
  │                 ^
  └────────<────────┘
```

This design ensures:

* No redundant data
* Accurate ownership tracking
* Efficient analytics queries

---

## 🐳 Dockerized Architecture

StoreSphere is fully containerized.

### Services

* Frontend (React + Nginx)
* Backend (NestJS)
* Database (MySQL)

### Run Locally

```bash
docker-compose up --build
```

### Ports

* Frontend → `http://localhost:5173`
* Backend API → `http://localhost:3000`
* MySQL → `3306`

> Environment variables are managed using `.env.example`
> Secrets are **never committed**

---

## ☁️ Cloud Deployment (Render)

The project includes a **declarative `render.yaml`** file that enables:

* One-click backend deployment
* Managed database integration
* Secure environment variable injection

This mirrors **real production workflows** used in industry.

---

## 🔐 Security Practices

* Passwords hashed using **bcrypt**
* JWT-based authentication
* Role guards at controller & route level
* Environment-driven secrets
* No credentials committed to GitHub

---

## 🧪 Engineering Principles Followed

* Separation of concerns
* Modular backend architecture
* Atomic Git commits
* Infrastructure as code
* Environment parity (local = cloud)

---

## 📈 Future Improvements

* Store categories & images
* Pagination & search optimization
* Admin analytics dashboard
* CI/CD via GitHub Actions
* Redis caching for ratings

---

## 🧑‍💻 Author

**Anuj Gadekar**
Computer Engineer
Full-Stack Developer | System Design Enthusiast

> This project reflects my approach to building **maintainable, scalable, and secure software systems**.

---

 

StoreSphere is not just a CRUD app.
It is a **complete system** designed with **real-world constraints**, **deployment readiness**, and **engineering discipline** in mind.
