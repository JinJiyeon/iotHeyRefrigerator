import Cookies from 'js-cookie';

const isLogin = () =>  !!Cookies.get('user_id')
export default isLogin;