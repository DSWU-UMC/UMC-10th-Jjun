import './App.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import LpDetailPage from './pages/LpDetailPage';
import ThrottlePage from './pages/ThrottlePage';
import { HamburgerButton } from './components/HamburgerButton';
import { Sidebar } from 'lucide-react';
import { useSidebar } from './hooks/useSidebar';
import { set } from 'zod';

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth.google/callback", element: <GoogleLoginRedirectPage /> },
      { path: "lps/:lpId", element: <LpDetailPage /> },
      { path: "/throttle", element: <ThrottlePage /> },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const portectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes]);

function App() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 w-full">
      <header className="fixed top-0 left-0 bg-white shadow-sm z-50 w-full">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <HamburgerButton isOpen={isOpen} onClick={toggle} />
            <h1 className="text-xl font-bold text-gray-900">돌려돌려 LP판</h1>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isOpen} onClose={close} />
      <h1 className="mt-20">
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
        texttxtext texttxtext texttxtext texttxtext texttxtext texttxtext
      </h1>
    </div>
  );
}

export default App;