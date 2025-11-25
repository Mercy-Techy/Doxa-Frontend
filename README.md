### Doxa a document oriented database management system with integrated file management

# Document-Oriented DBMS with integrated file management system

## Overview
This is the frontend interface for interacting with the custom **Document-Oriented Database Management System (DBMS)**.  
Users can:
- Create databases
- Create collections
- Manage documents
- Upload files
- View uploaded images/videos
- Inspect stored data visually

The frontend communicates with the backend API using TanStack Query for data fetching and state management.

## Tech Stack
- React (JavaScript)
- TanStack Query
- TailwindCSS
- Axios for API requests
- Cloudinary media previews (via URLs)
- Vite
## Features
- Dashboard listing all databases
- Create/Delete databases
- View collections inside a database
- Create/Delete collections
- Document viewer and editor
- File upload UI with preview support
- Image & video rendering
- Fetching and caching with TanStack Query
- Responsive TailwindCSS UI
