# Fab & Fierce Fashion Store

A modern, full-stack e-commerce platform built with Next.js, FastAPI, and SQLite, featuring a beautiful UI and rich functionality for fashion retail.

## Features

### User Interface
- 🎨 Modern, responsive design with smooth animations
- 🌓 Light/Dark mode support
- 🔍 Advanced search functionality with text and visual search
- 📱 Mobile-friendly layout

### Shopping Experience
- 🛍️ Product browsing by categories
- ❤️ Wishlist functionality
- 🛒 Shopping cart with real-time updates
- 🔎 Visual search for finding similar products
- 🏷️ Sale items and special offers

### User Management
- 👤 User authentication and profiles
- 📦 Order tracking
- 💝 Wishlist management
- 🔐 Secure login and registration

### Product Features
- 📸 High-quality product images
- 🎯 Detailed product descriptions
- ⭐ Product ratings and reviews
- 🎨 Multiple color and size options
- 📊 Stock tracking

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Zustand for State Management
- React Hook Form
- Zod for Validation

### Backend
- FastAPI
- SQLite Database
- SQLAlchemy ORM
- JWT Authentication
- Python 3.8+

## Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- pip (Python package manager)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/fab-fierce-fashion.git
cd fab-fierce-fashion
\`\`\`

2. Install frontend dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install backend dependencies:
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

### Running the Application

1. Start the backend server:
\`\`\`bash
cd backend
python main.py
\`\`\`

2. In a new terminal, start the frontend development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser and navigate to \`http://localhost:3000\`

## Project Structure

\`\`\`
fab-fierce-fashion/
├── app/                    # Next.js pages and layouts
├── components/             # React components
├── lib/                    # Utility functions and hooks
├── styles/                 # Global styles and Tailwind config
├── public/                 # Static assets
├── backend/               
│   ├── main.py            # FastAPI application
│   ├── models.py          # Database models
│   ├── crud.py            # Database operations
│   └── database.py        # Database configuration
└── package.json           # Project dependencies
\`\`\`

## Key Features Implementation

### Visual Search
- Upload images to find similar products
- Supports drag-and-drop and file selection
- Shows similar products with hover effects

### Wishlist
- Add/remove products to/from wishlist
- Persistent storage across sessions
- Quick access from user menu

### Shopping Cart
- Real-time cart updates
- Size and color selection
- Quantity management
- Persistent storage

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern fashion e-commerce platforms
- Icons from Lucide React
- UI components from shadcn/ui
- Next.js team for the amazing framework 