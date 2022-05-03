import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation } from 'react-router-dom'

function parsePath(url){
  var pathComponents = url.split("/")
  console.log("URL+PC", url, pathComponents)
  var result = [
    ["Home", ""]
  ]
  var currentPath = ""
  for (var c of pathComponents) {
    if (c !== ''){
      currentPath += ("/" + c)
    }
    if (c !== "classes" && c !== "pool" && c !== "member" && c !== "" && c !== "test") {
      result.push([c, currentPath])
    }
  }
  return result
}

const PathBar = () => {
  
    const location = useLocation();
    var url = window.location.pathname
    console.log(url)
    var path_components = parsePath(url)
    console.log("PC", path_components)
    return (
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} >
        {
          path_components.map((c) => 
          (c[1] === url) || (path_components.length === 1)? 
            <div key={c}>
              {c[0]}
            </div>
          : <Link key={c} underline="hover" color="inherit" to={c[1]} onClick={() => {console.log(c[1])}}>
              <strong>{c[0]}</strong>
            </Link>

          )
        }
      </Breadcrumbs>
    )
  
}

 export default PathBar
