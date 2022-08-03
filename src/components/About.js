import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authActionCreators, toastActionCreators } from '../redux/actionCreators';
import "../css/aboutus_comp.css";

function About() {
    let history = useHistory();
    const dispatch = useDispatch();
    const {setAuthStatus} = bindActionCreators(authActionCreators, dispatch);
    const {setToastConfiguration} = bindActionCreators(toastActionCreators, dispatch);

    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            setAuthStatus(false,null);
            setToastConfiguration("Session Expired.", "warning");
        }
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='about-us'>
                <h1>About Us</h1>

                <p>
                    &rarr; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus magnam vel tenetur, expedita quia atque earum reprehenderit facilis ab culpa perferendis! Natus dolorum officia nostrum, modi repellat quas nemo reprehenderit magni consectetur eaque, deleniti perferendis incidunt suscipit, eius ipsa iure? Ratione reiciendis accusantium commodi neque omnis hic rem ex laborum.
                </p>
                <p>
                    &rarr; Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, ex? Doloribus exercitationem pariatur totam odio impedit velit est eum amet eos. Necessitatibus reiciendis atque aperiam.
                </p>
                <p>
                    &rarr; Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur molestias ullam, obcaecati inventore, possimus corrupti veritatis repudiandae nesciunt explicabo assumenda dolorem ut. Consectetur saepe molestias consequatur nesciunt ipsam provident harum excepturi fuga? Quasi modi temporibus vero molestias, minima eligendi iste impedit laborum! Commodi quidem necessitatibus hic vero vitae. Sunt fuga, minima fugit sit asperiores nulla cupiditate temporibus! Nihil sint odit et, autem mollitia vel nostrum at quaerat amet aliquam quisquam, qui dolorem voluptatibus perspiciatis!
                </p>
                <p>
                    &rarr; Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit veritatis animi totam accusantium quae vel laboriosam sint assumenda porro quo officiis ratione, perspiciatis ea ab eos soluta non cum saepe quia, inventore natus suscipit, nulla beatae! Autem blanditiis incidunt consequuntur libero eaque illum totam impedit molestias aperiam deserunt repudiandae, atque voluptatum obcaecati odio assumenda reiciendis, aspernatur quasi delectus vitae in.
                </p>
                <p className='i-icon'><i className='mdi mdi-alpha-i-box'></i></p>
            </div>

        </>
    )
}

export default About
