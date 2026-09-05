import apiSpecifications from "../@constants/apiSpecifications";
import apiFactory from "../@factories/api.factory";

export default apiFactory({
    async generateToken({ throwTheErr }: { throwTheErr: boolean }) {
        try {
            const response = await fetch(apiSpecifications.generateToken.key, {
                method: apiSpecifications.generateToken.method,
            });

            return response;
        } catch {
            return this.base.handleError({ throwTheErr });
        }
    },
});