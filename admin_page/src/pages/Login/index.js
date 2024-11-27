import Logo from '../../assets/images/logo1.png'
import { useEffect } from 'react';
import { MyContext } from '../../App';
import { useContext } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

const Login = () => {

    const context = useContext(MyContext);
    useEffect(()=>{
        context.setisHideSiderbarAndHeader(true);
    }, []);
    return (
        <>
            <section className="loginSection">
                <div className="loginBox">
                    <div className='logo text-center'>
                        <img src={Logo} />
                        <h5>Login to BHM</h5>
                    </div>

                    <div className='wrapper mt-3 card border p-4'>
                        <form>
                            <div className='form-group mb-3 position-relative'>
                                <span className='icon'><MdEmail/></span>
                                <input type='text' className='form-control' placeholder='enter your email' />
                            </div>
                        </form>
                        <form>
                            <div className='form-group mb-3 position-relative'>
                                <span className='icon'><RiLockPasswordFill/></span>
                                <input type='text' className='form-control' placeholder='enter your password' />
                            </div>

                            <div className='form-group'>
                                <Button className="btn-blue btn-lg-w-1">Sign In</Button>
                            </div>

                            <div className='form-group'>
                                <Link to={'/forgot-password'} className="link">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                    
                </div>

            </section>
        </>
    )
}

export default Login;