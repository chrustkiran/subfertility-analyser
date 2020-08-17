export const CaseUtil = {
    camelToNorm: (key) => {
        if (key.indexOf('_') > -1) {
            return key.replace(/_/g, ' ')
        } else {
            return key.replace(/([A-Z])/g, " $1").substr(1);
        }
    }

};
