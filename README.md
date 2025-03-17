# Article App

## Overview
The Article App is a web-based platform that allows users to view, like, dislike, and block articles. It features a clean UI with support for user interactions such as liking/disliking articles and blocking unwanted content.

## Features
- View articles with details including title, author, category, and content.
- Like and dislike articles.
- Block articles to remove them from view.
- Responsive and user-friendly interface.
- Dynamic updates on likes and dislikes.

## 🎯 Project Structure
```
📂 ARTICLEFEED
 ├── 📂 client (Frontend)
 │   ├── src/components (React Components)
 │   ├── src/shared (Reusable UI)
 │   ├── src/App.tsx (Main Component)
 │   ├── src/index.tsx (Entry Point)
 │   ├── package.json
 │   └── ...
 │
 ├── 📂 server (Backend)
 │   ├── 📂 config (Database & Cloudinary Config)
 │   ├── 📂 controllers (OCR & Image Handling)
 │   ├── 📂 models (Mongoose Models)
 │   ├── 📂 routes (Express Routes)
 │   ├── app.ts (Main Server File)
 │   ├── package.json
 │   └── ...
 │
 ├── README.md
```


## Technologies Used
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **API Communication:** Axios

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/moideenshacp/Article_Feed.git
   cd ARTICLEFEED
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```

4. **Backend Setup:**
   Ensure the backend API is running and properly connected to the database.


## Usage
- Users can browse articles, like/dislike them, and block them if necessary.
- The app dynamically updates the like and dislike counts upon user interaction.
- Clicking the block button hides the article from view.

## Troubleshooting
- If you encounter `TypeError: article.likes.includes is not a function`, ensure that the `likes` and `dislikes` fields are arrays in the API response.
- If API calls fail, check the backend server logs and database connection.

## Future Enhancements
- Implement user authentication for personalized likes and dislikes.
- Add a comments section for discussions.
- Improve error handling and notifications.

## License
This project is licensed under the MIT License.

