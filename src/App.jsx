import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Index from './layout/Index';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import UserForm from './pages/user/UserForm';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
//import UserFormEdit from './pages/user/UserFormEdit';
import UserUpdate from './pages/user/UserUpdate';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Index />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="userinfo" element={<UserForm />} />
      <Route path="userupdate" element={<UserUpdate />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
