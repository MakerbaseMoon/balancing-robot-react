import Home     from "./Home";
import Network  from "./Network";
import Setting  from "./Setting";

type Props = {
    setBody: React.Dispatch<React.SetStateAction<JSX.Element>>
}

const Header = ( { setBody }: Props ) => {
    return (
        <>
            <span onClick={() => {setBody(<Home    />)}}>Home </span>
            <span onClick={() => {setBody(<Network />)}}>Network </span>
            <span onClick={() => {setBody(<Setting />)}}>Setting </span>
        </>
    );
}

export default Header;
