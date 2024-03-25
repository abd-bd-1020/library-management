import React, {useEffect} from "react";
import booksData from "./data/books.json";

import PageLayout from "./layout/PageLayout";

function App() {

  useEffect(() => {
    if(localStorage.getItem('userData')==null){
      const userDataArr = [];
      localStorage.setItem('userData', JSON.stringify(userDataArr));

    }
    if(localStorage.getItem('bookData')==null){

      localStorage.setItem('bookData', JSON.stringify(booksData));

    }
    
    
  }, []); 


  return (
    <div>
      <PageLayout />
    </div>
  );
}

export default App;
