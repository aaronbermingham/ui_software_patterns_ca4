import React, {Component} from 'react'
import ItemService from '../services/ItemService';
import AuthService from "../services/AuthService";
import Lost from './LostComponent';
import UserService from '../services/UserService';

class UserDetailsComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            address:'',
            email: '',
            paymentMethod: '',
            password: '',
            bisUser: false,
            currentUser: undefined,
        }
        
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        console.log("Current user ", user)
        console.log("Current id ", this.state.id)
        if (user) {
          this.setState({
            currentUser: user,
            businessUser: user.roles.includes("ROLE_BUSINESS"),
          });
        }

        //UserService.getUserById(this.state.id)
        UserService.getUserById(this.state.id).then((res)=>{
            let user = res.data;
            this.setState({
                name: user.name,
                address: user.address,
                email: user.email,
                paymentMethod: user.paymentMethod,
                password: user.password
            });
        });
    }


    cancel(){
        this.props.history.push('/allUser')
    }

    render(){
        const { businessUser } = this.state;
        return(
            <div>{businessUser ? (
                <div className= "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">User</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>Name</label>
                                        <input placeholder="Name" name="name" className = "form-control"
                                            value ={this.state.name}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Address</label>
                                        <input placeholder="Address" name="address" className = "form-control"
                                            value ={this.state.address} />
                                    </div>
                                    <div className = "form-group">
                                        <label>Email</label>
                                        <input placeholder="Email" name="email" className = "form-control"
                                            value ={this.state.email}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Payment</label>
                                        <input placeholder="Payment" name="paymentMethod" className = "form-control"
                                            value ={this.state.stock} onChange = {this.changeStockHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Password</label>
                                        <input placeholder="Password" name="password" className = "form-control"
                                            value ={this.state.password}/>
                                    </div>
                        
                                    <button className = "btn btn-success" onClick={this.updateItem}>Update item</button>
                                    <button className ="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>):<Lost/>}
            </div>
        )
           
        
    }
}

export default UserDetailsComponent