import axios from "axios";
import authHeader from "./AuthHeader";
const REVIEW_API_BASE_URL = "http://localhost:8080/api/auth/review/";

class ReviewService {
  getReviews() {
    return axios.get(REVIEW_API_BASE_URL + "all", { headers: authHeader() });
  }

  addReview(review, itemId) {
    return axios.post(REVIEW_API_BASE_URL + "addReview/" + itemId, review, {
      headers: authHeader(),
    });
  }

  getReviewByProductId(productId) {
    return axios.get(REVIEW_API_BASE_URL + "reviewByProductId/" + productId, {
      headers: authHeader(),
    });
  }
}

export default new ReviewService();
