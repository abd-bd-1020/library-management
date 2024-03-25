import React, {useEffect} from "react";

import PageLayout from "./layout/PageLayout";

function App() {

  useEffect(() => {
    if(localStorage.getItem('userData')==null){
      const userDataArr = [];
      localStorage.setItem('userData', JSON.stringify(userDataArr));

    }
    
    
  }, []); 


  return (
    <div>
      <PageLayout />
    </div>
  );
}

export default App;
