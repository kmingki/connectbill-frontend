import { atom } from 'recoil';

const textState = atom({
    key: 'userState',
    default: {
        id: null,
        isClient: null,
        username: null,
        auth_token: null,
        profileImage: '',
    }
});

export default textState;