# Ng17Dotnet8RoleBasedAuthJWT

## Introduction

Ng17Dotnet8RoleBasedAuthJWT is a comprehensive project demonstrating the implementation of role-based authentication and authorization in a full-stack web application. This solution combines an Angular 17 front-end with a .NET 8 back-end, secured by JSON Web Tokens (JWT). The project serves as both a working example and a template for building secure, role-based web applications.

## Features

- **Role-based Authentication**: Secure routes and endpoints based on user roles (Admin, Manager, User)
- **JWT Authentication**: Secure, stateless authentication using JSON Web Tokens
- **Angular 17 Front-End**: Modern, component-based UI with Angular's latest features
- **Routing Protection**: Route guards to prevent unauthorized access to protected views
- **.NET 8 Back-End**: Latest version of Microsoft's server-side framework
- **Entity Framework Core**: ORM for database interactions
- **API Documentation**: Swagger integration for API documentation
- **Middleware Implementation**: Custom middleware for JWT validation and role-based access control
- **Refresh Token Support**: Implementation of refresh tokens for enhanced security
- **Password Hashing**: Secure storage of user credentials
- **Error Handling**: Centralized error handling mechanism

## Technologies

### Frontend
- **Angular 17**: Latest version of the popular frontend framework
- **Angular Material**: UI component library for consistent design
- **RxJS**: Library for reactive programming
- **TypeScript**: Statically typed superset of JavaScript
- **Angular JWT**: Library for JWT handling in Angular applications

### Backend
- **.NET 8**: Latest version of Microsoft's development platform
- **ASP.NET Core**: Framework for building web applications
- **Entity Framework Core**: ORM for database access
- **Identity Framework**: User management and authentication library
- **JWT Authentication**: Authentication middleware
- **Swagger/OpenAPI**: API documentation

### Database
- **SQL Lite**: Lightweight, file-based database (configurable to use other databases)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or higher) and **npm** (version 9.x or higher)
- **.NET 8 SDK**
- **Visual Studio Code** or any preferred code editor
- **SQL Server** (optional - project defaults to SQLite)

## Project Structure

```
Ng17Dotnet8RoleBasedAuthJWT/
│
├── ClientApp/                        # Angular front-end application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/           # Angular components
│   │   │   ├── guards/               # Route guards
│   │   │   ├── models/               # TypeScript models/interfaces
│   │   │   ├── services/             # Angular services
│   │   │   └── interceptors/         # HTTP interceptors (for JWT)
│   │   ├── environments/             # Environment configurations
│   │   └── assets/                   # Static assets
│   └── ...
│
├── ServerApp/                        # .NET 8 back-end application
│   ├── Controllers/                  # API controllers
│   ├── Data/                         # Database context and repositories
│   ├── Helpers/                      # Helper classes
│   ├── Middleware/                   # Custom middleware
│   ├── Models/                       # C# models
│   ├── Services/                     # Business logic services
│   └── ...
│
└── README.md                         # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Ng17Dotnet8RoleBasedAuthJWT.git
   cd Ng17Dotnet8RoleBasedAuthJWT
   ```

2. **Set up the backend**
   ```bash
   cd ServerApp
   dotnet restore
   dotnet ef database update     # Applies migrations to create the database
   ```

3. **Set up the frontend**
   ```bash
   cd ../ClientApp
   npm install
   ```

## Running the Application

1. **Start the backend server**
   ```bash
   cd ServerApp
   dotnet run
   ```
   The API will be available at `https://localhost:5001` by default

2. **Start the frontend development server**
   ```bash
   cd ../ClientApp
   ng serve
   ```
   The Angular application will be available at `http://localhost:4200`

3. **Access the application**
   Open your browser and navigate to `http://localhost:4200`

## Usage

### Default Users

The application comes with three pre-configured user accounts:

1. **Admin User**
   - Username: admin@example.com
   - Password: Admin123!
   - Role: Admin

2. **Manager User**
   - Username: manager@example.com
   - Password: Manager123!
   - Role: Manager

3. **Regular User**
   - Username: user@example.com
   - Password: User123!
   - Role: User

### Key Features Implementation

#### JWT Authentication Flow

1. User submits login credentials
2. Server validates credentials and issues JWT + refresh token
3. JWT is stored in the browser (localStorage/sessionStorage)
4. JWT is included in the Authorization header for API requests
5. Server validates JWT for each protected endpoint request
6. When JWT expires, refresh token is used to obtain a new JWT

#### Role-Based Authorization

The application implements role-based access control:
- **Admin**: Can access all features and manage users
- **Manager**: Can access management features but not user administration
- **User**: Can access only basic features

#### Protected Routes

Angular route guards (`AuthGuard`, `RoleGuard`) protect routes based on authentication status and user roles:

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] } 
  },
  // More routes...
];
```

#### API Protection

.NET endpoints are protected using the `[Authorize]` attribute with role requirements:

```csharp
[Authorize(Roles = "Admin")]
[HttpGet("users")]
public async Task<IActionResult> GetAllUsers()
{
    // Implementation...
}

[Authorize(Roles = "Admin,Manager")]
[HttpGet("reports")]
public async Task<IActionResult> GetReports()
{
    // Implementation...
}
```

## Key Components

### Backend

1. **JWT Authentication Service**: Handles token generation and validation
2. **User Service**: Manages user operations and role assignments
3. **Authorization Middleware**: Processes JWT tokens and applies role-based restrictions
4. **Controllers**: API endpoints for authentication, user management, and application features

### Frontend

1. **Authentication Service**: Manages login, logout, and token storage
2. **JWT Interceptor**: Automatically adds JWT to HTTP requests
3. **Role Guard**: Protects routes based on user roles
4. **Auth Guard**: Protects routes based on authentication status
5. **User Service**: Communicates with user-related API endpoints

## Configuration

### Backend Configuration (appsettings.json)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=app.db"
  },
  "JwtSettings": {
    "Secret": "YOUR_SECRET_KEY_HERE",
    "Issuer": "Ng17Dotnet8RoleBasedAuthJWT",
    "Audience": "Ng17Dotnet8RoleBasedAuthJWT_Users",
    "ExpiryInMinutes": 60,
    "RefreshTokenExpiryInDays": 7
  }
}
```

### Frontend Configuration (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

## Security Considerations

This project implements several security best practices:

- **JWT Storage**: Tokens are stored securely and cleared upon logout
- **Password Hashing**: Passwords are never stored in plain text
- **HTTPS**: All communication should be over HTTPS in production
- **Token Expiration**: JWTs have a limited lifespan
- **Refresh Tokens**: Securely managed for enhanced security
- **CORS**: Properly configured Cross-Origin Resource Sharing
- **XSS Protection**: Measures to prevent cross-site scripting

## Extending the Project

### Adding New Roles

1. Update the `ApplicationRole` enum in the backend
2. Add role-specific permissions in the authorization logic
3. Update frontend route guards to recognize the new role
4. Create role-specific components and views

### Adding New Features

1. Create new API endpoints with appropriate role restrictions
2. Implement corresponding frontend services and components
3. Update navigation and UI to include new features
4. Ensure proper authorization is applied

## Troubleshooting

### Common Issues

1. **401 Unauthorized Errors**:
   - Check if JWT token is properly included in requests
   - Verify token hasn't expired
   - Ensure correct roles are assigned to the user

2. **Database Connection Issues**:
   - Verify connection string in appsettings.json
   - Ensure migrations have been applied

3. **CORS Errors**:
   - Check CORS configuration in the backend
   - Verify frontend is making requests to the correct URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular Team for Angular 17
- Microsoft for .NET 8 and ASP.NET Core
- All open-source contributors whose libraries are used in this project
