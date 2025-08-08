# Firebase Setup Guide for Testimonials

This guide will help you set up Firebase/Firestore to store and retrieve user testimonials.

## Prerequisites

1. A Google account
2. Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "portfolio-testimonials")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development) or "Start in production mode" (for production)
4. Select a location for your database (choose one close to your users)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (`</>`) to add a web app
5. Enter an app nickname (e.g., "Portfolio Website")
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env` in your project root:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration in the `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
   VITE_FIREBASE_APP_ID=your-actual-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-actual-measurement-id
   ```

## Step 5: Install Firebase SDK

Run the following command in your project directory:
```bash
npm install firebase
```

## Step 6: Set up Firestore Security Rules (Optional but Recommended)

1. In Firebase Console, go to "Firestore Database"
2. Click on "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to testimonials
    match /testimonials/{document} {
      allow read: if true;
      allow write: if request.auth == null && 
        request.resource.data.keys().hasAll(['name', 'role', 'text', 'stars']) &&
        request.resource.data.name is string &&
        request.resource.data.role is string &&
        request.resource.data.text is string &&
        request.resource.data.stars is number &&
        request.resource.data.stars >= 1 &&
        request.resource.data.stars <= 5;
    }
  }
}
```

4. Click "Publish"

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the testimonials section
3. Try adding a new testimonial
4. Check your Firestore console to see if the data was saved

## Troubleshooting

### Common Issues:

1. **"Firebase not defined" error**: Make sure you've installed the Firebase SDK
2. **"Permission denied" error**: Check your Firestore security rules
3. **Environment variables not working**: Make sure your `.env` file is in the project root and variables start with `VITE_`

### Firestore Collection Structure

The testimonials will be stored in a collection called `testimonials` with the following structure:

```javascript
{
  name: "John Doe",
  role: "Client",
  text: "Great work! Highly recommended.",
  stars: 5,
  initials: "JD",
  createdAt: timestamp,
  approved: false
}
```

## Production Considerations

1. **Security Rules**: Update Firestore rules for production use
2. **Moderation**: Implement testimonial approval system
3. **Rate Limiting**: Add rate limiting to prevent spam
4. **Environment Variables**: Use secure environment variable management in production

## Support

If you encounter any issues, check:
1. Firebase Console for error logs
2. Browser developer console for JavaScript errors
3. Network tab to see if requests are being made to Firebase
