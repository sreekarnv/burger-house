import userImage1 from '../../../assets/images/user-1.jpg';
import userImage2 from '../../../assets/images/user-2.jpg';

const initialState = {
    reviews: {
        Sarah: { img: userImage1, rating: 4.5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pharetra nulla et rhoncus venenatis. Nam sollicitudin metus non urna feugiat, vel vehicula nunc semper. Proin nunc justo, tristique sit amet.' },
        Paul: { img: userImage2, rating: 4, comment: 'Nulla ac libero nec elit porta aliquet mattis quis erat. Fusce congue mauris et quam finibus malesuada. Morbi pretium leo turpis, sed venenatis sapien vulputate eu. Duis volutpat lorem neque.' }
    },
}


const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;