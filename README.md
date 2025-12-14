🏠 PropertyPulse - Modern Property Listing Platform
A full-stack property rental platform built with Next.js 16, MongoDB, and NextAuth, featuring real-time messaging, bookmarking, and advanced search capabilities.

<img src="https://img.shields.io/badge/Next.js-16.0-black" alt="Next.js">

<img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript">

<img src="https://img.shields.io/badge/MongoDB-7.0-green" alt="MongoDB">

<img src="https://img.shields.io/badge/Tailwind-4.0-38bdf8" alt="Tailwind CSS">

📋 Table of Contents

- Overview
- Business Use Cases
- Features
- Tech Stack

🎯 Overview
PropertyPulse is a comprehensive property listing and rental management platform that connects property owners with potential renters. The platform offers a seamless experience for browsing, searching, and managing rental properties with features like real-time messaging, bookmarking, and interactive maps.

💼 Business Use Cases

- This platform is ideal for:

🏢 Property Management Companies

- Manage multiple property listings
- Track inquiries and messages from potential tenants
- Showcase featured properties
- Automated messaging system for tenant communication

🏘️ Real Estate Agencies

- List rental properties for short-term and long-term rentals
- Provide detailed property information with high-quality images
- Enable direct communication between agents and clients
- Track property views and bookmarks

🌐 Vacation Rental Services

- List vacation homes, apartments, and cabins
- Flexible pricing (nightly, weekly, monthly rates)
- Location-based search with interactive maps
- User authentication and booking management

👤 Individual Property Owners

- Self-service property listing
- Direct tenant communication
- Profile management
- Bookmark potential tenants' inquiries

✨ Features
🔐 Authentication & Authorization

- Google OAuth integration via NextAuth
- JWT-based session management
- Protected routes for authenticated users
- User profile management

🏡 Property Management

- CRUD Operations: Create, Read, Update, Delete properties
- Image Upload: Multiple image support via Cloudinary
- Featured Properties: Highlight premium listings
- Property Types: Apartment, Condo, House, Cabin, Studio, Room, etc.
- Flexible Pricing: Nightly, weekly, and monthly rates

🔍 Advanced Search & Discovery

- Location-based Search: Search by city, state, street, or zipcode
- Type Filtering: Filter by property type
- Recent Properties: Display latest listings
- Pagination: Efficient browsing with configurable page sizes

💬 Messaging System

- Direct property owner-renter communication
- Read/Unread message tracking
- Real-time unread count notifications
- Message deletion and management

⭐ User Interactions

- Bookmarking: Save favorite properties
- Share Properties: Social media integration (Facebook, Twitter, WhatsApp, Email)
- Contact Forms: Inquiry forms with validation

🗺️ Interactive Maps

- Mapbox integration for property locations
- Google Geocoding API for address validation
- Pin markers for exact locations
- Interactive map exploration

🎨 UI/UX Features

- Dark Mode: Theme switching with next-themes
- Responsive Design: Mobile-first approach with Tailwind CSS
- Loading States: Spinners and skeleton screens
- Toast Notifications: Real-time feedback with react-toastify
- Image Galleries: Photoswipe integration for image viewing

🛠️ Tech Stack

### Frontend

- Framework: Next.js 16 (App Router)
- Language: TypeScript 5.0
- Styling: Tailwind CSS 4.0
- ### UI Components:
- - Radix UI (Dropdown menus)
- - shadcn/ui components
- - Lucide React (Icons)
- - React Icons
- Image Optimization:
- Next.js Image component
- Cloudinary (next-cloudinary)
- Maps: react-map-gl with Mapbox
- State Management: Zustand
- Forms: React Hook Form patterns
- Notifications: react-toastify

### Backend

- Runtime: Node.js
- Framework: Next.js API Routes (Server Actions)
- Database: MongoDB 7.0 with Mongoose 9.0
- Authentication: NextAuth 4.24 with Google Provider
- File Storage: Cloudinary
- Geocoding: react-geocode (Google API)

### Developer Tools

- Package Manager: npm/yarn
- Linting: ESLint
- Type Checking: TypeScript
- CSS: PostCSS with Tailwind

Data Flow

1. Client Request → Next.js App Router
2. Server Components → Fetch data directly from MongoDB
3. Client Components → Use Server Actions for mutations
4. Server Actions → Validate, process, revalidate cache
5. Response → Return to client with updated data
