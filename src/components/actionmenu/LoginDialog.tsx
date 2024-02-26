import {Dialog} from "../dialog/Dialog";
import {useCallback, useContext, useState} from "react";
import {PicnicClientContext} from "../../App";

export interface LoginDialogProps {
    onCloseDialog: () => void
}

export const LoginDialog = ({onCloseDialog}: LoginDialogProps) => {

    const picnicClient = useContext(PicnicClientContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLoginClicked = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            console.log('Login clicked!!')
            picnicClient.login(username, password)
                .then((authToken: string) => {
                    window.localStorage.setItem('authToken', authToken)
                    onCloseDialog()
                })
                .catch((e) => console.log(e))
        },
        [username, password, onCloseDialog],
    );

    return (
        <Dialog onClickOutside={onCloseDialog}>
            Dit is het login form

            <form>
                <input type="text" placeholder={'username'} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={onLoginClicked}>Login</button>
            </form>
        </Dialog>
    )
}