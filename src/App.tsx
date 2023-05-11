import { useState } from 'react';

import Header   from "./Header";
import Home     from "./Home";

const App = () => {
    const [body, setBody] = useState( <Home /> );

    return (
        <>
            <Header setBody={setBody}/>
            {body}
        </>
    );
}

export default App;
