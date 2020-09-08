export const IntroductionService  = {

    getIntroduction : () => {
        const url = process.env.REACT_APP_BACKEND + '/get-introduction-assessment';
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    }
}
