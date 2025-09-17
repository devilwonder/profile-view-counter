# Profile View Counter API

A simple Node.js API for tracking profile views with Railway deployment support.

## 🚀 Features

- **Real-time view counting** with unique visitor tracking
- **Custom SVG badges** for GitHub README
- **Railway deployment ready** with proper configuration
- **CORS enabled** for cross-origin requests
- **Health check endpoint** for monitoring
- **Graceful shutdown** handling

## 📊 API Endpoints

### GET `/`
- Returns API status and current view count

### GET `/api/views`
- Returns current view count and statistics

### POST `/api/views`
- Increments view count and tracks unique visitors

### GET `/api/badge`
- Returns custom SVG badge for GitHub README
- Query parameters:
  - `label`: Badge label (default: "Profile Views")
  - `color`: Badge color (default: "00D4FF")
  - `style`: Badge style (default: "for-the-badge")

### GET `/health`
- Health check endpoint for monitoring

## 🚀 Railway Deployment

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Connect your GitHub account
   - Create new project
   - Select this repository
   - Railway will auto-deploy

3. **Environment Variables**
   - `NODE_ENV`: production
   - `PORT`: 3000 (auto-set by Railway)

4. **Custom Domain** (Optional)
   - Add custom domain in Railway dashboard
   - Update badge URLs in GitHub README

## 📝 Usage in GitHub README

Replace your current badge with:

```markdown
<img src="https://your-railway-app.railway.app/api/badge?label=Profile%20Views&color=00D4FF&style=for-the-badge" alt="Profile Views" />
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 📊 Monitoring

- **Health Check**: `GET /health`
- **View Statistics**: `GET /api/views`
- **Real-time Logs**: Check Railway dashboard

## 🛠️ Customization

- Modify badge colors and styles
- Add database persistence (PostgreSQL, MongoDB)
- Implement rate limiting
- Add authentication for admin endpoints

## 📈 Performance

- **In-memory storage** for fast access
- **CORS enabled** for cross-origin requests
- **Graceful shutdown** for zero-downtime deployments
- **Health checks** for monitoring

## 🔒 Security

- **Helmet.js** for security headers
- **CORS** properly configured
- **Input validation** and sanitization
- **Error handling** with proper status codes

## 📝 License

MIT License - feel free to use and modify!
