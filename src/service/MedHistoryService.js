export const MedHistoryService = {
    getMedHistory : () => {
        return fetch('http://localhost:8080/get-all-med-history')
            .then(response => response.json())
            .catch(err => console.log(err));
    },
};
