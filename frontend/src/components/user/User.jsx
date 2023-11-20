import styled from 'styled-components'; 
import Form from '../custom/Form';
import { useEffect, useState } from 'react';
import { formState, pageState as PAGE_STATE } from '../../utils/state';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Oval } from 'react-loader-spinner';

const User = () => {
    const [formType, setFormType] = useState();
    const [pageState, setPageState] = useState({ state: PAGE_STATE.NONE, message: '' }); 
    const link = useLocation(); 

    const { enqueueSnackbar } = useSnackbar();




    useEffect(() => {
        if (link.pathname === '/signup') {
            setFormType(formState.SIGNUP);
        } else if (link.pathname === '/login') {
            setFormType(formState.LOGIN);
        }
    }, [])

    useEffect(() => {
        console.log(pageState);
        if (pageState.state === PAGE_STATE.ERROR) {
            enqueueSnackbar(pageState.message || "error occured", { variant: 'error', autoHideDuration: '10s' }); 
        } else if (pageState.state === PAGE_STATE.ACCEPTED) {
            enqueueSnackbar('Done!', { variant: 'success', autoHideDuration: '5s'} );
        }
    }, [pageState])

  



    return (
        <UserStyle pageState={pageState}>
            <div className='userContainer'>
                <div className='userBox'>
                    <Form type={formType} setPageState={setPageState} pageState={pageState} />
                </div>
            </div>
        </UserStyle>
    )
}


export default User; 


const UserStyle = styled.div`
    .userContainer {
        height: 100vh; 
        width: 100%;
        background-image: linear-gradient(rgba(0, 0, 0, 0.7), ${props => props.theme.colors.lightgreen});
        display: flex; 
        justify-content: center; 
        align-items: center; 
    }

    .userBox {
        min-width: ${props => props.pageState.state === PAGE_STATE.LOADING ? '100%' : '400px'};
        background-color:  ${props => props.pageState.state === PAGE_STATE.LOADING ? 'transparnet': props.theme.colors.formBgColor};
        border-radius: 5px;
        position: relative;
    }

    .userBox:after {
        position: absolute; 
        content: ""; 
        width: 100%; 
        height: 90px;
        background-image: radial-gradient(rgba(0, 0, 0, 0.4) 10%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.1) 70%);
        border-radius: 50%;
        filter: blur(45px);
        transform: rotateX(80deg);
        bottom: -20%;
    }

    @media screen and (max-width: 600px) {
        .userBox {
            min-width: 300px;
        }   
    }


`;