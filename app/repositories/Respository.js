
class Repository {
    constructor(model) {
        this.model = model;
    }
    async save(data) {
        return this.model.create(data).then(model => {
            return model;
        }).catch((error) => {
            throw error;
        });
    }

    async find(id) {
        return this.model.findById(id).then(model => {
            return model;
        }).catch((error) => {
            throw error;
        });
    }
}

export default Repository;