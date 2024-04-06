import { useState } from "react";
import styles from "./Login.module.scss";
import Logo from "../../img/icon.png";
import { login } from "../../lib/api";
import { doLogin } from '../../lib/authHandler';

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await login(email, password);
        
        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token)
            window.location.href = '/';
        }

        setDisabled(false);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login}>
            <div className={styles.container}>
                {error &&
                    <div className={styles.error}>{error}</div>
                }

                <div className={styles.logo}>
                    <img src={Logo} alt="logo" />
                    <span>CoreNotes</span>
                </div>

                <div className={styles.group}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Seu email"
                        required
                        disabled={disabled}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.group}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="email"
                        id="password"
                        placeholder="Sua senha"
                        required
                        disabled={disabled}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles.group}>
                    <button>Login</button>
                </div>

                <div className={styles.message}>
                    <a href="/register"><span>Não possui conta?, cadastre-se.</span></a>
                </div>
            </div>
        </form>
    );
}

export default LoginPage;