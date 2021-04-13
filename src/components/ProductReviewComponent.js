import React, {Component} from 'react'
import AuthService from "../services/AuthService";
import ReviewService from "../services/ReviewService"; 
import Lost from './LostComponent';

class ProductReviewComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            review: '',
            rating: 1,
            bisUser: false,
            currentUser: undefined,
        }
        this.changeReviewHandler = this.changeReviewHandler.bind(this);
        this.changeRatingHandler = this.changeRatingHandler.bind(this);
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

       
    }

    changeReviewHandler=(event) =>{
        this.setState({review: event.target.value});
    }

    changeRatingHandler = (event) => {
        this.setState({ rating: event.target.value });
    }

    reviewItem = (e) =>{
        e.preventDefault();
        let item = {
            reviewText: this.state.review, 
            reviewStars: this.state.rating,
            };
        console.log('item => ' + JSON.stringify(item));
        ReviewService.addReview(item,this.state.id).then(res =>{
            this.props.history.push('/userOrder')
        });
    }

    cancel(){
        this.props.history.push('/userOrder')
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
                                        <label>Review</label>
                                        <input placeholder="Review" name="review" className = "form-control" style={{ height: "150px" }}
                                            value ={this.state.review} onChange = {this.changeReviewHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Rating</label>
                                        <select placeholder="Number of Seats" name="numSeats" className="form-control"
                                            selected={this.state.rating} onChange={this.changeRatingHandler}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            {/* <option value="20">20</option> */}
                                        </select>
                                    </div>

                        
                                    <button className = "btn btn-success" onClick={this.reviewItem}>Add review</button>
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

export default ProductReviewComponent