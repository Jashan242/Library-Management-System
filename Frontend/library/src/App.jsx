import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import SearchBookAvailability from './components/SearchBookAvailability'
import BookIssue from './components/BookIssue'
import PayFine from './components/PayFine'
import MasterList from './components/MasterList'
import UserManagement from './components/UserManagement'
import MembershipList from './components/MembershipList'
import AddMembership from './components/AddMembership'
import Reports from './components/Report'
import Maintenance from './components/Maintenance'
import AddBookForm from './components/AddBookForm'
import Transactions from './components/Transaction'
import UserReports from './components/UserReports'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />, 
    },
    {
      path: "/login",
      element: <Login />, 
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/user-dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/search-book",
      element: <SearchBookAvailability/>
    },
    {
      path:"/book-issue",
      element: <BookIssue/>
    },
    {
      path:"/payFine",
      element: <PayFine/>
    },
    {
      path:"/master-list",
      element:<MasterList/>
    },
    {
      path:'/user-management',
      element:<UserManagement/>
    },
    {
      path:'/member-list',
      element:<MembershipList/>
    },
    {
      path:"/addMember",
      element:<AddMembership/>
    },
    {
      path:"/report",
      element:<Reports/>
    },
    {
      path:'/maintenance',
      element:<Maintenance/>
    },
    {
      path:'/addBook',
      element:<AddBookForm/>
    },
    {
      path:'/transaction',
      element:<Transactions/>
    },
    {
      path:'/userReport',
      element:<UserReports/>
    }
  ])

  return (
    <div>
      <RouterProvider router={router} classname="">
      </RouterProvider>
    </div>
  )
}

export default App
