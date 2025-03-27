# Event Countdown Tracker - Development Guide

## Project Overview
A modern mobile application built with React Native and Expo that helps users track countdown timers for their important events. The app features a clean, modern UI with a focus on user experience and visual appeal.

## Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with modern design system
- **Date/Time**: react-native-modal-datetime-picker
- **Icons**: @expo/vector-icons (Ionicons)

## Architecture
The project follows MVVM (Model-View-ViewModel) architecture:
- **Models**: Domain entities and business logic
- **ViewModels**: State management and business operations
- **Views**: React Native components and UI logic

### Directory Structure
```
src/
├── domain/
│   ├── entities/
│   │   └── Event.ts
│   └── repositories/
├── presentation/
│   ├── components/
│   │   ├── CountdownCard.tsx
│   │   └── EventForm.tsx
│   ├── screens/
│   │   └── HomeScreen.tsx
│   └── viewmodels/
│       └── HomeViewModel.ts
└── constants/
    └── theme.ts
```

## Features Implemented

### 1. Event Management
- Create new events with:
  - Name (required)
  - Date and time (required)
  - Description (optional)
  - Category (optional)
  - Custom color selection
  - Icon selection
- Edit existing events
- Delete events

### 2. UI Components

#### HomeScreen Layout
- **Header**: App title and notification icon
- **Search Bar**: Filter events by name, description, or category
- **Next Event Section**:
  - Featured card showing the next upcoming event
  - Prominent countdown display
  - Event image and details
- **Other Events Section**:
  - List of all other events in chronological order
  - Compact card design
  - Basic event information with countdown
- **Tab Bar**:
  - Centered "Add Event" button
  - Always visible for quick event creation

#### EventForm Component
- Modal-based form with slide-up animation
- Form fields:
  - Event name input
  - DateTime picker (using react-native-modal-datetime-picker)
  - Description textarea
  - Category input
  - Color selector (8 predefined colors)
  - Icon selector (7 predefined icons)
- Validation and error handling
- Responsive layout with ScrollView

#### CountdownCard Component
Two variants:
1. Featured:
   - Large card with prominent countdown
   - Shows days, hours, minutes
   - Displays event icon and color
2. Trending:
   - Compact card design
   - Shows basic event info
   - Simplified countdown display

### 3. Theme System
Consistent design system with:
- Colors:
  ```typescript
  COLORS: {
    background: string
    surface: string
    border: string
    text: {
      primary: string
      secondary: string
      light: string
    }
  }
  ```
- Typography:
  ```typescript
  TYPOGRAPHY: {
    heading: {
      h1: TextStyle
      h2: TextStyle
    }
    body: {
      large: TextStyle
      medium: TextStyle
      small: TextStyle
    }
  }
  ```
- Border Radius:
  ```typescript
  BORDER_RADIUS: {
    sm: number
    lg: number
    xl: number
    round: number
  }
  ```
- Shadows:
  ```typescript
  SHADOWS: {
    small: ViewStyle
    medium: ViewStyle
    large: ViewStyle
  }
  ```

## State Management
Using Zustand for global state management:
- Event list storage
- CRUD operations for events
- Filtering and sorting capabilities

## Best Practices Implemented
1. **TypeScript**:
   - Strict type checking enabled
   - Interfaces for all props and entities
   - Type safety in component props

2. **Performance**:
   - Memoization where needed
   - Efficient re-rendering strategies
   - Proper state management

3. **Code Organization**:
   - Modular component structure
   - Separation of concerns
   - Clean and maintainable code

4. **UI/UX**:
   - Consistent spacing and typography
   - Visual feedback on interactions
   - Smooth animations
   - Platform-specific considerations

## Future Enhancements
1. **Features to Add**:
   - Event sharing
   - Push notifications
   - Calendar integration
   - Custom themes
   - Event categories management
   - Search and filtering
   - Home screen widgets

2. **Technical Improvements**:
   - Offline support
   - Data persistence
   - Unit tests
   - E2E tests
   - Performance optimization
   - Analytics integration

## Common Issues and Solutions
1. **DateTimePicker Issues**:
   - Use react-native-modal-datetime-picker instead of @react-native-community/datetimepicker
   - Handle platform differences through the modal interface
   - Proper state management for picker visibility

2. **Form Validation**:
   - Implement Zod schemas for validation
   - Use React Hook Form for form state
   - Handle all edge cases and error states

3. **Style Consistency**:
   - Use theme constants
   - Follow design system guidelines
   - Maintain platform-specific adaptations

## Development Workflow
1. Create feature branch
2. Implement changes following MVVM pattern
3. Test on both iOS and Android
4. Submit PR with detailed description
5. Review and merge after approval

## Testing Guidelines
1. Test on both iOS and Android
2. Verify all form validations
3. Check edge cases
4. Verify UI consistency
5. Test offline behavior
6. Verify data persistence

## Maintenance Notes
- Keep dependencies updated
- Monitor performance metrics
- Regular code reviews
- Documentation updates
- Regular backups of user data
- Monitor crash reports and analytics

---

Last Updated: [Current Date]
Version: 1.0.0 