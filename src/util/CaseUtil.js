export const CaseUtil = {
    camelToNorm: (key) => {
        console.log(key, key.indexOf('_'));
        if (key.indexOf('_') > -1) {
            return key.replace(/_/g, ' ')
        } else {
            return key.replace(/([A-Z])/g, " $1");
        }
    }

};
