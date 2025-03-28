# Project Structure Documentation

## Overview
This document outlines the project structure and coding patterns for the Event Countdown Tracker app. The project follows MVVM (Model-View-ViewModel) architecture and uses modern React Native with TypeScript practices.

## Directory Structure

```
src/
├── app/                    # App entry point and navigation setup
├── assets/                # Static assets (images, fonts, etc.)
├── components/            # Reusable UI components
│   ├── common/           # Shared components (buttons, inputs, etc.)
│   └── features/         # Feature-specific components
├── core/                  # Core functionality and configurations
│   ├── config/          # App configurations
│   ├── theme/           # Theme definitions
│   └── navigation/      # Navigation types and utilities
├── data/                 # Data layer
│   ├── repositories/    # Repository implementations
│   └── datasources/     # Data sources (API, local storage)
├── domain/              # Business logic and models
│   ├── entities/       # Domain entities
│   ├── repositories/   # Repository interfaces
│   └── usecases/      # Business logic use cases
├── presentation/        # UI layer (screens and view models)
│   ├── screens/        # Screen components
│   └── viewmodels/     # View models for screens
├── shared/             # Shared utilities and types
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   └── types/         # Shared TypeScript types
└── store/             # State management (Zustand)
    └── slices/        # State slices for different features
```

## Architecture Guidelines

### MVVM Pattern
- **Model**: Domain entities and business logic
- **View**: React Native components (screens and UI components)
- **ViewModel**: State management and business logic presentation

### Component Structure
Each component should follow this structure:
```typescript
// ComponentName.tsx
import { View } from 'react-native';
import { styles } from './styles';

interface ComponentNameProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
};
```

### Styles Structure
```typescript
// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

### State Management
- Use Zustand for global state management
- Keep state slices organized by feature
- Follow immutable state updates

### TypeScript Guidelines
- Use interfaces for component props
- Use type for simple type definitions
- Enable strict mode
- Avoid any type

### Naming Conventions
- Components: PascalCase (e.g., `EventCard.tsx`)
- Files: kebab-case (e.g., `use-event-countdown.ts`)
- Directories: kebab-case (e.g., `event-list/`)
- Interfaces: PascalCase with 'Props' suffix for component props
- Types: PascalCase
- Constants: UPPER_SNAKE_CASE

### Code Organization
1. Imports (external libraries first, then internal)
2. Types/Interfaces
3. Constants
4. Component definition
5. Styles

## Feature Implementation Pattern

For each feature, follow this structure:
```
feature-name/
├── components/          # Feature-specific components
├── screens/            # Feature screens
├── viewmodels/         # View models
├── types.ts           # Feature-specific types
└── store/             # Feature state management
    └── slice.ts       # Zustand slice
```

## Testing Guidelines
- Unit tests for business logic
- Component tests for UI components
- Integration tests for features
- E2E tests for critical user flows

## Performance Guidelines
- Use React.memo for expensive renders
- Implement proper list virtualization
- Optimize images and assets
- Use proper key props in lists

## Accessibility
- Implement proper accessibility labels
- Support screen readers
- Maintain proper contrast ratios
- Support dynamic text sizing 