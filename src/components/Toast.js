import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../css/toast_comp.css";
import { toastActionCreators } from '../redux/actionCreators';

function Toast() {
    const capitalize = (word) => {
        if(word==='danger'){word = 'error';}
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const toast = useSelector(state => state.toast)
    const dispatch = useDispatch();
    const { setToastConfiguration } = bindActionCreators(toastActionCreators, dispatch);

    useEffect(() => {
        if(toast){
            setTimeout(() => {
                setToastConfiguration();
            }, 4000);
        }
    }, [toast]);

    const closeToast = () => {
        setToastConfiguration();
    }

    return (
        <>
            {toast &&  <div className='position-fixed bottom-0 end-0 p-3' style={{zIndex: 1}}>
                <div className={`notify fade show bg-${toast.variant} ${(toast.variant==="warning" || toast.variant==="info")?"text-dark":"text-light"}`}>
                    <div className="notify-header">
                        <strong className="notify-auto d-flex align-items-center">
                            <i className={`mdi mdi-checkbox-multiple-blank-circle text-dark me-2`}></i> {capitalize(toast.variant)}
                        </strong>
                        {/* <strong className='mx-2'></strong> */}
                        <button className="btn-close" type="button" onClick={closeToast}></button>
                    </div>
                    <div className="notify-body fs-c">{toast.message}</div>
                </div>
            </div>}
        </>
    )
}

export default Toast
