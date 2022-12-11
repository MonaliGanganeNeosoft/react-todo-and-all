import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundry'

const Dashboard = lazy(()=> import('./components/Dashboard'))
const Login = lazy(()=> import('./components/Login'))
const Registration = lazy(()=> import('./components/Registration'))
const ProjectDetails = lazy(()=> import('./components/ProjectDetails'))

function App() {
  return (
    <div>
     <Router>
       <ErrorBoundary>
         <Suspense fallback={
           <img src="./images/loading.gif" width="100%" height='700px' alt="..."></img>}>
             <Routes>
               <Route path="/" element={<Login/>}/>
               <Route path="/registration" element={<Registration/>}/>
               <Route path="/dashboard" element={<Dashboard/>}/>
               <Route path="/projectDetails" element={<ProjectDetails/>}/>
               <Route path="*" element={<img width="100%" height="657px" src="./images/notfound.gif" alt="not found"/>}/>
             </Routes>
        </Suspense>
       </ErrorBoundary>
     </Router>
    </div>
  );
}

export default App;
