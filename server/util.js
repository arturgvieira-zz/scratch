module.exports = class Util {
    static unBoxSingleResult(result) {
        if (result) {
            result = result.map(result => ({
                ...result['properties']
            }));
            return result[0];
        } else {
            return null;
        }
    }

    static unBoxManyResults(result) {
        if (result) {
            result = result.map(result => ({
                ...result['properties']
            }));
            return result;
        } else {
            return null;
        }
    }
};
