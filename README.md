# S-I-K-R-Y - AI-Powered Business Intelligence Platform

A comprehensive business intelligence platform that helps you discover, analyze, and engage with businesses using AI-powered search and data extraction.

## Features

### 🔍 Smart Search
- Natural language search with AI-powered query understanding
- Multi-source data aggregation (Google, LinkedIn, Crunchbase)
- Voice search capabilities
- Real-time suggestions and filters

### 🏢 Company Management
- Automated data extraction with confidence scoring
- Contact information detection (emails, phones, addresses)
- Technology stack identification
- Company relationship mapping

### 📧 Unified Communications
- Multi-channel outreach (Email, SMS, WhatsApp)
- Template management with AI enhancement
- Campaign tracking and analytics
- Spam protection and compliance monitoring

### 📊 Market Intelligence
- Competitor analysis and positioning
- Lead scoring with AI algorithms
- Market trend analysis
- Relationship graph visualization

### 🤖 AI-Powered Scrapers
- V2 scraper editor with natural language configuration
- Automated field detection
- Real-time preview and testing
- High-accuracy data extraction

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with ServiceNow-inspired design system
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Typography**: IBM Plex Sans font family
- **State Management**: React hooks and context
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-org/sikry-frontend.git
cd sikry-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your configuration values.

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
sikry-frontend/
├── app/                          # Next.js App Router pages
│   ├── (dashboard)/             # Dashboard layout group
│   │   ├── search/              # Company search
│   │   ├── companies/           # Company management
│   │   ├── comms/               # Communications hub
│   │   ├── market-intel/        # Market intelligence
│   │   ├── scrapers/            # Scraper management
│   │   └── admin/               # Administration
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── not-found.tsx            # 404 page
│   └── error.tsx                # Error boundary
├── components/                   # Reusable components
│   ├── core/                    # Core UI components
│   │   ├── layout/              # Layout components
│   │   ├── navigation/          # Navigation components
│   │   ├── typography/          # Typography components
│   │   ├── loading/             # Loading states
│   │   ├── error/               # Error handling
│   │   └── feedback/            # User feedback
│   ├── search/                  # Search-related components
│   ├── company/                 # Company management
│   ├── comms/                   # Communications
│   ├── market/                  # Market intelligence
│   ├── scraping/                # Scraper components
│   ├── data/                    # Data display components
│   └── ui/                      # Base UI components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── providers/                   # Context providers
└── public/                      # Static assets
\`\`\`

## Design System

### Colors
- **Primary**: #003C71 (ServiceNow Navy)
- **Secondary**: #5A697B (ServiceNow Gray)
- **Accent**: #00C6B1 (ServiceNow Teal)
- **Success**: #4BCA81 (Emerald for positive actions)
- **Warning**: #FFC400 (Amber)
- **Destructive**: #FF4D4D (Red)

### Typography
- **Font Family**: IBM Plex Sans
- **Scale**: h1 (36px), h2 (30px), h3 (24px), body (16px), caption (14px)

### Spacing
- **Base Unit**: 8px
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

## Development

### Code Style
- Use TypeScript for all components
- Follow React best practices
- Use Tailwind CSS for styling
- Implement responsive design mobile-first

### Component Guidelines
- Create reusable, composable components
- Use proper TypeScript interfaces
- Include accessibility attributes
- Follow the established design system

### Testing
\`\`\`bash
npm run test
# or
yarn test
\`\`\`

### Building for Production
\`\`\`bash
npm run build
# or
yarn build
\`\`\`

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Environment Variables

See `.env.example` for all required environment variables:

- **Application**: Basic app configuration
- **API**: Backend API endpoints and keys
- **Database**: Database connection strings
- **Authentication**: Auth service configuration
- **External APIs**: Third-party service keys
- **Communication**: Email, SMS, WhatsApp services
- **Analytics**: Tracking and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

Built with ❤️ using Next.js and the ServiceNow Design System
