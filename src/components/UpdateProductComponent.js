import React, {Component} from 'react'
import ItemService from '../services/ItemService';
import AuthService from "../services/AuthService";
import Lost from './LostComponent';

class UpdateProductComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            manufacturer:'',
            price: 0,
            stock: 0,
            type: '',
            bisUser: false,
            currentUser: undefined,
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeManufacturerHandler = this.changeManufacturerHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeStockHandler = this.changeStockHandler.bind(this);
        this.updateItem = this.updateItem.bind(this);
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

        ItemService.getItemById(this.state.id)
        ItemService.getItemById(this.state.id).then((res)=>{
            let item = res.data;
            this.setState({
                name: item.name,
                manufacturer: item.manufacturer,
                price: item.price,
                stock: item.stock,
                type: item.type
            });
        });
    }

    changeNameHandler=(event) =>{
        this.setState({name: event.target.value});
    }

    changePriceHandler=(event) =>{
        this.setState({price: event.target.value});
    }

    changeManufacturerHandler=(event) =>{
        this.setState({manufacturer: event.target.value});
    }

    changeStockHandler=(event) =>{
        this.setState({stock: event.target.value});
    }

    changeTypeHandler=(event) =>{
        this.setState({type: event.target.value});
    }


    updateItem = (e) =>{
        e.preventDefault();
        let item = {
            name: this.state.name, 
            manufacturer: this.state.manufacturer,
            price: this.state.price,
            stock: this.state.stock,
            type: this.state.type, 
            };
        console.log('item => ' + JSON.stringify(item));
        ItemService.updateItem(item, this.state.id).then(res =>{
            this.props.history.push('/allProducts')
        });
    }

    cancel(){
        this.props.history.push('/allProducts')
    }

    render(){
        const { businessUser } = this.state;
        return(
            <div>{businessUser ? (
                <div className= "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">Update item</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>Name</label>
                                        <input placeholder="Name" name="name" className = "form-control"
                                            value ={this.state.name} onChange = {this.changeNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Manufacturer</label>
                                        <input placeholder="Manufacturer" name="manufacturer" className = "form-control"
                                            value ={this.state.manufacturer} onChange = {this.changeManufacturerHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Price</label>
                                        <input placeholder="Price" name="price" className = "form-control"
                                            value ={this.state.price} onChange = {this.changePriceHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Stock</label>
                                        <input placeholder="Stock" name="stock" className = "form-control"
                                            value ={this.state.stock} onChange = {this.changeStockHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Type</label>
                                        <input placeholder="Type" name="type" className = "form-control"
                                            value ={this.state.type} onChange = {this.changeTypeHandler}/>
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

export default UpdateProductComponent