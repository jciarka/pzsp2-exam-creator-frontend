import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation } from 'react-router-dom'

function getSubjectName(id, subjects){
  console.log(id, subjects)
  for (let s of subjects) {
    if (s.id == parseInt(id)) {
      return s.name
    }
  }
  return ""
}

function parsePath(url, subjects){
  var pathComponents = url.split("/")
  console.log("URL+PC", url, pathComponents)
  var result = [
    ["Home", ""]
  ]
  var currentPath = ""
  for (var i = 0; i < pathComponents.length; i++) {
    var c = pathComponents[i]
    if (c !== ''){
      currentPath += ("/" + c)
    }
    if (c !== "classes" && c !== "pool" && c !== "member" && c !== "" && c !== "test") {
      if (i > 0 && pathComponents[i - 1] == "classes"){
        result.push([getSubjectName(c, subjects), currentPath])
      }
      else if (i > 0 && pathComponents[i - 1] == "pool"){
        result.push(["Pool nr " + c, currentPath])
      }
      else if (i > 0 && pathComponents[i - 1] == "member"){
        result.push(["Member nr " + c, currentPath])
      }
      else if (i > 0 && pathComponents[i - 1] == "test"){
        result.push(["Test nr " + c, currentPath])
      }
      else {
        result.push([c, currentPath])
      }
    }
  }
  return result
}

const PathBar = () => {
  
    const location = useLocation();
    var url = window.location.pathname
    const subjects = JSON.parse(localStorage.getItem("subjects"))
    console.log(url)
    var path_components = parsePath(url, subjects)
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
