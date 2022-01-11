import React from 'react'
import "../css/toast_comp.css";

function Toast(props) {
    const capitalize = (word) => {
        if(word==='danger'){word = 'error';}
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const curDate = new  Date().toLocaleDateString();
    return (
        <>
            {props.toast &&  <div className='position-fixed bottom-0 end-0 p-3' style={{zIndex: 1}}>
                <div className={`notify fade show bg-${props.toast.variant} text-light`}>
                    <div className="notify-header">
                        <strong className="notify-auto d-flex align-items-center">
                            <i className={`mdi mdi-checkbox-multiple-blank-circle text-dark me-2`}></i> {capitalize(props.toast.variant)}
                        </strong>
                        {/* <strong className='mx-2'></strong> */}
                        <button className="btn-close" type="button" onClick={props.closeToast}></button>
                    </div>
                    <div className="notify-body fs-c">{props.toast.message}</div>
                </div>
            </div>}
        </>
    )
}

export default Toast
