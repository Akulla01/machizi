import React, { useEffect, useState }  from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import routes from './modules/routing';


function App() {
  const local_storage = localStorage;
  var themes = local_storage.getItem("theme");
  // this is where the global theme is set.
	const [theme,setTheme] =  useState(themes ? themes : 'dark');
  
	// change  the global  theme here!
	useEffect(()=>{
        if (theme == 'dark'){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme",theme);
        }else{
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme",theme);
        }
    },[theme]);
     
    
  return (
    <BrowserRouter>
		<Routes>
		{
			routes.map((directories)=>(
				<Route key={directories.path} path={directories.path} element={directories.component} />
			))
		}
		</Routes>
	</BrowserRouter>
  )
}

export default App
