export const MedHistoryService = {
    getMedHistory : () => {
        const url = process.env.REACT_APP_BACKEND + '/get-all-med-history';
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    },

    getSymptomAnalysis : () => {
        const url = process.env.REACT_APP_BACKEND + '/get-symptom-analysis';
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    },

    getRiskBehaviour : () => {
        const url = process.env.REACT_APP_BACKEND + '/get-risk-behaviour';
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log(err));
    },

};
