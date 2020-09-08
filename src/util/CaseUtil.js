export const CaseUtil = {
    camelToNorm: (key) => {
        if (key.indexOf('_') > -1) {
            return key.replace(/_/g, ' ')
        } else {
            return key.replace(/([A-Z])/g, " $1").substr(1);
        }
    },

    testResToNormat: (stringValue) => {
        return stringValue.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
    },

    snakeToNorm: (key) => {
        return key.replace(/_/g, ' ');
    },

    NormToSnake : (key) => {
        return key.replace(/ /g, '_');
    }
};
