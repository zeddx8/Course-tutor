const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

function build() {
  console.log('Building Course Tutor Web App...');
  
  const iconsPath = path.resolve(__dirname, '../src/lucide-react.tsx');
  const appPath = path.resolve(__dirname, '../src/CourseTutorApp.tsx');
  
  let iconsCode = fs.readFileSync(iconsPath, 'utf8');
  let appCode = fs.readFileSync(appPath, 'utf8');
  
  // Strip import React from icons
  iconsCode = iconsCode.replace(/import\s+React[^\n]*;/g, '');
  // Strip export from icons
  iconsCode = iconsCode.replace(/export\s+const\s+/g, 'const ');
  iconsCode = iconsCode.replace(/export\s+interface[^\n]*{[\s\S]*?}/g, '');
  
  // In appCode, remove the import of lucide-react and import React
  appCode = appCode.replace(/import\s+React,\s*\{\s*useState,\s*useMemo\s*\}\s*from\s*['"]react['"];/g, '');
  appCode = appCode.replace(/import\s*\{[\s\S]*?\}\s*from\s*['"]\.\/lucide-react['"];/g, '');
  
  // Replace export default function App with function CourseTutorApp
  appCode = appCode.replace(/export\s+default\s+function\s+App\s*\(/g, 'function CourseTutorApp(');
  
  // Combine into single source with React from window
  const combinedSource = `
const { useState, useMemo, useEffect, useRef, forwardRef } = React;

${iconsCode}

${appCode}

// Mount to DOM
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(CourseTutorApp));
}
`;

  console.log('Compiling with Babel...');
  const result = babel.transformSync(combinedSource, {
    presets: ['babel-preset-expo'],
    filename: 'CourseTutorWeb.tsx',
    compact: false,
    sourceMaps: false,
  });

  // Ensure dist directory exists
  const distDir = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write compiled JS bundle
  const bundlePath = path.join(distDir, 'app.bundle.js');
  // Wrap in IIFE so it doesn't pollute global scope except for mounting
  const wrappedCode = `(function() {\n${result.code}\n})();`;
  fs.writeFileSync(bundlePath, wrappedCode, 'utf8');
  console.log(`Saved ${bundlePath} (${(fs.statSync(bundlePath).size / 1024).toFixed(1)} KB)`);

  // Write modern index.html with design tokens from pro-dev-ui
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Course Tutor | CCTU Peer Tutoring Marketplace</title>
  <meta name="description" content="Verified peer tutoring platform for Cape Coast Technical University. Student, tutor, and administrative portal with Paystack Mobile Money escrow.">
  <meta name="theme-color" content="#0F5C3E">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230F5C3E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z'/><path d='M22 10v6'/><path d='M6 12.5V16a6 3 0 0 0 12 0v-3.5'/></svg>">

  <!-- Typography: Plus Jakarta Sans & JetBrains Mono per UI System specs -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Tailwind CSS via CDN with customized CCTU Design Tokens -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            cctu: {
              green: '#0F5C3E',
              'green-dark': '#0B462F',
              'green-light': '#ECF6F1',
              gold: '#C29B38',
              navy: '#0B2545',
            }
          },
          boxShadow: {
            'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            'subtle': '0 4px 20px -2px rgba(15, 92, 62, 0.06)',
          }
        }
      }
    }
  </script>

  <style>
    /* UI System baseline tokens */
    :root {
      --primary: #0F5C3E;
      --primary-hover: #0B462F;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #F8FAFC;
    }
    /* Smooth transitions and scrollbars */
    * {
      box-sizing: border-box;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #F1F5F9;
    }
    ::-webkit-scrollbar-thumb {
      background: #CBD5E1;
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94A3B8;
    }
  </style>

  <!-- React 18 & ReactDOM 18 -->
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen">
  <div id="root">
    <!-- Clean Loading Skeleton per pro-dev-ui states checklist -->
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="flex flex-col items-center gap-3">
        <div class="w-10 h-10 border-3 border-[#0F5C3E] border-t-transparent rounded-full animate-spin"></div>
        <div class="text-sm font-medium text-slate-600">Loading CCTU Course Tutor...</div>
      </div>
    </div>
  </div>

  <!-- Application Bundle -->
  <script src="/app.bundle.js"></script>
</body>
</html>
`;

  const htmlPath = path.join(distDir, 'index.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`Saved ${htmlPath}`);
  console.log('Web build completed successfully!');
}

build();
