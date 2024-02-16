import './ActionMenu.scss'

interface ActionMenuProps {
    loggedIn: boolean
    onLoginClicked: () => void
}

export const ActionMenu = ({loggedIn, onLoginClicked}: ActionMenuProps) => {
    return (
        <div className={'actionmenu'}>
            <div className="actionmenu-search">
                <input type="text"/>
            </div>
            <div className="actionmenu-buttons">
                {loggedIn ? <button onClick={onLoginClicked}>X</button> : <button onClick={onLoginClicked}>L</button>}
            </div>
        </div>
    )
}