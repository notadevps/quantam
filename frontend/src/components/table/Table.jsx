import styled from 'styled-components';
import { IoIosSettings } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { Data } from '../../utils/data';
import { useEffect, useState } from 'react';
import axios from 'axios';
import base from '../../utils/default';
import { useSnackbar } from 'notistack';
import { pageState as PAGE_STATE } from '../../utils/state';
import { Oval } from 'react-loader-spinner';

/*
    Can only be viewed by logged in user
    10 rows per page 
    5 pages 
    50 total rows
*/


const Table = () => {
    const [selectedPage, setSelectedPage] = useState(1);
    const [pageStartIndex, setPageStartIndez] = useState(1);
    const [pageEndIndex, setPageEndIndex] = useState(3);
    const { enqueueSnackbar } = useSnackbar();
    const [pageState, setPageState] = useState({ state: PAGE_STATE.LOADING, message: '' })

    useEffect(() => {
        let token  = window.localStorage.getItem('token'); 
        if (!token) return setPageState({ state: PAGE_STATE.ERROR, message: 'Login Again' });

        axios.post(base.backendUrl + '/table/view', {
            token: token
        })
        .then(e => {
            console.log(e);
            if (e.status === 200) {
                return setPageState({ state: PAGE_STATE.NONE, message: '' });
            }
        })
        .catch(err => {
            console.log(err)
            return setPageState({ state: PAGE_STATE.ERROR, message: err.response.data || 'some error occured login again' });
        })
    }, [])

    useEffect(() => {
        if (pageState.state === PAGE_STATE.ERROR) {
            enqueueSnackbar(pageState.message || "error occured", { variant: 'error', autoHideDuration: '10s' }); 
        } else if (pageState.state === PAGE_STATE.ACCEPTED) {
            enqueueSnackbar('Done!', { variant: 'success', autoHideDuration: '5s'} );
        }
    }, [pageState])


    //display loading screen when page state is loading
    if (pageState.state === PAGE_STATE.LOADING) {
        return (
            <div style={base.center}>
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
        )

        
    }

    //display error when page state has error which can be from token expired or any error from backend response
    if (pageState.state === PAGE_STATE.ERROR) {
        return (
            <div style={base.center} >
                <a href='/login'>Login</a>
            </div>
        )
    }


    const previousPage = () => {
        if (pageStartIndex === 1) return; 
        setPageStartIndez(pageStartIndex - 1);
        setPageEndIndex(pageEndIndex - 1);
    }

    const nextPage = () => {
        if (pageEndIndex === Data.length / 10 ) return; 
        setPageEndIndex(pageEndIndex + 1); 
        setPageStartIndez(pageStartIndex + 1);
    }

    if (pageState.state === PAGE_STATE.NONE) {

        return (
            <TableStyle>
            <div className='tableBox'>
                <div className='tableHead'>
                    <div className='ten flex-center'>#</div>
                    <div className='thirty-five flex-left'>Name</div>
                    <div className='fifteen flex-center'>Date Created</div>
                    <div className='fifteen flex-center'>Role</div>
                    <div className='fifteen flex-center'>Status</div>
                    <div className='fifteen flex-center'>Action</div>
                </div>
                <div className='tableRow'>
                    {Data.slice((selectedPage - 1) * 10, selectedPage * 10).map((data, i) => {
                        let dt = ((selectedPage - 1 ) * 10) + i ;
                        return (
                        <div className='tableRowBox' key={i} >
                            <div className='ten flex-center' >{dt+ 1}</div>
                            <div className='thirty-five flex-left'>
                                <div className='profile'>
                                    <img src='jjk.jpg' />
                                    <span>{data.name}</span>
                                </div>
                            </div>
                            <div className='fifteen flex-center'>{data.date}</div>
                            <div className='fifteen flex-center'>{data.role}</div>
                            <div className='fifteen flex-center'>
                                <span className='status'><span className={data.staus === 'Active' ? 'active' : data.staus === 'Suspended' ? 'suspend' : 'inactive'} style={{ fontSize: '2rem'}}>&#x2022;</span>{data.staus}</span>
                            </div>
                            <div className='fifteen flex-center'>
                                <div className='icons'>
                                    <IoIosSettings className='settings' />
                                    <RxCrossCircled style={{ color: 'red' }} />
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>


                <div className='pagination'> 
                    <span onClick={() => previousPage()} className={pageStartIndex === 1 ? 'disable' : 'page'} >Previous</span>
                    <span onClick={() => setSelectedPage(pageStartIndex)} className={selectedPage === pageStartIndex ? 'acitivePage' : 'page'}>{pageStartIndex}</span>
                    <span onClick={() => setSelectedPage(pageStartIndex + 1)} className={selectedPage === pageStartIndex + 1 ? 'acitivePage' : 'page'}>{pageStartIndex + 1}</span>
                    <span onClick={() => setSelectedPage(pageEndIndex)} className={selectedPage === pageEndIndex ? 'acitivePage' : 'page'}> {pageEndIndex}</span>
                    <span onClick={nextPage} className={pageEndIndex === Data.length / 10 ? 'disable': 'page' }>Next</span>
                </div>
            </div>
            </TableStyle>
        )
    }
}


export default Table; 


const TableStyle = styled.div`
    
    .flex-center {
        display: flex; 
        justify-content: center; 
        align-items: center;
    }

    .flex-left {
        display: flex; 
        align-items: center;
        justify-content: flex-start;
    }

    .flex-right {
        display: flex; 
        align-items: center;

        justify-content: flex-end;
    }

    .profile {
        display: flex; 
        align-items: center; 
        gap: 0.5rem;
        align-self: center;
    }
    .tableRow {
        display: flex; 
        flex-direction: column;
    }

    .settings {
        color: ${props => props.theme.colors.tableBlueColor};
    }

    .tableHead {
        display: flex;
        padding: 1rem 0rem;
        position: relative;
        font-weight: 500;
        color: ${props => props.theme.colors.tableTextHeadColor}
    }
    .tableBox {
        width: 100%; 
        height: 100vh; 
        display: flex; 
        flex-direction: column;
        overflow: scroll;
        min-width: 700px;
    }

    .tableRowBox {
        display: flex;
        padding: 1rem 0rem;
        font-weight: 400;
        position: relative;
        color: ${props => props.theme.colors.tableTextRowColor};
    }

    .suspend {
        color: red; 
    }

    .page {
        cursor: pointer;
    }
    
    .inactive {
        color: #F3AC55;
    }

    .icons {
        display: flex; 
        gap: 0.5rem; 
        font-size: 1.7rem;
    }

    .tableHead:after, .tableRowBox:after {
        content: "";
        position: absolute; 
        width: 100%;
        bottom: 0; 
        height: 1px;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .tableHead:after { 
        background-color: rgba(0, 0, 0, 0.4);
    }

    .status {
        display: flex; 
        align-items: center;
        gap: 0.5rem;
    }

    .active {
        color: lightgreen;
    }

    img {
        height: 45px;
        width: 45px;
        object-fit: cover;
        border-radius: 50%;
    }

    .five {
        width: 5%;
    }

    .disable {
        color: rgba(0, 0, 0, 0.5);
    }

    .thirty-five {
        width: 35%;
    }


    .thirty {
        width: 30%; 
    }

    .ten {
        width: 10%;
    }

    .fifteen {
        width: 15%;
    }

    .pagination {
        align-self: flex-end;
        display: flex; 
        gap: 1rem;
        padding: 2rem 2rem 0rem 0rem;
        font-size: 1.2rem;
    }
    .pagination span {
        padding: 0.6rem 1rem;
    }

    .acitivePage {
        cursor: pointer; 
        color: white;
        background-color: ${props => props.theme.colors.tableBlueColor}
    }
`;
