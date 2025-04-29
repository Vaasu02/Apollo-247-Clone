# Apollo 247 Clone

This is a clone of the Apollo 247 doctor listing page, built with Next.js, MongoDB, and TypeScript.

## Features

- Doctor listing with filters
- Pagination
- Responsive design
- SEO optimization
- MongoDB integration

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd apollo-clone
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/apollo-clone
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

6. Seed the database with sample data:

```
http://localhost:3000/api/seed
```

## How to Add a New Doctor

You already have an API endpoint for adding a doctor:

**POST** `/api/doctors`

Example using `curl`:

```bash
curl -X POST http://localhost:3000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Jane Doe",
    "specialization": "General Physician",
    "experience": 12,
    "languages": ["English", "Hindi"],
    "consultationFee": 700,
    "rating": 4.9,
    "reviewCount": 50,
    "imageUrl": "https://randomuser.me/api/portraits/women/10.jpg",
    "gender": "Female",
    "availability": {
      "today": ["10:00 AM", "11:00 AM"],
      "tomorrow": ["09:00 AM", "10:00 AM"]
    },
    "education": ["MBBS, MD - General Medicine"],
    "about": "Dr. Jane Doe is a highly experienced general physician.",
    "location": {
      "address": "123 Clinic Road",
      "city": "Delhi",
      "state": "Delhi",
      "pincode": "110001"
    }
  }'
```

You can also use Postman or any REST client to send a POST request to `/api/doctors` with the above JSON body.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
- `src/lib`: Utility functions and API clients
- `src/models`: MongoDB models
- `src/types`: TypeScript type definitions

## API Endpoints

- `GET /api/doctors`: List doctors with filters and pagination
- `POST /api/doctors`: Add a new doctor
- `GET /api/seed`: Seed the database with sample data

## Technologies Used

- Next.js 14
- TypeScript
- MongoDB
- Mongoose
- Tailwind CSS
- React Query
- Axios
- React Icons
- Next SEO

