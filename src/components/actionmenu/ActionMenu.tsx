import './ActionMenu.scss'
import {useCallback, useContext, useState} from "react";
import {PicnicClientContext} from "../../App";

interface ActionMenuProps {
    onLoginClicked: () => void
}

export const ActionMenu = ({onLoginClicked}: ActionMenuProps) => {
    const picnicClient = useContext(PicnicClientContext)
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    return (
        <div className={'actionmenu'}>
            <div className="actionmenu-search">
                <input type="text"/>
            </div>
            <div className="actionmenu-buttons">
                {picnicClient.isLoggedIn() ? <button onClick={() => {picnicClient.logoff(); forceUpdate()}}>X</button> : <button onClick={onLoginClicked}>L</button>}
            </div>
        </div>
    )
}