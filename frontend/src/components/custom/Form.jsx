import styled from 'styled-components';
import { formState, formInputType } from '../../utils/state';
import { FaUser, FaLock } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { pageState as PAGE_STATE } from '../../utils/state';
import axios from 'axios';
import base from '../../utils/default';
import { Oval } from 'react-loader-spinner';
import { MdEmail } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { enqueueSnackbar } from 'notistack';
import { useRef } from 'react';

const Form = ({ type, setPageState, pageState }) => {
    const dateRef = useRef();
    const checkRef = useRef();
    
    const [inputData, setInputData] = useState({
        password: '', 
        username: '', 
        date: '', 
        email: ''
    })


    useEffect(() => {
        if (type === formState.LOGIN) {
            let login = window.localStorage.getItem('login'); 
            if (login) {
                login = JSON.parse(login); 
                setInputData(login)
            }
        } else if (type === formState.SIGNUP) {
            let signup = window.localStorage.getItem('signup'); 
            if (signup) {
                signup = JSON.parse(signup); 
                setInputData(signup);
            }
        }

        console.log(type);
    }, [type])

    const changeInputData = (e, type) => {
        if (type === formInputType.PASSWORD) {
            setInputData({...inputData, password: e.target.value });
        } else if (type === formInputType.USERNAME) {
            setInputData({...inputData, username: e.target.value });
        } else if (type === formInputType.DATE) {
            setInputData({...inputData, date: e.target.value });
        } else if (type === formInputType.EMAIL) {
            setInputData({...inputData, email: e.target.value });
        }
    }

    const sendReq = async () => {
        if (inputData.username.length <= 3 || inputData.username.length > 30) return enqueueSnackbar('Username length should be greater than 5 and less than 30 characters'); 
        if (inputData.password.length <= 0) return enqueueSnackbar('Password invalid');
        if (type === formState.SIGNUP && inputData.date.length <= 0) return enqueueSnackbar('Invalid Date Of Birth');
        if (type === formState.SIGNUP && (inputData.email.length <= 0 || !inputData.email.match('@*.com'))) return enqueueSnackbar('Invalid Email');
        if (checkRef.current.checked) {
            window.localStorage.setItem(type === formState.LOGIN ? 'login' : 'signup', JSON.stringify(inputData)); 
        } else {
            type === formState.LOGIN ? window.localStorage.removeItem('login') : window.localStorage.removeItem('signup');
        }
        try {
            setPageState({ state: PAGE_STATE.LOADING, message: '' });
            if (type === formState.SIGNUP) {
                let req = await axios.post(base.backendUrl + '/user/register', inputData)
                console.log(req.data);

                if (req.status === 200) {
                    setPageState({ state: PAGE_STATE.ACCEPTED, message: ''});
                    setTimeout(() => {
                        window.location = '/login'
                    }, 1000)
                } else {
                    setPageState({ state: PAGE_STATE.ERROR, message: 'Some error occured' });
                }
            } else if (type === formState.LOGIN) {
                let req = await axios.post(base.backendUrl + '/user/login', inputData); 
                if (req.status === 200) {
                    window.localStorage.setItem('token', req.data);
                    window.location = '/table';
                } else {
                    setPageState({ state: PAGE_STATE.ERROR, message: 'Some error occured' });
                }
                console.log(req.data);
            }
        
        } catch (e) {
            return setPageState({ state: PAGE_STATE.ERROR, message:  e.response.data || 'some error occured' })
        }
    }

    useEffect(() => {
        console.log(type);
    }, [type])


    if (pageState.state === PAGE_STATE.LOADING) {
        return (
            <FormStyle>
            <div className='center'>
            <Oval
                height={80}
                width={80}
                color="black"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="rgba(0, 0, 0, 0.6)"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
            </div>
            </FormStyle>

        )
    }


    return (
        <FormStyle type={type}  >
            <div className='formContainer'>
                <div className='formTop'>
                    <div className='userProfile'>
                    </div>
                </div>

                <div className='formInput'>
                    <div className='inputBox'> 
                        <FaUser />
                        <div className='line'></div>
                        <input type='text' placeholder='Username' onChange={(e) => changeInputData(e, formInputType.USERNAME)} value={inputData.username} />
                    </div>
                    <div className='inputBox'>
                        <FaLock />
                        <div className='line'></div>
                        <input type='text' placeholder='Password' onChange={(e) => changeInputData(e, formInputType.PASSWORD)} value={inputData.password} />
                    </div>
                    { type === formState.SIGNUP ?  
                    <>
                    <div className='inputBox' style={{ position: 'relative' }} onFocus={(e) => dateRef.current.showPicker()}>
                        <BsCalendar2Date />
                        <div className='line'></div>
                        <input type='text' placeholder='Date' value={inputData.date}   />
                        <input ref={dateRef} type='date' placeholder='Date' onChange={(e) => changeInputData(e, formInputType.DATE)} value={inputData.date} />
                    </div>
                    <div className='inputBox'>
                        <MdEmail />
                        <div className='line'></div>
                        <input type='email' placeholder='Email' onChange={(e) => changeInputData(e, formInputType.EMAIL)} value={inputData.email} />
                    </div>
                    </>
                    : null }
                    <div className='formBottom'>
                        <div>
                            <input ref={checkRef} type='checkbox'  />
                            <span>Remember Me</span>
                        </div>
                        <span>Forgot  your password?</span>
                    </div>
                </div>


                <div onClick={sendReq} className='formBtn'>
                    <span>{type === formState.LOGIN ? 'LOGIN' : 'SIGNUP' }</span>
                </div>
            </div>
        </FormStyle>
    )
}


export default Form; 


const FormStyle = styled.div`


    input[type="date"] {
        visibility: hidden;
        width: 1px; 
        height: 1px; 
        position: absolute;
    }

    .formContainer {
        display: flex; 
        flex-direction: column;
        color: ${props => props.theme.colors.lightgreen};
        padding: 1rem 0rem;
        padding-bottom: 2rem;
        gap: 2rem;
    }

    .center {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        background-color: transparent;
        align-self: center;
    }


    .formInput {
        display: flex; 
        flex-direction: column;
        align-items: center; 
        gap: 1rem;
        padding-top: 1rem;
        width: 80%;
        align-self: center; 
    }

    .inputBox {
        display: flex; 
        color: rgba(255, 255, 255, 0.6);
        gap: 0.5rem;
        align-items: center;
        width: 100%;
        gap: 1rem;
        background-color: ${props => props.theme.colors.inputBgColor};
        padding: 0.5rem 1rem;
        border-radius: 10px;
    }

    input {
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        color: white;
        padding: 0.5rem;
    }

    .line {
        height: 30px;
        width: 1px; 
        background-color: rgba(255, 255, 255, 0.5);
    }


    .formBottom {
        display: flex; 
        width: 100%;
        justify-content: space-between;
        font-size: 0.8rem;
    }

    .formBtn {
        text-align: center; 
        width: 80%;
        align-self: center; 
        background-color: ${props => props.theme.colors.lightgreen};
        padding: 1rem;
        color: ${props => props.theme.colors.btnTextColor};
        border-radius: 10px; 
    }

    .userProfile {
        background-image: url('wave.png');
        width: 100%; 
        height: 120px;
        background-repeat: no-repeat;
        background-position: top; 
        background-size: cover;
        display: flex;
        position: relative;
        justify-content: center; 
    }

    .userProfile:after {
        position: absolute; 
        content: "";
        width: 90px; 
        height: 90px;
        color: red;
        bottom: -25%;
        background-size: cover;
        background-image: url('profile.png');
        background-repeat: no-repeat;
        background-position: bottom center; 
        background-color: transparent;
    }

    .userProfile:before  {
        position: absolute;
        content: "${props => (props.type === 0 ? 'LOGIN' : 'SIGNUP')}";
        width: 50%; 
        height: 50px;
        display: flex; 
        justify-content: center;
        align-items: center; 
        background-color: ${props => props.theme.colors.lightgreen};
        color: ${props => props.theme.colors.btnTextColor};
        top: -30%;
    }

    .userProfile  div {
        align-self: end;
        height: 100px;
        width: 100px;
    }

    .userProfile  div img {
        height: 100%;
        width: 100%;
    }


    .formTop {
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
       
    }
    
    .formBottom div {
        display: flex; 
        gap: 0.5rem;
        width: min-content;
        align-items: center;
        white-space: nowrap;
    }

    ::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    .formBottom div input {
        background-color: transparent; 
        outline: none; 
        border: none;
    }

    @media screen and (max-width: 600px) {
        .formBottom {
            font-size: 0.7rem;
        }   
    }




    


`;
