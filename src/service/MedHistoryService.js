export const MedHistoryService = {
    getMedHistory : () => {
        const url = 'http://' + process.env.REACT_APP_BACKEND + '/get-all-med-history';
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    },
};
