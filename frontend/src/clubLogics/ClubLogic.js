export const isClubIncharge = (loggedUser, currentUser) => {
    return loggedUser._id === currentUser._id ? true : false;
}