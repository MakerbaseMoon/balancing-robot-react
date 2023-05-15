import Home     from "./Home";
import Network  from "./Network";
import Setting  from "./Setting";

type Props = {
    setBody: React.Dispatch<React.SetStateAction<JSX.Element>>;
    sendMessage:  (message: string) => void
}

const Header = ( { setBody, sendMessage }: Props ) => {
    return (
        <>
            <span onClick={() => {setBody( <Home    sendMessage={sendMessage} /> )}}>Home </span>
            <span onClick={() => {setBody( <Network /> )}}>Network </span>
            <span onClick={() => {setBody( <Setting /> )}}>Setting </span>
        </>
    );
}

export default Header;
