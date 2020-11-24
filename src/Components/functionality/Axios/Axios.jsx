import Axios from 'axios';

export default Axios.create({
    baseURL: 'https://react-quiz-2ffda.firebaseio.com/'
})
