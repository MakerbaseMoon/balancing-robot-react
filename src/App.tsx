import { useState } from 'react';

import Header   from "./Header";
import Home     from "./Home";

import './App.css' 

const App = () => {
    const [body, setBody] = useState( <Home /> );

    return (
        <>
            <Header setBody={setBody}/>
            <div className="container-fluid content-height">
                <div className="row align-items-center content-height">
                    <div className="col-lg-3 col-3 d-none d-lg-block bg-0"></div>
                    <div className="col-lg-6 col-12 shadow">
                        {body}
                    </div>
                    <div className="col-lg-3 col-3 d-none d-lg-block bg-0"></div>
                </div>
            </div>
            
        </>
    );
}

export default App;
