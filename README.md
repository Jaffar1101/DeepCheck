# DeepCheck - AI-Powered Misinformation Detection Tool

DeepCheck is an advanced AI-powered tool designed to combat misinformation and educate users on identifying credible, trustworthy content. Built with modern web technologies, it provides real-time analysis of text, images, videos, audio files, and URLs to detect potential misinformation.

## 🎯 Problem Statement

The rapid spread of fake news and misinformation across social media and messaging platforms poses a severe threat globally. This digital contagion can lead to social unrest, public health crises, and widespread financial scams. A major contributing factor is the lack of accessible tools that allow users to quickly verify the information they encounter or to understand the manipulative techniques used to create and spread misleading content.

## 🚀 Features

### Core Detection Capabilities

- **Text Analysis**: Analyze news articles, social media posts, and any text content for misinformation patterns
- **URL Verification**: Verify the credibility of news articles and web pages
- **Media Authenticity**: Detect manipulated images, deepfake videos, and synthesized audio
- **Source Verification**: Cross-reference content with trusted authoritative sources

### Advanced Analysis Features

- **Red/Green Flag System**: Clear visual indicators showing content authenticity
- **Detailed Reasoning**: Comprehensive explanations of why content is flagged as suspicious or verified
- **Trust Score**: Numerical confidence rating for content authenticity
- **Source Credibility Analysis**: Evaluation of information sources and their reliability
- **Cross-Verification**: Comparison with multiple trusted sources

### User Experience

- **Real-time Results**: Get analysis results in seconds
- **Interactive Dashboard**: Monitor analysis history and trends
- **Educational Insights**: Learn about manipulation techniques and digital literacy
- **Export Reports**: Download detailed analysis reports
- **Multi-format Support**: Analyze text, images, videos, audio files, and URLs

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Animation**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **3D Graphics**: Three.js with React Three Fiber
- **Build Tool**: Vite for fast development and building
- **Package Manager**: npm

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/DeepCheck.git
   cd DeepCheck
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Deploy with default settings

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages` (already included)
2. Build and deploy: `npm run deploy`
3. Configure GitHub Pages in repository settings to use gh-pages branch
4. Your app will be available at: `https://yourusername.github.io/DeepCheck`

## 🎨 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard components
│   │   ├── dashboard-page.tsx
│   │   ├── upload-section.tsx
│   │   ├── results-section.tsx
│   │   └── ...
│   ├── landing/           # Landing page components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── pages/               # Page components
└── assets/              # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=DeepCheck
VITE_API_URL=your-api-endpoint
```

### Customization

- **Styling**: Modify `src/index.css` for global styles
- **Theme**: Update `tailwind.config.ts` for theme customization
- **Components**: All UI components are in `src/components/ui/`

## 🎯 How It Works

1. **Content Input**: Users can input content through three methods:

   - Upload media files (images, videos, audio)
   - Paste text content
   - Enter URLs for web content

2. **AI Analysis**: The system analyzes content using multiple detection methods:

   - Text pattern analysis for misinformation indicators
   - Source credibility verification
   - Media authenticity checks
   - Cross-reference with trusted sources

3. **Results Display**: Users receive:

   - Clear red/green flag indicators
   - Trust score percentages
   - Detailed reasoning for the assessment
   - Source verification information
   - Confidence levels for the analysis

4. **Educational Component**: Users learn:
   - Why content was flagged
   - Manipulation techniques used
   - How to identify similar content in the future

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- Powered by [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**DeepCheck** - Empowering users to combat misinformation through AI-powered analysis and education.
