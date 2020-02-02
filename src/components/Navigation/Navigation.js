import React from 'react'


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => 
                        {
                            onRouteChange("SignIn")
                        }
                    } 
                    className='f3 link dim black underline'>Sign out</p>
            </nav>
        );
    } else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => {
                    onRouteChange("SignIn")
                    }
                } className='f3 link dim black underline'>Sign in</p>
                <p onClick={() => onRouteChange("Register")} className='f3 link dim black underline'>Sign up</p>
    
            </nav>
        );
    }  
}

export default Navigation;