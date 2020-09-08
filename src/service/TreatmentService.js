export const TreatmentService = {
    getTreatment : (disease) => {
        const url = process.env.REACT_APP_BACKEND + '/get-treatment' + '?disease=' + disease;
        return fetch( url )
            .then(response => response.json())
            .catch(err => console.log(err));
    },
};
