export default function communicationModelVerify(value: any): boolean {
    try {
        value = JSON.parse(value);

        const validation =
            Array.isArray(value?.actors) &&
            Array.isArray(value?.communicativeEvents) &&
            Array.isArray(value?.specialisedCommunicativeEvents) &&
            Array.isArray(value?.communicativeInteractions) &&
            Array.isArray(value?.precedenceRelations);

        if (validation) {
            return false;
        }

        return true;
    } catch (error) {
        return true;
    }
}
