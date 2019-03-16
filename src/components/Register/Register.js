import React from 'react';
class Register extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      password:'',
      name:'',
      email:''
    }
  }
  onNameChange=(event)=>{
    this.setState({name:event.target.value});
  }
  onEmailChange=(event)=>{
    this.setState({email:event.target.value});
  }
  onPasswordChange=(event)=>{
    this.setState({password:event.target.value});
  }
  onButtonRegister=(event)=>{
    event.preventDefault();
    fetch('http://localhost:3000/register',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name:this.state.name,
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response=>response.json()).then(user=>{
      this.props.loadUser(user)
      this.props.OnRouteChange('home');
  });
}
  render(){
    
	return(
    
		<article className="br3 ba  black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
		<main className="pa4 black-80">
  <form className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
        <input onChange={this.onNameChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
      </div><div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
     
    </fieldset>
    <div className="">
      <input onClick={event=>this.onButtonRegister(event)} 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
    </div>
    <div className="lh-copy mt3">
    
      
    </div>
  </form>
</main>
</article>

		);
}}
export default Register;
