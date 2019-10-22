const BASE_URL = "http://api.userregistration.com/api/";

export const CONFIG = {

    /*
    * User Api
    * */
    userLogin: BASE_URL + 'user/login',
    userRegister: BASE_URL + 'user/register',
    allUser: BASE_URL + 'user',
    findAdmin: BASE_URL + 'user/rolebyuser/Admin',
    findUser: BASE_URL + 'user/rolebyuser/User',
    findUserById: BASE_URL + 'user/',
    updateUser: BASE_URL + 'user/update/',
    deleteUser: BASE_URL + 'user',

    /*
    * Video Api
    * */
    listVideo: BASE_URL + 'videolist',
    video: BASE_URL + 'videoupload',
    deleteVideo: BASE_URL + 'videoupload/',
    updateVideo: BASE_URL + 'video/update/',
    videoFindById: BASE_URL + 'videoupload/',

    chunkVideo: BASE_URL + 'chunkvideo',
}