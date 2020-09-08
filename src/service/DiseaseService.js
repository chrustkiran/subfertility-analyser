export const DiseaseService = {
    getMedHistory : (reqObj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqObj)
        };
        const url = process.env.REACT_APP_BACKEND + '/get-dis-test';
        return fetch( url , requestOptions)
            .then(response => response.json())
            .catch(err => console.log(err));
    },
};
