import React from 'react'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('https://smartbrain-back-end.herokuapp.com/signin', {
            method: 'post',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then( (response) => response.json())
        .then( user => {
            if(user.email === this.state.signInEmail){
                this.props.updateSignedinUser(user);
                this.props.onRouteChange("Home");
            } else {
                console.log("wrong sigin");
            }
        })
       
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <div 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="email-address">Email</div>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange = {this.onEmailChange} 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    onChange={this.onPasswordChange}
                                    type="password" 
                                    name="password"  
                                    id="password" />
                            </div>
                            </fieldset>
                            <div className="">
                            <input
                                onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                            </div>
                            <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('Register')} href="#0" className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>  
            </div>
        ); 
    }
    
}

export default SignIn;