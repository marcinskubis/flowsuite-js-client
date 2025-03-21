# FlowSuite Client

📌 **Frontend of FlowSuite - A Task Management Application**

## 🚀 Getting Started

Follow these steps to set up and run the client:

### 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/flowsuite-client.git
   cd flowsuite-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `config.js` file inside the `src` folder (see below for setup instructions).

### ▶️ Running the App

```sh
npm run dev
```

The application will be available at: [http://localhost:5173/](http://localhost:5173/)

## ⚙️ Required Configuration: `config.js`

To run the client application, you need to create a `config.js` file inside the `src` directory.

### 📄 Steps to Set Up:
1. Navigate to the `src` folder:
   ```sh
   cd src
   ```
2. Create a file named `config.js`:
   ```sh
   touch config.js
   ```
3. Open `config.js` and add the following content:
   ```js
   export const GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com";
   export const URL = "https://your-backend-url.com";
   ```
4. Replace `your-google-client-id` and `your-backend-url.com` with your actual credentials.

### 🔐 Security Note:
This file is **excluded from version control** using `.gitignore`. If you're sharing this project, make sure others create their own `config.js` file.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite  
- **State Management:** Zustand  
- **Styling:** Tailwind CSS  
- **Data Fetching:** SWR  
- **Date Handling:** Day.js  
- **Roadmap module:** ReactFlow  

---

## 🏗 Project Structure

```
flowsuite-client/
│── src/
│   ├── components/   # Reusable UI components
│   ├── store/        # Zustand store
│   ├── utils/        # Utility functions
│   ├── main.jsx      # Entry point
│── public/           # Static assets
│── package.json      # Dependencies and scripts
```

---

## 📝 Features

✅ Project and Task Management  
✅ Drag & Drop Task Reordering  
✅ Role-Based Access Control  

---

## 🔗 Deployment

- **Client:** Coming Soon  
- **API:** Coming Soon  

## 🚀 TypeScript Version (Coming Soon)

I am currently working on a **TypeScript version** of FlowSuite to improve type safety and maintainability. It will be available in the future.
---
