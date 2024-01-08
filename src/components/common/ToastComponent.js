import Toast from 'react-native-simple-toast';

const ToastMessage = (props) => {
    const { message } = props;
    return (
        Toast.show(message || 'Please try again', Toast.SHORT)
    )
}

export default ToastMessage
