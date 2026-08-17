const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert Profile import
if (!code.includes("const Profile")) {
  code = code.replace(
    "const Join = lazy(() => import('./pages/Join').then(m => ({ default: m.Join })));",
    "const Join = lazy(() => import('./pages/Join').then(m => ({ default: m.Join })));\nconst Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));"
  );
}

// Insert Profile Route
if (!code.includes('path="/profile"')) {
  code = code.replace(
    '<Route path="/join" element={<Join />} />',
    '<Route path="/join" element={<Join />} />\n              <Route path="/profile" element={<Profile />} />'
  );
}

fs.writeFileSync('src/App.tsx', code);
